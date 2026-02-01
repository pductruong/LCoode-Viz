import { Router } from 'express';
import problemRoutes from './problems';
import topicRoutes from './topics';

const router = Router();

router.use('/problems', problemRoutes);
router.use('/topics', topicRoutes);

export default router;
