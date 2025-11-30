// scripts/fixLocalImages.js
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Helper function to normalize names for comparison
const normalizeName = (name) => {
    if (!name) return '';
    return path.parse(name).name.replace(/[-_]/g, '').toLowerCase();
}

async function main() {
    // Hardcoded to localhost to fix the running server's DB
    const dbUrl = "mongodb://127.0.0.1:27017/muebleria";
    
    try {
        await mongoose.connect(dbUrl);
        console.log('✅ Conectado a MongoDB LOCAL para actualizar nombres de imagen');

        const products = await Product.find();
        const imageFiles = await fs.readdir(imagesDir);

        for (const product of products) {
            const normalizedProductImage = normalizeName(product.image);

            const foundImageFile = imageFiles.find(file => {
                const normalizedFileName = normalizeName(file);
                return normalizedFileName === normalizedProductImage;
            });

            if (foundImageFile) {
                if (product.image !== foundImageFile) {
                    console.log(`- Actualizando '${product.name}': de '${product.image}' a '${foundImageFile}'`);
                    product.image = foundImageFile;
                    await product.save();
                } else {
                    console.log(`= '${product.name}' ya tiene el nombre de imagen correcto.`);
                }
            } else {
                console.log(`❌ No se encontró imagen para: ${product.name}`);
            }
        }

        console.log('\n✨ Proceso de actualización completado en LOCAL.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Desconectado de MongoDB.');
    }
}

main();
