import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";

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
    console.log("Initializing database...");
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized.");

    // Check if the specific admin email exists
    const adminEmail = "admin@learnos.com".toLowerCase();
    console.log(`Checking for admin: ${adminEmail}`);
    
    // Delete existing admin to ensure fresh start with correct password
    await User.destroy({ where: { email: adminEmail } });
    console.log(`Deleted existing admin ${adminEmail} for fresh recreation.`);

    const hashedPassword = await bcrypt.hash("admin123", 10);
    try {
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        name: "System Admin",
        role: "admin",
      });
      console.log(`Default admin account created: ${adminEmail} / admin123`);
    } catch (createError) {
      console.error("Failed to create default admin:", createError);
    }
    console.log("Initialization complete.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
