/**
 * Test: Donation Endpoints
 * Unit & Integration tests untuk endpoint donasi
 */
const request = require('supertest')
const app = require('../src/app')

// Mock emailService agar tidak butuh SMTP nyata
jest.mock('../src/services/emailService', () => ({
  sendDonationConfirmation: jest.fn().mockResolvedValue(true),
  sendContactNotification: jest.fn().mockResolvedValue(true),
}))

// Mock paymentService
jest.mock('../src/services/paymentService', () => ({
  generatePaymentInstruction: jest.fn().mockReturnValue({
    type: 'bank_transfer',
    bank_name: 'BRI',
    account_number: '1234-5678-9012-3456',
    account_name: 'LKSA Dapur Yatim',
    amount: 100123,
    unique_code: 123,
  }),
}))

describe('GET /api/v1/health', () => {
  it('harus return 200 dengan success: true', async () => {
    const res = await request(app).get('/api/v1/health')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toContain('LKSA Dapur Yatim')
  })
})

describe('GET /api/v1/donations/stats', () => {
  it('harus return 200 dengan data statistik', async () => {
    const res = await request(app).get('/api/v1/donations/stats')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toHaveProperty('total_amount')
    expect(res.body.data).toHaveProperty('total_donors')
    expect(res.body.data).toHaveProperty('total_children')
    expect(typeof res.body.data.total_amount).toBe('number')
    expect(typeof res.body.data.total_donors).toBe('number')
  })
})

describe('POST /api/v1/donations', () => {
  const validPayload = {
    donor_name: 'Test Donatur',
    donor_email: 'test@example.com',
    donor_phone: '081234567890',
    amount: 100000,
    payment_method: 'bank_transfer',
    message: 'Semoga bermanfaat',
  }

  it('payload valid → return 201 dengan data donasi', async () => {
    const res = await request(app)
      .post('/api/v1/donations')
      .send(validPayload)

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toHaveProperty('id')
    expect(res.body.data).toHaveProperty('status', 'pending')
  })

  it('tanpa donor_name → return 422', async () => {
    const res = await request(app)
      .post('/api/v1/donations')
      .send({ ...validPayload, donor_name: undefined })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
    expect(res.body.errors).toBeDefined()
  })

  it('amount < 10000 → return 422', async () => {
    const res = await request(app)
      .post('/api/v1/donations')
      .send({ ...validPayload, amount: 5000 })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
    expect(res.body.errors[0]).toMatch(/10\.000/i)
  })

  it('payment_method tidak valid → return 422', async () => {
    const res = await request(app)
      .post('/api/v1/donations')
      .send({ ...validPayload, payment_method: 'bitcoin' })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
  })

  it('email tidak valid → return 422', async () => {
    const res = await request(app)
      .post('/api/v1/donations')
      .send({ ...validPayload, donor_email: 'bukan-email' })

    expect(res.status).toBe(422)
    expect(res.body.success).toBe(false)
  })
})

describe('GET /api/v1/activities', () => {
  it('harus return 200 dengan data dan meta', async () => {
    const res = await request(app).get('/api/v1/activities')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.meta).toHaveProperty('total')
    expect(res.body.meta).toHaveProperty('page')
  })
})

describe('GET /api/v1/reports', () => {
  it('harus return 200 dengan array data', async () => {
    const res = await request(app).get('/api/v1/reports')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
  })
})
