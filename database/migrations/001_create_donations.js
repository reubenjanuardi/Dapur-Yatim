/**
 * Migration: Create donations table
 * Menyimpan data donatur dan transaksi donasi.
 */
exports.up = function (knex) {
  return knex.schema.createTable('donations', (table) => {
    table.increments('id').primary()
    table.string('donor_name', 100).notNullable()
    table.string('donor_email', 150).notNullable()
    table.string('donor_phone', 20).nullable()
    table.bigInteger('amount').notNullable().comment('Nominal donasi dalam Rupiah')
    table.enu('payment_method', ['bank_transfer', 'qris']).notNullable()
    table.enu('status', ['pending', 'confirmed', 'rejected']).defaultTo('pending')
    table.text('message').nullable().comment('Pesan dari donatur')
    table.string('proof_of_payment', 255).nullable().comment('Path file bukti transfer')
    table.timestamp('confirmed_at').nullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('donations')
}
