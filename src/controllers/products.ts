import {Request, Response} from 'express';
import Product from '../models/product';


export const getProducts = async (req: Request, res: Response) => {
  try {
    const productos = await Product.find();
    res.status(201).send(productos);
    
  } catch (error) {
    res.status(500).send({msg: "Error en el servidor", error});
  }
}

export const postProduct = async (req: Request, res: Response) => {
  try {
    const {nombre, descripcion} = req.body;
    if(!nombre || !descripcion) return res.status(401).send({msg: "please fill all fields"});
    const nuevoProducto = new Product({nombre, descripcion});
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({error: "Error al crear el producto"})
  }
}