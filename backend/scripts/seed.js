// scripts/seed.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Product from '../models/Product.js'; 
import fs from 'fs';

async function main() {
  // Usamos MONGO_URI que es lo que está en el .env
  await mongoose.connect(process.env.MONGO_URI);
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