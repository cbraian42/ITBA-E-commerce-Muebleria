import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  name: { type: String, required: true },    // 👈 Cambio de "medidas" a "name"
  value: { type: String, required: true }    // 👈 Cambio a "value"
}, { _id: false }); // _id: false para no crear IDs en subdocumentos

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String },
  image: { type: String },
  features: [featureSchema]  // 👈 Array de features
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);