import mongoose from 'mongoose'

export const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

export const Users =  mongoose.models.Users || mongoose.model('Users', UsersSchema);