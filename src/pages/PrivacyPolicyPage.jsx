import { usePageTitle } from '../hooks/usePageTitle'
import './LegalPage.css'

const PrivacyPolicyPage = () => {
  usePageTitle('Privacy Policy — Codex Developers')

  return (
    <div className="legal-page">
      <section className="legal-content page-section-photo">
        <div className="container page-section-heading">
          <h1>Privacy Policy</h1>
          <p className="subtitle">Last updated: September 2026</p>
        </div>

        <div className="container legal-prose">
          <p>
            This is a placeholder privacy policy for Codex Developers. Replace this text with
            reviewed legal language before launching publicly.
          </p>
          <h2>Information we collect</h2>
          <p>
            When you submit a consultation or contact form, we collect the details you provide
            such as your name, phone number, email address, location, and project information.
          </p>
          <h2>How we use information</h2>
          <p>
            We use submitted information to respond to enquiries, prepare quotes, and improve our
            services. We do not sell your personal information.
          </p>
          <h2>Data storage</h2>
          <p>
            Lead submissions are stored securely for business follow-up and may be deleted upon
            request. Contact us at infocodexdevelopers@gmail.com for privacy-related questions.
          </p>
          <h2>Contact</h2>
          <p>
            For questions about this policy, email infocodexdevelopers@gmail.com or call
            +91 98751 72275.
          </p>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicyPage
