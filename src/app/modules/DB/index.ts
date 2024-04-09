import config from '../../config';
import { USER_ROLE } from '../user/user.const';
import { User } from '../user/user.model';

const superuser = {
  id: '0001',
  email: 'abdul15-3772@diu.edu.bd',
  password: config.super_admin_password,
  needPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  // when the database is connected , we will check if there is any super admin

  const isSuperAdminExist = await User.findOne({ role: 'super-admin' });
  if (!isSuperAdminExist) {
    await User.create(superuser);
  }
};

export default seedSuperAdmin;
