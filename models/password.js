const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passwordSchema = new Schema({
  // You can add more fields related to passwords if needed
  // For example: resetToken, resetTokenExpiration, etc.
  // For now, we'll keep it minimal.
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  hashedPassword: { type: String, required: true }
});

const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;
