import mongoose from 'mongoose'

export const cakeOrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phonenr: {
    type: Number,
    required: true,
    unique: true
  },
  epost: {
    type: String,
    required: true,
  },
  delivery_adress: {
    type: String,
    required: true,
  },
  delivery_date: {
    type: String,
    required: true,
  },
  taste: {
    type: String,
    required: true,
  },
  filling: {
    type: String,
    required: true,
  },
  design: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

export const CakeOrder = mongoose.models.CakeOrder || mongoose.model('CakeOrder', cakeOrderSchema);