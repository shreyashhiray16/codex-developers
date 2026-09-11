import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

function readJsonFile(filePath) {
  if (!existsSync(filePath)) return []
  try {
    const data = JSON.parse(readFileSync(filePath, 'utf8'))
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function writeJsonFile(filePath, leads) {
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, JSON.stringify(leads, null, 2))
}

function createJsonStore(jsonPath) {
  return {
    backend: 'json',
    list() {
      return readJsonFile(jsonPath)
    },
    create(lead) {
      const leads = [lead, ...readJsonFile(jsonPath)]
      writeJsonFile(jsonPath, leads)
      return lead
    },
    remove(id) {
      writeJsonFile(jsonPath, readJsonFile(jsonPath).filter(item => item.id !== id))
    },
  }
}

function rowToLead(row) {
  return {
    id: row.id,
    type: row.type,
    name: row.name,
    phone: row.phone,
    email: row.email || undefined,
    place: row.place || undefined,
    companyName: row.company_name || undefined,
    service: row.service || undefined,
    budgetRange: row.budget_range || undefined,
    projectDescription: row.project_description || undefined,
    createdAt: row.created_at,
  }
}

function createSqliteStore(Database, dbPath, jsonPath) {
  mkdirSync(dirname(dbPath), { recursive: true })
  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')

  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      place TEXT,
      company_name TEXT,
      service TEXT,
      budget_range TEXT,
      project_description TEXT,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
  `)

  const count = db.prepare('SELECT COUNT(*) AS count FROM leads').get().count
  if (count === 0) {
    const existing = readJsonFile(jsonPath)
    if (existing.length > 0) {
      const insert = db.prepare(`
        INSERT INTO leads (
          id, type, name, phone, email, place, company_name, service, budget_range, project_description, created_at
        ) VALUES (
          @id, @type, @name, @phone, @email, @place, @company_name, @service, @budget_range, @project_description, @created_at
        )
      `)

      const migrate = db.transaction((leads) => {
        for (const lead of leads) {
          insert.run({
            id: lead.id,
            type: lead.type === 'contact' ? 'contact' : 'consultation',
            name: lead.name,
            phone: lead.phone,
            email: lead.email || null,
            place: lead.place || null,
            company_name: lead.companyName || null,
            service: lead.service || null,
            budget_range: lead.budgetRange || null,
            project_description: lead.projectDescription || null,
            created_at: lead.createdAt || new Date().toISOString(),
          })
        }
      })

      migrate(existing)

      try {
        renameSync(jsonPath, `${jsonPath}.migrated`)
      } catch {
        // Keep the original JSON if rename fails; SQLite is already populated.
      }
    }
  }

  const listStmt = db.prepare('SELECT * FROM leads ORDER BY created_at DESC')
  const insertStmt = db.prepare(`
    INSERT INTO leads (
      id, type, name, phone, email, place, company_name, service, budget_range, project_description, created_at
    ) VALUES (
      @id, @type, @name, @phone, @email, @place, @company_name, @service, @budget_range, @project_description, @created_at
    )
  `)
  const deleteStmt = db.prepare('DELETE FROM leads WHERE id = ?')

  return {
    backend: 'sqlite',
    list() {
      return listStmt.all().map(rowToLead)
    },
    create(lead) {
      insertStmt.run({
        id: lead.id,
        type: lead.type,
        name: lead.name,
        phone: lead.phone,
        email: lead.email || null,
        place: lead.place || null,
        company_name: lead.companyName || null,
        service: lead.service || null,
        budget_range: lead.budgetRange || null,
        project_description: lead.projectDescription || null,
        created_at: lead.createdAt,
      })
      return lead
    },
    remove(id) {
      deleteStmt.run(id)
    },
  }
}

/**
 * Prefer SQLite when better-sqlite3 loads; otherwise keep the JSON file store.
 */
export function createLeadsStore(rootDir) {
  const dataDir = join(rootDir, 'data')
  const jsonPath = join(dataDir, 'consultations.json')
  const dbPath = join(dataDir, 'leads.db')

  try {
    const Database = require('better-sqlite3')
    const store = createSqliteStore(Database, dbPath, jsonPath)
    console.log(`Leads store: SQLite (${dbPath})`)
    return store
  } catch (error) {
    console.warn(`Leads store: JSON fallback (${jsonPath}) — ${error.message}`)
    return createJsonStore(jsonPath)
  }
}
