import http from 'node:http'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const root = dirname(fileURLToPath(import.meta.url))
const dataFile = join(root, 'data', 'consultations.json')
const port = Number(process.env.API_PORT || 4000)

function readConsultations() {
  if (!existsSync(dataFile)) return []
  try {
    return JSON.parse(readFileSync(dataFile, 'utf8'))
  } catch {
    return []
  }
}

function writeConsultations(consultations) {
  mkdirSync(dirname(dataFile), { recursive: true })
  writeFileSync(dataFile, JSON.stringify(consultations, null, 2))
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
  response.end(JSON.stringify(body))
}

function isAuthorized(request) {
  return !process.env.ADMIN_TOKEN || request.headers.authorization === `Bearer ${process.env.ADMIN_TOKEN}`
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`)

  if (url.pathname === '/api/consultations' && request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    })
    return response.end()
  }

  if (url.pathname === '/api/consultations' && request.method === 'GET') {
    if (!isAuthorized(request)) return sendJson(response, 401, { error: 'Unauthorized' })
    return sendJson(response, 200, readConsultations())
  }

  if (url.pathname === '/api/consultations' && request.method === 'POST') {
    let body = ''
    request.on('data', chunk => { body += chunk })
    request.on('end', () => {
      try {
        const submission = JSON.parse(body)
        if (!submission.name || !submission.phone || !submission.place || !submission.service) {
          return sendJson(response, 400, { error: 'All consultation fields are required' })
        }
        const consultation = {
          id: crypto.randomUUID(),
          ...submission,
          createdAt: new Date().toISOString(),
        }
        writeConsultations([consultation, ...readConsultations()])
        return sendJson(response, 201, consultation)
      } catch {
        return sendJson(response, 400, { error: 'Invalid request body' })
      }
    })
    return
  }

  const deleteMatch = url.pathname.match(/^\/api\/consultations\/([^/]+)$/)
  if (deleteMatch && request.method === 'DELETE') {
    if (!isAuthorized(request)) return sendJson(response, 401, { error: 'Unauthorized' })
    writeConsultations(readConsultations().filter(item => item.id !== deleteMatch[1]))
    return sendJson(response, 204, {})
  }

  if (process.env.NODE_ENV !== 'production' && url.pathname.startsWith('/api/')) {
    return sendJson(response, 404, { error: 'Not found' })
  }

  const filePath = join(root, 'dist', normalize(url.pathname === '/' ? '/index.html' : url.pathname))
  if (existsSync(filePath)) {
    const contentTypes = {
      '.css': 'text/css',
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.svg': 'image/svg+xml',
      '.woff2': 'font/woff2',
    }
    const contentType = contentTypes[extname(filePath)] || 'application/octet-stream'
    response.writeHead(200, { 'Content-Type': contentType })
    return response.end(readFileSync(filePath))
  }
  if (existsSync(join(root, 'dist', 'index.html'))) {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    return response.end(readFileSync(join(root, 'dist', 'index.html')))
  }
  response.writeHead(404)
  response.end('Run npm run build first')
})

server.listen(port, () => console.log(`Consultation API listening on http://localhost:${port}`))

if (process.argv.includes('--dev')) {
  const vite = spawn(process.execPath, [join(root, 'node_modules', 'vite', 'bin', 'vite.js'), '--host', 'localhost', '--port', '3000'], { stdio: 'inherit' })
  const shutdown = () => { vite.kill(); server.close() }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}