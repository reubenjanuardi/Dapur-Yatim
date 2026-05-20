/**
 * Migration: Create activities table
 * Menyimpan data kegiatan dan program yang dijalankan lembaga.
 */
exports.up = function (knex) {
  return knex.schema.createTable('activities', (table) => {
    table.increments('id').primary()
    table.string('title', 200).notNullable()
    table.text('description').notNullable()
    table.string('thumbnail', 255).nullable()
    table.enu('category', ['education', 'health', 'nutrition', 'social', 'other']).defaultTo('other')
    table.date('activity_date').notNullable()
    table.integer('participants_count').defaultTo(0)
    table.boolean('is_published').defaultTo(false)
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('activities')
}
