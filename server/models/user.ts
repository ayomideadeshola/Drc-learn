import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";
import { Course } from "./course.js";

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
    
    let admin = await User.findOne({ where: { email: adminEmail } });
    
    if (!admin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      admin = await User.create({
        email: adminEmail,
        password: hashedPassword,
        name: "System Admin",
        role: "admin",
      });
      console.log(`Default admin account created: ${adminEmail} / admin123`);
    }

    // Add mock courses if none exist
    const courseCount = await Course.count();
    if (courseCount === 0) {
      await Course.bulkCreate([
        {
          title: "Executive Leadership Mastery",
          description: "Master the art of leading high-performance teams in a global environment.",
          creatorId: admin.id,
          price: 199.99,
          category: "Leadership",
          thumbnail: "https://picsum.photos/seed/leadership/800/600"
        },
        {
          title: "Advanced Data Analytics",
          description: "Learn to derive actionable insights from complex datasets using modern tools.",
          creatorId: admin.id,
          price: 149.99,
          category: "Analytics",
          thumbnail: "https://picsum.photos/seed/analytics/800/600"
        },
        {
          title: "Full-Stack Development with React",
          description: "Build modern, scalable web applications from scratch.",
          creatorId: admin.id,
          price: 99.99,
          category: "Technology",
          thumbnail: "https://picsum.photos/seed/tech/800/600"
        }
      ]);
      console.log("Mock courses created.");
    }

    console.log("Initialization complete.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
