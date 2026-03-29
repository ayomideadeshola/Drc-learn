import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

export class User extends Model {
  public id!: string;
  public email!: string;
  public password!: string;
  public name!: string;
  public role!: "admin" | "creator" | "user";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => Math.random().toString(36).substring(2, 9),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "creator", "user"),
      defaultValue: "user",
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export const initMockData = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
