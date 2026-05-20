require('dotenv').config()

/**
 * @type { import("knex").Knex.Config }
 */
module.exports = {
  development: {
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
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
  },
}
