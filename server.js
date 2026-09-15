import http from 'node:http'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, extname, join, normalize, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import { createLeadsStore } from './server/leadsStore.js'
import { notifyNewLead } from './server/notifyEmail.js'

const root = dirname(fileURLToPath(import.meta.url))

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return
  const lines = readFileSync(filePath, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex <= 0) continue
    const key = trimmed.slice(0, separatorIndex).trim()
    let value = trimmed.slice(separatorIndex + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}

loadEnvFile(join(root, '.env'))

const distRoot = resolve(root, 'dist')
const leadsStore = createLeadsStore(root)
const port = Number(process.env.API_PORT || 4000)
const isProduction = process.env.NODE_ENV === 'production'
const adminToken = process.env.ADMIN_TOKEN || ''
const allowedOrigin = process.env.CORS_ORIGIN || (isProduction ? '' : '*')
const MAX_BODY_BYTES = 64 * 1024
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 10

const rateLimitBuckets = new Map()

function getClientIp(request) {
  const forwarded = request.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }
  return request.socket.remoteAddress || 'unknown'
}

function isRateLimited(ip) {
  const now = Date.now()
  const bucket = rateLimitBuckets.get(ip)
  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitBuckets.set(ip, { windowStart: now, count: 1 })
    return false
  }
  bucket.count += 1
  return bucket.count > RATE_LIMIT_MAX
}

function corsHeaders() {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  }
  if (allowedOrigin) {
    headers['Access-Control-Allow-Origin'] = allowedOrigin
  }
  return headers
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    ...corsHeaders(),
  })
  response.end(JSON.stringify(body))
}

function isAuthorized(request) {
  if (isProduction && !adminToken) return false
  if (!adminToken) return true
  return request.headers.authorization === `Bearer ${adminToken}`
}

function truncate(value, max) {
  return String(value || '').trim().slice(0, max)
}

function isValidPhone(phone) {
  return /^[+]?[\d\s-]{8,15}$/.test(phone)
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function normalizeLead(submission) {
  const type = submission.type === 'contact' ? 'contact' : 'consultation'

  if (submission.website) {
    return { error: 'Rejected' }
  }

  if (type === 'consultation') {
    const name = truncate(submission.name, 120)
    const phone = truncate(submission.phone, 30)
    const place = truncate(submission.place, 120)
    const service = truncate(submission.service, 120)

    if (!name || !phone || !place || !service) {
      return { error: 'All consultation fields are required' }
    }
    if (!isValidPhone(phone)) {
      return { error: 'Please enter a valid phone number' }
    }

    return {
      lead: {
        id: crypto.randomUUID(),
        type,
        name,
        phone,
        place,
        service,
        createdAt: new Date().toISOString(),
      },
    }
  }

  const name = truncate(submission.name || submission.fullName, 120)
  const phone = truncate(submission.phone, 30)
  const email = truncate(submission.email, 160).toLowerCase()
  const companyName = truncate(submission.companyName, 160)
  const service = truncate(submission.service || submission.serviceRequired, 120)
  const budgetRange = truncate(submission.budgetRange, 80)
  const projectDescription = truncate(submission.projectDescription, 2000)

  if (!name || !phone || !email || !projectDescription) {
    return { error: 'Name, phone, email, and project description are required' }
  }
  if (!isValidPhone(phone)) {
    return { error: 'Please enter a valid phone number' }
  }
  if (!isValidEmail(email)) {
    return { error: 'Please enter a valid email address' }
  }

  return {
    lead: {
      id: crypto.randomUUID(),
      type,
      name,
      phone,
      email,
      companyName: companyName || undefined,
      service: service || undefined,
      budgetRange: budgetRange || undefined,
      projectDescription,
      createdAt: new Date().toISOString(),
    },
  }
}

function readRequestBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let body = ''
    let size = 0

    request.on('data', chunk => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        rejectBody(new Error('Payload too large'))
        request.destroy()
        return
      }
      body += chunk
    })

    request.on('end', () => resolveBody(body))
    request.on('error', rejectBody)
  })
}

function resolveSafeDistPath(pathname) {
  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '')
  const normalized = normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, '')
  const filePath = resolve(distRoot, normalized)
  if (!filePath.startsWith(distRoot + sep) && filePath !== distRoot) {
    return null
  }
  return filePath
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`)

  if (url.pathname === '/api/consultations' && request.method === 'OPTIONS') {
    response.writeHead(204, corsHeaders())
    return response.end()
  }

  if (url.pathname === '/api/consultations' && request.method === 'GET') {
    if (!isAuthorized(request)) return sendJson(response, 401, { error: 'Unauthorized' })
    return sendJson(response, 200, leadsStore.list())
  }

  if (url.pathname === '/api/consultations' && request.method === 'POST') {
    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return sendJson(response, 429, { error: 'Too many requests. Please try again shortly.' })
    }

    try {
      const body = await readRequestBody(request)
      const submission = JSON.parse(body)
      const result = normalizeLead(submission)
      if (result.error) {
        return sendJson(response, 400, { error: result.error })
      }
      leadsStore.create(result.lead)
      void notifyNewLead(result.lead).catch((error) => {
        console.error('Lead email notify failed:', error.message)
      })
      return sendJson(response, 201, result.lead)
    } catch (error) {
      if (error.message === 'Payload too large') {
        return sendJson(response, 413, { error: 'Request body too large' })
      }
      return sendJson(response, 400, { error: 'Invalid request body' })
    }
  }

  const deleteMatch = url.pathname.match(/^\/api\/consultations\/([^/]+)$/)
  if (deleteMatch && request.method === 'DELETE') {
    if (!isAuthorized(request)) return sendJson(response, 401, { error: 'Unauthorized' })
    leadsStore.remove(deleteMatch[1])
    return sendJson(response, 204, {})
  }

  if (url.pathname.startsWith('/api/')) {
    return sendJson(response, 404, { error: 'Not found' })
  }

  const filePath = resolveSafeDistPath(url.pathname)
  if (filePath && existsSync(filePath)) {
    const contentTypes = {
      '.css': 'text/css',
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.mp4': 'video/mp4',
      '.woff2': 'font/woff2',
    }
    const contentType = contentTypes[extname(filePath)] || 'application/octet-stream'
    response.writeHead(200, { 'Content-Type': contentType })
    return response.end(readFileSync(filePath))
  }

  const indexPath = join(distRoot, 'index.html')
  if (existsSync(indexPath)) {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    return response.end(readFileSync(indexPath))
  }

  response.writeHead(404)
  response.end('Run npm run build first')
})

server.listen(port, () => {
  console.log(`Consultation API listening on http://localhost:${port} [${leadsStore.backend}]`)
})

if (process.argv.includes('--dev')) {
  const portArg = process.argv.indexOf('--port')
  const vitePort = portArg !== -1 ? process.argv[portArg + 1] : (process.env.PORT || '4005')
  const vite = spawn(process.execPath, [join(root, 'node_modules', 'vite', 'bin', 'vite.js'), '--host', 'localhost', '--port', vitePort], { stdio: 'inherit' })
  const shutdown = () => { vite.kill(); server.close() }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

