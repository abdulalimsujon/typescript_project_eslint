import express from 'express';
import validataRequest from '../../middleware/validationSchemaRequest';
import { updateAdminValidationSchema } from './admin.validation';
import { AdminControllers } from './admin.contoller';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validataRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
