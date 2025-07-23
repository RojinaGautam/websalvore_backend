import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

export const Setting = sequelize.define("Setting", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  restaurantName: DataTypes.STRING,
  description: DataTypes.TEXT,
  cuisine: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  website: DataTypes.STRING,
  address: DataTypes.STRING,
  operatingHours: DataTypes.JSON,
  acceptedPayments: DataTypes.JSON,
  deliveryRadius: DataTypes.FLOAT,
  deliveryFee: DataTypes.FLOAT,
  minimumOrder: DataTypes.FLOAT,
  deliveryTime: DataTypes.STRING,
  totalTables: DataTypes.INTEGER,
  maxPartySize: DataTypes.INTEGER,
  reservationBuffer: DataTypes.INTEGER,
  notifications: DataTypes.JSON,
  taxRate: DataTypes.FLOAT,
  serviceCharge: DataTypes.FLOAT,
  autoGratuity: DataTypes.BOOLEAN,
  autoGratuityThreshold: DataTypes.INTEGER,
  socialMedia: DataTypes.JSON
}); 