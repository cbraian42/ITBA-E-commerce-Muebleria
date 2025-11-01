// backend/scripts/fixImageNames.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from the root .env file
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Helper function to normalize names for comparison
const normalizeName = (name) => {
    if (!name) return '';
    // Removes extension, dashes, and underscores, and converts to lowercase
    return path.parse(name).name.replace(/[-_]/g, '').toLowerCase();
}

async function main() {
    if (!process.env.MONGODB_URI) {
        console.error('Error: MONGODB_URI no está definida. Asegúrate de que tu archivo .env está en el directorio backend.');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB para actualizar nombres de imagen');

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
                    console.log(`= '${product.name}' ya tiene el nombre de imagen correcto ('${product.image}').`);
                }
            } else {
                console.log(`❌ No se encontró imagen para: ${product.name} (buscando por: ${product.image})`);
            }
        }

        console.log('\n✨ Proceso de actualización completado.');

    } catch (error) {
        console.error('Ha ocurrido un error durante el proceso:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Desconectado de MongoDB.');
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
