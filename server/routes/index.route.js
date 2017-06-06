import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import shopsRoutes from './shops.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);
router.get('/gauri', (req, res) =>
  res.send('GAURI')
);
// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount shop routes at /shops
router.use('/shops', shopsRoutes);
export default router;
