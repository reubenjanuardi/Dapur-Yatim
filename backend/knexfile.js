require('dotenv').config()

const isSQLite = process.env.DB_CLIENT === 'sqlite3' || process.env.NODE_ENV === 'sqlite'

/**
 * @type { import("knex").Knex.Config }
 */
module.exports = {
  // ─── SQLite (development lokal tanpa PostgreSQL) ──────────────────────────
  sqlite: {
    client: 'better-sqlite3',
    connection: {
      filename: process.env.SQLITE_PATH || '../database/dapur_yatim.sqlite3',
    },
    useNullAsDefault: true, // SQLite tidak support DEFAULT untuk beberapa tipe
    migrations: {
      directory: '../database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: '../database/seeds',
    },
  },

  // ─── Development (default: ikut .env, bisa SQLite atau PostgreSQL) ────────
  development: isSQLite
    ? {
        client: 'better-sqlite3',
        connection: {
          filename: process.env.SQLITE_PATH || '../database/dapur_yatim.sqlite3',
        },
        useNullAsDefault: true,
        migrations: {
          directory: '../database/migrations',
          tableName: 'knex_migrations',
        },
        seeds: {
          directory: '../database/seeds',
        },
      }
    : {
        client: 'postgresql',
        connection: {
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT || 5432,
          database: process.env.DB_NAME || 'dapur_yatim_db',
          user: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || '',
        },
        pool: { min: 2, max: 10 },
        migrations: {
          directory: '../database/migrations',
          tableName: 'knex_migrations',
        },
        seeds: {
          directory: '../database/seeds',
        },
      },

  // ─── Test ─────────────────────────────────────────────────────────────────
  test: {
    client: 'better-sqlite3',
    connection: { filename: ':memory:' }, // in-memory, bersih setiap test run
    useNullAsDefault: true,
    migrations: {
      directory: '../database/migrations',
      tableName: 'knex_migrations',
    },
  },

  // ─── Production (selalu PostgreSQL) ───────────────────────────────────────
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    migrations: {
      directory: '../database/migrations',
      tableName: 'knex_migrations',
    },
  },
}


