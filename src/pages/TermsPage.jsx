import { usePageTitle } from '../hooks/usePageTitle'
import './LegalPage.css'

const TermsPage = () => {
  usePageTitle('Terms of Service — Codex Developers')

  return (
    <div className="legal-page">
      <section className="legal-content page-section-photo">
        <div className="container page-section-heading">
          <h1>Terms of Service</h1>
          <p className="subtitle">Last updated: September 2026</p>
        </div>

        <div className="container legal-prose">
          <p>
            This is a placeholder terms of service page for Codex Developers. Replace this text
            with reviewed legal language before launching publicly.
          </p>
          <h2>Services</h2>
          <p>
            Codex Developers provides website development, e-commerce, and business software
            services. Project scope, timelines, and fees are agreed separately for each engagement.
          </p>
          <h2>Website use</h2>
          <p>
            Content on this website is for general information. We may update services, pricing
            guidance, and packaging without notice. Submitting a form does not create a binding
            contract until both parties agree in writing.
          </p>
          <h2>Limitation</h2>
          <p>
            To the extent permitted by law, Codex Developers is not liable for indirect or
            consequential losses arising from use of this website or reliance on its content.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to infocodexdevelopers@gmail.com.
          </p>
        </div>
      </section>
    </div>
  )
}

export default TermsPage
