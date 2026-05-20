const Joi = require('joi')

// ─── Validation Schemas ───────────────────────────────────────────

const createDonationSchema = Joi.object({
  donor_name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Nama minimal 2 karakter.',
    'any.required': 'Nama donatur wajib diisi.',
  }),
  donor_email: Joi.string().email().required().messages({
    'string.email': 'Format email tidak valid.',
    'any.required': 'Email wajib diisi.',
  }),
  donor_phone: Joi.string().pattern(/^[0-9+\-\s]{10,15}$/).optional().messages({
    'string.pattern.base': 'Format nomor telepon tidak valid.',
  }),
  amount: Joi.number().integer().min(10000).required().messages({
    'number.min': 'Nominal donasi minimal Rp 10.000.',
    'any.required': 'Nominal donasi wajib diisi.',
  }),
  payment_method: Joi.string()
    .valid('bank_transfer', 'qris')
    .required()
    .messages({ 'any.only': 'Metode pembayaran tidak valid.' }),
  message: Joi.string().max(500).optional().allow(''),
})

const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(5).max(200).required(),
  message: Joi.string().min(10).max(1000).required(),
})

// ─── Validation Middleware Factory ───────────────────────────────

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false })
  if (error) {
    const errors = error.details.map((d) => d.message)
    return res.status(422).json({
      success: false,
      message: 'Validasi gagal. Periksa kembali data yang Anda masukkan.',
      errors,
    })
  }
  next()
}

module.exports = validateRequest
module.exports.createDonationSchema = createDonationSchema
module.exports.createContactSchema = createContactSchema
