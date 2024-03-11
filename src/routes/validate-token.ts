import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const validatetoken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers['authorization']
  if(headerToken !== undefined && headerToken.startsWith('Bearer ')){
    try {
      
      const bearerToken = headerToken.slice(7);
  
      jwt.verify(bearerToken, process.env.SECRET_KEY || 'pepe123');
  
      next();
    } catch (error) {
      res.status(401).json({msg: "The token isn't allowed"})
    }
  } else {
    res.status(401).json({msg: "Acces Denied"})
  }
  
}

export default validatetoken;