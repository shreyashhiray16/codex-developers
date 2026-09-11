const RESEND_API_URL = 'https://api.resend.com/emails'

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function formatType(type) {
  return type === 'contact' ? 'Contact' : 'Consultation'
}

function buildLeadLines(lead) {
  const lines = [
    ['Type', formatType(lead.type)],
    ['Name', lead.name],
    ['Phone', lead.phone],
    ['Email', lead.email],
    ['Location', lead.place],
    ['Company', lead.companyName],
    ['Service', lead.service],
    ['Budget', lead.budgetRange],
    ['Project', lead.projectDescription],
    ['Received', lead.createdAt],
    ['Lead ID', lead.id],
  ]

  return lines.filter(([, value]) => Boolean(value))
}

function buildTextBody(lead) {
  const lines = buildLeadLines(lead).map(([label, value]) => `${label}: ${value}`)
  return [
    `New ${formatType(lead.type).toLowerCase()} request on Codex Developers.`,
    '',
    ...lines,
    '',
    'Review leads in the admin panel.',
  ].join('\n')
}

function buildHtmlBody(lead) {
  const rows = buildLeadLines(lead)
    .map(([label, value]) => (
      `<tr>
        <td style="padding:6px 12px 6px 0;color:#6B7280;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:6px 0;color:#111827;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`
    ))
    .join('')

  return `
    <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.5;color:#111827;">
      <p>New <strong>${escapeHtml(formatType(lead.type).toLowerCase())}</strong> request on Codex Developers.</p>
      <table style="border-collapse:collapse;margin:16px 0;">${rows}</table>
      <p style="color:#6B7280;font-size:14px;">Review leads in the admin panel.</p>
    </div>
  `.trim()
}

/**
 * Team-only lead notification via Resend.
 * No-ops when RESEND_API_KEY is missing. Never throws to the caller.
 */
export async function notifyNewLead(lead) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return { skipped: true, reason: 'RESEND_API_KEY not set' }
  }

  const to = process.env.NOTIFY_EMAIL || 'infocodexdevelopers@gmail.com'
  const from = process.env.MAIL_FROM || 'Codex Developers <onboarding@resend.dev>'
  const typeLabel = formatType(lead.type)

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `[Codex] New ${typeLabel.toLowerCase()} — ${lead.name}`,
      text: buildTextBody(lead),
      html: buildHtmlBody(lead),
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Resend failed (${response.status}): ${detail}`)
  }

  return response.json()
}
