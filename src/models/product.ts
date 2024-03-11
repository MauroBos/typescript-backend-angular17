import mongoose, { Schema, Document} from "mongoose";

export interface Product extends Document {
  nombre: String;
  descripcion: String;
}

const productSchema: Schema = new Schema({
  nombre: {type: String, required: true},
  descripcion: {type: String, required: true}
},
{
  timestamps: true,
  versionKey: false
}
);

export default mongoose.model<Product>('Product', productSchema);