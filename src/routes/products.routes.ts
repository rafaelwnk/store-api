import { Router } from 'express';
import { get, getById, getByTag, create, update, remove, getBySlug } from '../controllers/products.controller';
import authenticate from '../middleware/auth';

const router = Router();

router.get('/', authenticate, get);
router.get('/:id', authenticate, getById);
router.get('/slug/:slug', authenticate, getBySlug);
router.get('/tags/:tag', authenticate, getByTag);
router.post('/', authenticate, create);
router.patch('/:id', authenticate, update);
router.delete('/:id', authenticate, remove);

export default router;