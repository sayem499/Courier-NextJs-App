import express from 'express';
import { adminTokenCheck, getAdmin, authAdmin, registerAdmin, logoutAdmin, updateAdminData } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authAdmin);
router.post('/auth', authAdmin);
router.route('/all').get(protect, getAdmin);
router.route('/register').post(protect, registerAdmin);
router.post('/logout', logoutAdmin);
router.route('/profile').put(protect, updateAdminData);
router.route('/token_check').get(protect, adminTokenCheck);

export default router;