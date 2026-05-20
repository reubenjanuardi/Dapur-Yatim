/**
 * Helper: insertAndFetch
 * Abstraksi INSERT yang kompatibel dengan SQLite dan PostgreSQL.
 *
 * - PostgreSQL: gunakan .returning('*') untuk langsung dapat semua kolom
 * - SQLite    : .returning('*') tidak didukung, jadi insert dulu lalu SELECT by id
 *
 * @param {import('knex').Knex} db - Instance Knex
 * @param {string} table - Nama tabel
 * @param {object} data - Data yang akan diinsert
 * @returns {Promise<object>} Row yang baru diinsert
 */
async function insertAndFetch(db, table, data) {
  const client = db.client.config.client

  if (client === 'postgresql' || client === 'pg') {
    // PostgreSQL: RETURNING * langsung
    const [row] = await db(table).insert(data).returning('*')
    return row
  }

  // SQLite (better-sqlite3) dan lainnya
  const [id] = await db(table).insert(data)
  const row = await db(table).where({ id }).first()
  return row
}

/**
 * Helper: updateAndFetch
 * Abstraksi UPDATE yang kompatibel dengan SQLite dan PostgreSQL.
 *
 * @param {import('knex').Knex} db - Instance Knex
 * @param {string} table - Nama tabel
 * @param {object} where - Kondisi WHERE
 * @param {object} data - Data yang akan diupdate
 * @returns {Promise<object|null>} Row yang sudah diupdate, atau null jika tidak ditemukan
 */
async function updateAndFetch(db, table, where, data) {
  const client = db.client.config.client

  if (client === 'postgresql' || client === 'pg') {
    const [row] = await db(table).where(where).update(data).returning('*')
    return row || null
  }

  // SQLite
  const count = await db(table).where(where).update(data)
  if (count === 0) return null
  return db(table).where(where).first()
}

module.exports = { insertAndFetch, updateAndFetch }
