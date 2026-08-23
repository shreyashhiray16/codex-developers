export const company = {
  name: 'Codex Developers',
  tagline: 'Digital Solutions That Help Your Business Grow',
  description:
    'Codex Developers helps businesses build a powerful online presence and streamline their operations through professional websites, e-commerce platforms, and customized business software.',
  shortDescription:
    'Professional website development and business software solutions.',

  contact: {
    phone: '+919875172275 / +919421335673',
    phoneNumbers: ['+919875172275', '+919421335673'],
    email: 'infocodexdevelopers@gmail.com',
    whatsapp: '+919875172275',
  },

  social: {
    linkedin: '#',
    twitter: '#',
    facebook: '#',
    instagram: 'https://www.instagram.com/codex__developers',
    youtube: '#',
  },

  legal: {
    copyright: `© ${new Date().getFullYear()} Codex Developers. All rights reserved.`,
    privacyPolicy: '/privacy-policy',
    termsOfService: '/terms-of-service',
  },

  navigation: [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Industries', path: '/industries' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],

  cta: {
    primary: { label: 'Get a Free Consultation', path: '/contact' },
    secondary: { label: 'Request a Quote', path: '/contact' },
  },
}
