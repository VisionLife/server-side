import * as dotenv from 'dotenv';

dotenv.config();

const appEnv = {
  DB_CONNECTION: 'mysql',
  DB_HOST: 'visionlife-db.csouxr9u4vhk.sa-east-1.rds.amazonaws.com',
  DB_USERNAME: 'admin',
  DB_PASSWORD: 'Visionlife#2023',
  DB_DATABASE: 'visionlife_db',
  DB_PORT: '3306',
  HASH_SALT: '$2b$04$uvOzDc9nGCaO37oyMJVRtu',
  JWT_SECRET: 'JWT_SECRET-verysmartlythought',
};

export default Object.freeze(appEnv);
