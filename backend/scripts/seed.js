// scripts/seed.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Product from '../models/Product.js'; 
import fs from 'fs';

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Conectado a MongoDB para seed');

  // Ruta del JSON
  const data = JSON.parse(fs.readFileSync('../backend/data/productos.json', 'utf-8'));

  const inserted = await Product.insertMany(data);
  console.log(`✅ ${inserted.length} productos cargados correctamente`);

  await mongoose.disconnect();
  console.log('🔌 Desconectado de MongoDB. Seed finalizado.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});