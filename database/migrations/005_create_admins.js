/**
 * Migration: 005_create_admins
 * Tabel untuk akun administrator sistem internal
 */

exports.up = function (knex) {
  return knex.schema.createTable('admins', (table) => {
    table.increments('id').primary()
    table.string('name', 100).notNullable()
    table.string('email', 150).notNullable().unique()
    table.string('password_hash', 255).notNullable()
    table.enu('role', ['super_admin', 'admin']).defaultTo('admin')
    table.timestamp('last_login_at').nullable()
    table.boolean('is_active').defaultTo(true)
    table.timestamps(true, true)

    // Index untuk login query
    table.index(['email'], 'idx_admins_email')
    table.index(['is_active'], 'idx_admins_is_active')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('admins')
}
