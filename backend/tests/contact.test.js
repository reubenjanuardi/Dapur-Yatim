/**
 * Test: Contact Endpoints
 * Integration tests untuk endpoint form kontak
 */
const request = require('supertest')
const app = require('../src/app')

// Mock emailService
jest.mock('../src/services/emailService', () => ({
  sendDonationConfirmation: jest.fn().mockResolvedValue(true),
  sendContactNotification: jest.fn().mockResolvedValue(true),
}))

describe('POST /api/v1/contact', () => {
  const validPayload = {
    name: 'Pengirim Test',
    email: 'pengirim@example.com',
    subject: 'Pertanyaan tentang donasi',
    message: 'Saya ingin bertanya lebih lanjut tentang cara berdonasi dan program yang ada.',
  }

  it('payload valid → return 200 success', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .send(validPayload)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toContain('berhasil')
    expect(res.body.data).toHaveProperty('id')
  })

  it('tanpa name → return 422', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .send({ ...validPayload, name: undefined })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
  })

  it('email tidak valid → return 422', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .send({ ...validPayload, email: 'bukan-email-valid' })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
  })

  it('pesan terlalu pendek (< 10 karakter) → return 422', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .send({ ...validPayload, message: 'Halo' })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
  })

  it('subjek terlalu pendek (< 5 karakter) → return 422', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .send({ ...validPayload, subject: 'Hi' })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
  })

  it('semua field kosong → return 422', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .send({})

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
    expect(res.body.errors).toBeDefined()
    expect(res.body.errors.length).toBeGreaterThan(0)
  })
})
