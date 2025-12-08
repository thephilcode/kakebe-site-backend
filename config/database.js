// config/database.js  ← Keep this file, just replace content
const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  // Only use DATABASE_URL in production (Render, Railway, etc.)
  // Locally, fall back to SQLite
  if (client === 'postgres' && env('DATABASE_URL')) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: env.bool('DATABASE_SSL', true)
            ? { rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false) }
            : false,
        },
        debug: false,
      },
    };
  }

  // Local SQLite fallback
  if (client === 'sqlite') {
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
        },
        useNullAsDefault: true,
      },
    };
  }

  // Fallback for any other misconfiguration
  throw new Error(`Unsupported database client: ${client}. Use 'postgres' with DATABASE_URL or 'sqlite'.`);
};