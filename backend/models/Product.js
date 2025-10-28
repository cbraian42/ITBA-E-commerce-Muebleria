import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  // Relación con la colección Feature
  feature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feature',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
