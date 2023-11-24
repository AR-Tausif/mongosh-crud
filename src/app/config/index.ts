import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: (path.join(process.cwd()), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  database_local_url: process.env.LOCAL_DATABASE_URL,
};
