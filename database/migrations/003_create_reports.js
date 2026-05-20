/**
 * Migration: Create financial_reports table
 * Menyimpan laporan keuangan bulanan untuk keperluan transparansi publik.
 */
exports.up = function (knex) {
  return knex.schema.createTable('financial_reports', (table) => {
    table.increments('id').primary()
    table.string('title', 200).notNullable()
    table.integer('report_month').notNullable().comment('1-12')
    table.integer('report_year').notNullable()
    table.bigInteger('total_income').defaultTo(0).comment('Total pemasukan dalam Rupiah')
    table.bigInteger('total_expense').defaultTo(0).comment('Total pengeluaran dalam Rupiah')
    table.text('summary').nullable()
    table.string('document_url', 255).nullable().comment('Link dokumen laporan PDF')
    table.boolean('is_published').defaultTo(false)
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('financial_reports')
}
