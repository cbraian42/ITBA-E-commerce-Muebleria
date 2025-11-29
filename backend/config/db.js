import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // 👇 CAMBIO CLAVE: Escribimos la dirección directamente aquí para saltarnos el error del .env
    // Si usas Atlas, pega tu link de la nube aquí en lugar del localhost.
    const dbUrl = "mongodb://127.0.0.1:27017/muebleria"; 

    await mongoose.connect(dbUrl);
    
    console.log('✅ Conectado a MongoDB correctamente (Modo Local Directo)');
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error.message);
    // Tip: Si sale error aquí, asegúrate de que XAMPP (MySQL/Apache) no esté bloqueando o que MongoDB esté instalado.
    process.exit(1);
  }
};