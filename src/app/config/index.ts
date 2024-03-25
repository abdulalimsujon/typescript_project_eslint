import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  defaultPassword: process.env.DEFAULT_PASSWORD,
  jwtAcessToken: process.env.JWT_ACCESS_TOKEN,
  sult_round: process.env.SULT_ROUND,
  refreshAccessToken: process.env.JWT_REFRESH_ACCESS_TOKEN,
  reset_password_link: process.env.RESET_PASSWORD_UI_LINK,
};
