/**
 * Migration: 004_create_contacts
 * Tabel untuk menyimpan pesan masuk dari formulir kontak
 */

exports.up = function (knex) {
  return knex.schema.createTable('contacts', (table) => {
    table.increments('id').primary()
    table.string('name', 100).notNullable()
    table.string('email', 150).notNullable()
    table.string('subject', 200).notNullable()
    table.text('message').notNullable()
    table.boolean('is_read').defaultTo(false)
    table.timestamps(true, true)

    // Index untuk filter is_read (digunakan admin)
    table.index(['is_read'], 'idx_contacts_is_read')
    table.index(['created_at'], 'idx_contacts_created_at')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('contacts')
}
