import { useEffect, useState } from 'react'
import { RefreshCw, Trash2 } from 'lucide-react'
import './AdminPage.css'

const AdminPage = () => {
  const [consultations, setConsultations] = useState([])
  const [status, setStatus] = useState('loading')
  const [token, setToken] = useState('')
  const [requiresToken, setRequiresToken] = useState(false)

  const loadConsultations = () => {
    setStatus('loading')
    fetch('/api/consultations', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(response => {
        if (response.status === 401) {
          setRequiresToken(true)
          throw new Error('Unauthorized')
        }
        if (!response.ok) throw new Error('Unable to load consultations')
        return response.json()
      })
      .then(data => { setConsultations(data); setStatus('ready') })
      .catch(() => setStatus('error'))
  }

  useEffect(loadConsultations, [])

  const removeConsultation = async (id) => {
    if (!window.confirm('Delete this consultation request?')) return
    const response = await fetch(`/api/consultations/${id}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    if (response.ok) setConsultations(current => current.filter(item => item.id !== id))
  }

  return (
    <section className="admin-page">
      <div className="admin-container">
        <div className="admin-heading">
          <div>
            <p className="admin-eyebrow">Operations</p>
            <h1>Consultation requests</h1>
            <p>Review new requests submitted through the consultation form.</p>
          </div>
          <button className="admin-refresh" onClick={loadConsultations} title="Refresh requests" aria-label="Refresh requests">
            <RefreshCw size={18} />
          </button>
        </div>

        {requiresToken && (
          <form className="admin-token-form" onSubmit={(event) => { event.preventDefault(); setRequiresToken(false); loadConsultations() }}>
            <label htmlFor="admin-token">Admin token</label>
            <input id="admin-token" type="password" value={token} onChange={event => setToken(event.target.value)} placeholder="Enter ADMIN_TOKEN" />
            <button type="submit" className="btn btn-primary">View requests</button>
          </form>
        )}

        {status === 'loading' && <p className="admin-state">Loading requests...</p>}
        {status === 'error' && !requiresToken && <p className="admin-state admin-error">Could not load requests. Check that the API server is running.</p>}
        {status === 'ready' && consultations.length === 0 && <p className="admin-state">No consultation requests yet.</p>}
        {consultations.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Phone</th><th>Location</th><th>Service</th><th>Received</th><th><span className="sr-only">Actions</span></th></tr></thead>
              <tbody>{consultations.map(item => (
                <tr key={item.id}>
                  <td data-label="Name">{item.name}</td>
                  <td data-label="Phone">{item.phone}</td>
                  <td data-label="Location">{item.place}</td>
                  <td data-label="Service">{item.service}</td>
                  <td data-label="Received">{new Date(item.createdAt).toLocaleString()}</td>
                  <td><button className="admin-delete" onClick={() => removeConsultation(item.id)} title="Delete request" aria-label={`Delete request from ${item.name}`}><Trash2 size={16} /></button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default AdminPage