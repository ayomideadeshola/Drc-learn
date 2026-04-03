import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { User } from "./user.js";

export class Course extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public creatorId!: string;
  public price!: number;
  public category!: string;
  public thumbnail!: string;
  public rating!: number;
  public level!: "Beginner" | "Intermediate" | "Advanced";
  public duration!: string;
  public lessons!: number;
  public enrolled!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Course.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => Math.random().toString(36).substring(2, 9),
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    creatorId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      defaultValue: "https://picsum.photos/seed/course/800/600",
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    level: {
      type: DataTypes.ENUM("Beginner", "Intermediate", "Advanced"),
      defaultValue: "Beginner",
    },
    duration: {
      type: DataTypes.STRING,
      defaultValue: "0h",
    },
    lessons: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    enrolled: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Course",
  }
);
