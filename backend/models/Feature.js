import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  medidas: {
    type: String,
    required: true,
    trim: true
  },
  materiales: {
    type: String,
    required: true,
    trim: true
  },
  acabado: {
    type: String,
    required: true,
    trim: true
  },
  peso: {
    type: String,
    required: true,
    trim: true
  },
  capacidad: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Feature', featureSchema);
