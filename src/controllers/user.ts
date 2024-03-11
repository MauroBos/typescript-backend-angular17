import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user";

export const signUp = async (req: Request, res: Response) => {
  try {
    const {nombre, email, password} = req.body;


    if(!nombre || !email || !password){
      res.status(401).json({msg: "por favor entre todos los campos"})
    }

    const esuser = await User.findOne({email});

   console.log(esuser)

   if(esuser) return res.status(400).send({msg: "the email already exist"});

    const nuevoUsuario = new User({nombre, email, password});
    
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario) 
      
  } catch (error: any) {
    res.status(500).json({error: "Error al crear el usuario"})
  }
}

export const signIn = async (req: Request, res: Response) => {

  const {email, password } = req.body;

  if(!email || !password) return res.status(401).send({msg: "Please complete all fields"});

  const user = await User.findOne({email});

  console.log(user)

  if(!user) return res.status(400).send({msg: "The user does not exist"});

  const isMatch = await user.comparePassword(req.body.password)

  console.log(isMatch)

  if(!isMatch) {
    return res.status(401).send("La contraseña no coincide"); 
  } 

    const token = jwt.sign({
      email
    }, process.env.SECRET_KEY || "demos123")
    
    res.status(201).json(token);
}

export const userList = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if(!users) return  res.status(401).send({msg: "No users was found"});
    res.status(201).send(users);
    

  } catch (error) {
    res.status(500).send({error: "Error en el servidor"})
  }
}