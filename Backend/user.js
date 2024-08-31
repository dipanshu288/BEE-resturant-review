const mongoose = require('mongoose');
const uuid=require('uuid');
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: uuid.v4,
        required: true,
        unique: true
      },
    username: {
    type: String,
    required: true,
    unique: true
        },
  
    email: {
    type: String,
    required: true,
    unique: true
    },
    passwordHash: {
    type: String,
    required: true
    },
    role: {
    type: String,
    enum: ['admin', 'owner', 'customer'],
    default: 'customer'
    }
  
});

module.exports = mongoose.model('User', userSchema);