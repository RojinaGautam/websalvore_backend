import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";
import { Order } from "./Order.js";
import { MenuItem } from "../menu/MenuItem.js";

export const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customizations: {
    type: DataTypes.TEXT, // JSON string or plain text
    allowNull: true,
  },
});

OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' }); 