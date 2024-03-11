import { Router } from "express";
import { signIn, signUp, userList } from "../controllers/user";

const router = Router();

router.post('/', signUp);
router.post('/login', signIn)
router.get('/list', userList);

export default router;