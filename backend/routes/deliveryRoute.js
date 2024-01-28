import express from 'express';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';
import { setDelivery, updateDeliveryWithPhonenumber, getdeliveryWithPhonenumber } from '../controllers/deliveryController.js';

const router = express.Router();

router.route('/set_delivery').post(protectAdmin, setDelivery);
router.route('/update_delivery').put(protect, updateDeliveryWithPhonenumber);
router.route('/update_delivery_admin').put(protectAdmin, updateDeliveryWithPhonenumber);
router.route('/get_with_phonenumber_admin').post(protectAdmin, getdeliveryWithPhonenumber);
router.route('/get_with_phonenumber').post(protect, getdeliveryWithPhonenumber);

export default router

