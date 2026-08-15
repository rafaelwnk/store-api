import { Router } from 'express';
import healthRoutes from './health.routes';
import usersRoutes from './users.routes';
import productsRoutes from './products.routes';

const router = Router();

router.use('/', healthRoutes);
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);

export default router;