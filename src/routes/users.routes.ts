import { Router } from "express";
import { create, get, getById, login, remove, update } from "../controllers/users.controller";
import authenticate from "../middleware/auth";

const router = Router();

router.get('/', authenticate, get);
router.get('/:id', authenticate, getById);
router.post('/register', create);
router.patch('/:id', authenticate, update);
router.delete('/:id', authenticate, remove);
router.post('/login', login);

export default router;