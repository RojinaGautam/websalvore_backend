import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";
import { User } from "../user/User.js";

export const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true, // allow null for guest checkout
  },
  deliveryType: {
    type: DataTypes.STRING, // 'delivery' or 'pickup'
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialInstructions: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paymentMethod: {
    type: DataTypes.STRING, // 'card', 'cash', etc.
    allowNull: false,
  },
  orderType: {
    type: DataTypes.STRING, // 'asap' or 'scheduled'
    allowNull: false,
  },
  scheduledTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING, // 'pending', 'preparing', 'ready', 'completed', etc.
    allowNull: false,
    defaultValue: 'pending',
  },
  orderStatus: {
    type: DataTypes.STRING, // 'C' (Cancelled), 'R' (Ready), 'D' (Delivered), etc.
    allowNull: false,
    defaultValue: 'P', // P for Pending
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Order.belongsTo(User, { foreignKey: 'userId' }); 