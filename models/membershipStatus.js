const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const membershipStatusSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' }
});

const MembershipStatus = mongoose.model('MembershipStatus', membershipStatusSchema);

module.exports = MembershipStatus;
