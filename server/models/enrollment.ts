import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { User } from "./user";
import { Course } from "./course";

export class Enrollment extends Model {
  public id!: string;
  public userId!: string;
  public courseId!: string;
  public status!: "active" | "completed" | "dropped";
  public progress!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Enrollment.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => Math.random().toString(36).substring(2, 9),
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Courses",
        key: "id",
      },
    },
    ststus: {
      type: DataTypes.ENUM("active", "completed", "dropped"),
      defaultValue: "active",
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Enrollment",
  },
);

User.hasMany(Enrollment, { foreignKey: "userId" });
Enrollment.belongsTo(User, { foreignKey: "userId" });

Course.hasMany(Enrollment, { foreignKey: "courseId" });
Enrollment.belongsTo(Course, { foreignKey: "courseId" });

User.belongsToMany(Course, { through: Enrollment, foreignKey: "userId", otherKey: "courseId", as: "enrolledCourses" });
Course.belongsToMany(User, { through: Enrollment, foreignKey: "courseId", otherKey: "userId", as: "students" });
