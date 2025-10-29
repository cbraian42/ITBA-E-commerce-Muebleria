import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Product from './models/Product.js'; // 👈 Agregar .js
import fs from 'fs';

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Conectado a MongoDB para seed');

  // Leer archivo JSON
  const data = JSON.parse(fs.readFileSync('./data/productos.json', 'utf-8'));

  // Opción: limpiar colección antes (solo si querés empezar limpio)
  // await Product.deleteMany({});

  // Insertar todos los productos
  const inserted = await Product.insertMany(data);
  console.log(`✅ ${inserted.length} productos cargados correctamente`);

  await mongoose.disconnect();
  console.log('🔌 Desconectado de MongoDB. Seed finalizado.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});