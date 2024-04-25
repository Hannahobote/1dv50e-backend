import mongoose from 'mongoose'

export const cheesecakeOrderSchema = new mongoose.Schema({
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
  amount: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    required: true,
  },
  design: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

export const CheesecakeOrder = mongoose.models.CheesecakeOrder || mongoose.model('CheesecakeOrder', cheesecakeOrderSchema);