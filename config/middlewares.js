module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': ["'self'", "'unsafe-eval'"],
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'res.cloudinary.com', // <--- vital for viewing images
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'res.cloudinary.com', // <--- vital for viewing video/audio
          ],
          upgradeInsecureRequests: null,
          'script-src': [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",  // ← Critical: Strapi admin needs this for React
            'https:',
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
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
