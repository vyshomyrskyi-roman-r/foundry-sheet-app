import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(

  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASS || '',

  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: console.log,
  }
);
console.log('DB CONFIG:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  name: process.env.DB_NAME,
});