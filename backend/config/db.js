import mongoose from 'mongoose';

export const connectDB = async () => {
  try {

    const dbUrl = process.env.MONGO_URI;

    await mongoose.connect(dbUrl);

    console.log('✅ Conectado a MongoDB correctamente');
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error.message);
    process.exit(1);
  }
};