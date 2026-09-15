import { useCallback, useEffect, useState } from 'react'
import { RefreshCw, Trash2 } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'
import './AdminPage.css'

const TOKEN_KEY = 'codex_admin_token'

const AdminPage = () => {
  usePageTitle('Admin — Codex Developers')

  const [consultations, setConsultations] = useState([])
  const [status, setStatus] = useState('loading')
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '')
  const [requiresToken, setRequiresToken] = useState(false)

  useEffect(() => {
    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex, nofollow')
    return () => {
      robots.setAttribute('content', 'index, follow')
    }
  }, [])

  const loadConsultations = useCallback((authToken) => {
    const activeToken = authToken ?? sessionStorage.getItem(TOKEN_KEY) ?? ''
    setStatus('loading')
    fetch('/api/consultations', {
      headers: activeToken ? { Authorization: `Bearer ${activeToken}` } : {},
    })
      .then(response => {
        if (response.status === 401) {
          setRequiresToken(true)
          setStatus('error')
          throw new Error('Unauthorized')
        }
        if (!response.ok) throw new Error('Unable to load consultations')
        return response.json()
      })
      .then(data => {
        setConsultations(data)
        setRequiresToken(false)
        setStatus('ready')
      })
      .catch((error) => {
        if (error.message !== 'Unauthorized') setStatus('error')
      })
  }, [])

  useEffect(() => {
    loadConsultations()
  }, [loadConsultations])

  const handleTokenSubmit = (event) => {
    event.preventDefault()
    sessionStorage.setItem(TOKEN_KEY, token)
    setRequiresToken(false)
    loadConsultations(token)
  }

  const removeConsultation = async (id) => {
    if (!window.confirm('Delete this request?')) return
    const activeToken = sessionStorage.getItem(TOKEN_KEY) || token
    const response = await fetch(`/api/consultations/${id}`, {
      method: 'DELETE',
      headers: activeToken ? { Authorization: `Bearer ${activeToken}` } : {},
    })
    if (response.ok) setConsultations(current => current.filter(item => item.id !== id))
  }

  const formatType = (type) => (type === 'contact' ? 'Contact' : 'Consultation')

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-heading">
          <div>
            <p className="admin-eyebrow">Operations</p>
            <h1>Lead requests</h1>
            <p>Review consultation and contact form submissions.</p>
          </div>
          <button className="admin-refresh" onClick={() => loadConsultations()} title="Refresh requests" aria-label="Refresh requests">
            <RefreshCw size={18} />
          </button>
        </div>

        {requiresToken && (
          <form className="admin-token-form" onSubmit={handleTokenSubmit}>
            <label htmlFor="admin-token">Admin token</label>
            <input
              id="admin-token"
              type="password"
              value={token}
              onChange={event => setToken(event.target.value)}
              placeholder="Enter ADMIN_TOKEN"
            />
            <button type="submit" className="btn btn-primary">View requests</button>
          </form>
        )}

        {status === 'loading' && <p className="admin-state">Loading requests...</p>}
        {status === 'error' && !requiresToken && <p className="admin-state admin-error">Could not load requests. Check that the API server is running.</p>}
        {status === 'ready' && consultations.length === 0 && <p className="admin-state">No lead requests yet.</p>}
        {consultations.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Service</th>
                  <th>Budget</th>
                  <th>Received</th>
                  <th><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {consultations.map(item => (
                  <tr key={item.id}>
                    <td data-label="Type">{formatType(item.type)}</td>
                    <td data-label="Name">{item.name}</td>
                    <td data-label="Phone">{item.phone}</td>
                    <td data-label="Email">{item.email || '—'}</td>
                    <td data-label="Location">{item.place || '—'}</td>
                    <td data-label="Service">{item.service || '—'}</td>
                    <td data-label="Budget">{item.budgetRange || '—'}</td>
                    <td data-label="Received">{new Date(item.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="admin-delete"
                        onClick={() => removeConsultation(item.id)}
                        title="Delete request"
                        aria-label={`Delete request from ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
