import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String, default: null },
  fileType: { type: String, default: null }
}, { timestamps: true });

const Ad = mongoose.model('Ad', adSchema);

export default Ad;
