import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import shopsCtrl from '../controllers/shops.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/gauri', (req, res) =>
  res.send('SHOP GAURI')
);

router.route('/restaurants/position/:shopId')
  .get(shopsCtrl.get);

router.route('/restaurants/position')

  .get(shopsCtrl.findWithinMiles)
  /** POST /api/shops/restaurants/position - Create new user */
  .post(validate(paramValidation.restaurantsByPosition), shopsCtrl.findWithinMiles);

export default router;
