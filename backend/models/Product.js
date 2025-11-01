import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  name: { type: String, required: true },    // 👈 Cambio de "medidas" a "name"
  value: { type: String, required: true }    // 👈 Cambio a "value"
}, { _id: false }); // _id: false para no crear IDs en subdocumentos

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String },
  stock:{type: Number, default: 0},  //en la consigna no dice q sea requiered asi que puse 0 de default, aunque en el front tambien esta como 0, es mas que nada por un tema de POSTs con postman
  image: { type: String },
  features: [featureSchema]  // 👈 Array de features
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);