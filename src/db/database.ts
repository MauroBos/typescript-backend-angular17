import mongoose from "mongoose";


export async function conectarDB(){
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log("Conexion exitosa");
    
  } catch (error) {
    console.log("Error al conectar con MongoDB: ", error);
    
  }
}

export default mongoose;