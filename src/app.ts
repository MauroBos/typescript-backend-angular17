import express from 'express';
import routesProduct from './routes/product';
import routesUser from './routes/user';
import { conectarDB } from './db/database';
import cors from 'cors';

class Server{

  private app:  express.Application;
  private port: String;



  

  constructor(){
    this.app = express();
    this.port = process.env.PORT || "4000";
    this.listen();
    this.midlewares();



    this.routes();
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Server running in port http://localhost:${this.port}`);
      conectarDB();
    })
  }

  routes(){
    this.app.use('/api/products', routesProduct);
    this.app.use('/api/users', routesUser);
  }




  midlewares(){
    this.app.use(express.json());
    this.app.use(cors());
  }

}

export default Server;