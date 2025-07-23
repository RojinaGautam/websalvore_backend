import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";

export const Testimonials = sequelize.define("Testimonials", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  favouriteDish: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});