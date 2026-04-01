import { DataTypes, Model} from "sequelize";
import sequelize from "../config/database";
import { User } from "./user";

export class Course extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public creatorId!: number;
    public price!: number;
    public category!: string;
    public thumbnail!: string;

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
        model: User,
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
  },
  {
    sequelize,
    modelName: "Course",
  }
);

User.hasMany(Course, { foreignKey: "creatorId" });
Course.belongsTo(User, { as: "creator", foreignKey: "creatorId" });