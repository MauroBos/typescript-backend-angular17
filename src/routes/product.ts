import { Router } from 'express';
import { getProducts, postProduct } from '../controllers/products';
import validatetoken from './validate-token';


const router = Router();

router.get('/', validatetoken, getProducts);
router.post('/', postProduct);

export default router;