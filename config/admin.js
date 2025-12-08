module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    sessions: {
      // Determines how long an authentication session lasts.
      // After this period, the user needs to log in again, 
      // unless a valid refresh token can be used. (e.g., '24h', '30d')
      maxSessionLifespan: env('ADMIN_SESSION_LIFESPAN', '7d'),

      // Determines the maximum time a refresh token remains valid.
      // After this period, the user MUST log in again, even if they were active.
      // This is generally set much longer than the session lifespan. (e.g., '60d', '1y')
      maxRefreshTokenLifespan: env('ADMIN_REFRESH_LIFESPAN', '60d'),
    },
  },
  settings: {
    passwordRequirements: [
      {
        // Minimum password length
        regex: '.{8,}',
        message: 'Password must be at least 8 characters long.',
      },
      {
        // Requires at least one uppercase letter (A-Z)
        regex: '(?=.*[A-Z])',
        message: 'Password must contain at least one uppercase letter.',
      },
      {
        // Requires at least one number (0-9)
        regex: '(?=.*[0-9])',
        message: 'Password must contain at least one number.',
      },
      {
        // Requires at least one symbol or special character
        regex: '(?=.*[!@#$%^&*])',
        message: 'Password must contain at least one symbol (e.g., !@#$%^&*).',
      },
    ],
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
