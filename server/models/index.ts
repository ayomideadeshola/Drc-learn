// Define associations at the end to avoid circular dependency issues
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";
import { Course } from "./course.js";
import { Enrollment } from "./enrollment.js";
import { User } from "./user.js";

// User <-> Course (Creator)
if (!User.associations.createdCourses) {
  User.hasMany(Course, { as: "createdCourses", foreignKey: "creatorId" });
}
if (!Course.associations.creator) {
  Course.belongsTo(User, { as: "creator", foreignKey: "creatorId" });
}

// User <-> Enrollment <-> Course
if (!User.associations.Enrollments) {
  User.hasMany(Enrollment, { foreignKey: "userId" });
}
if (!Enrollment.associations.User) {
  Enrollment.belongsTo(User, { foreignKey: "userId" });
}

if (!Course.associations.Enrollments) {
  Course.hasMany(Enrollment, { foreignKey: "courseId" });
}
if (!Enrollment.associations.Course) {
  Enrollment.belongsTo(Course, { foreignKey: "courseId" });
}

if (!User.associations.enrolledCourses) {
  User.belongsToMany(Course, { through: Enrollment, foreignKey: "userId", otherKey: "courseId", as: "enrolledCourses" });
}
if (!Course.associations.students) {
  Course.belongsToMany(User, { through: Enrollment, foreignKey: "courseId", otherKey: "userId", as: "students" });
}

export const initMockData = async () => {
  try {
    console.log("Initializing database...");
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    
    // Sync all models
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
          thumbnail: "https://picsum.photos/seed/leadership/800/600",
          rating: 4.8,
          level: "Advanced",
          duration: "12h 30m",
          lessons: 24,
          enrolled: 1250
        },
        {
          title: "Advanced Data Analytics",
          description: "Learn to derive actionable insights from complex datasets using modern tools.",
          creatorId: admin.id,
          price: 149.99,
          category: "Analytics",
          thumbnail: "https://picsum.photos/seed/analytics/800/600",
          rating: 4.6,
          level: "Intermediate",
          duration: "10h 15m",
          lessons: 18,
          enrolled: 850
        },
        {
          title: "Full-Stack Development with React",
          description: "Build modern, scalable web applications from scratch.",
          creatorId: admin.id,
          price: 99.99,
          category: "Technology",
          thumbnail: "https://picsum.photos/seed/tech/800/600",
          rating: 4.9,
          level: "Beginner",
          duration: "15h 45m",
          lessons: 32,
          enrolled: 2100
        }
      ]);
      console.log("Mock courses created.");
    }

    console.log("Initialization complete.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, User, Course, Enrollment };
