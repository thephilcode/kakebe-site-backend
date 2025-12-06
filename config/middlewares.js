// config/middlewares.js
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',  // ← Keep this, but we'll override it below
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

// Override security middleware (CSP fix)
module.exports.security = {
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'connect-src': ["'self'", 'https:'],
      'img-src': ["'self'", 'data:', 'blob:', 'https:'],
      'media-src': ["'self'", 'data:', 'blob:', 'https:'],
      'script-src': [
        "'self'",
        "'unsafe-eval'",  // ← Critical: Strapi admin needs this for React
        'https://cdnjs.cloudflare.com',
        'https://*.onrender.com'  // ← Your Render domain
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'",  // ← For Strapi's inline styles
        'https://cdnjs.cloudflare.com'
      ],
      'font-src': [
        "'self'",
        'https://cdnjs.cloudflare.com',
        'data:'
      ]
    },
  },
};
