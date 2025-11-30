import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js'; 

dotenv.config();

async function main() {
  // Force localhost to check if old data is there
  await mongoose.connect("mongodb://127.0.0.1:27017/muebleria");
  const product = await Product.findOne();
  console.log('Product Image Field:', product.image);
  await mongoose.disconnect();
}

main();
