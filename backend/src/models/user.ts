// models/user.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

export class User extends Model<UserAttributes, Omit<UserAttributes, 'id'>> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email:    { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'User' }
);
