import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  medidas: { type: String, required: true },
  materiales: { type: String, required: true },
  acabado: { type: String, required: true },
  peso: { type: String, required: true },
  capacidad: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String },
  image: { type: String },
  features: featureSchema 
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
