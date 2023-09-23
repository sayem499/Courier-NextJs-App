import express from 'express';
import { adminTokenCheck, getAdmin, authAdmin, registerAdmin, logoutAdmin, updateAdminData } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authAdmin);
router.post('/auth', authAdmin);
router.route('/all').get(protectAdmin, getAdmin);
router.route('/register').post(protectAdmin, registerAdmin);
router.post('/logout', logoutAdmin);
router.route('/update').put(protectAdmin, updateAdminData);
router.route('/token_check').get(protectAdmin, adminTokenCheck);

export default router;