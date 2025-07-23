import { Order } from "../../models/order/Order.js";
import { OrderItem } from "../../models/order/OrderItem.js";
import { User } from "../../models/user/User.js";
import { MenuItem } from "../../models/menu/MenuItem.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      deliveryType,
      address,
      phone,
      email,
      specialInstructions,
      paymentMethod,
      orderType,
      scheduledTime,
      status,
      total,
      orderStatus, // allow setting orderStatus, default to 'P'
      items // array of { menuItemId, name, price, quantity, customizations }
    } = req.body;

    // Create the order
    const order = await Order.create({
      userId,
      deliveryType,
      address,
      phone,
      email,
      specialInstructions,
      paymentMethod,
      orderType,
      scheduledTime,
      status,
      total,
      orderStatus: orderStatus || 'P',
    });

    // Create order items
    if (Array.isArray(items)) {
      for (const item of items) {
        await OrderItem.create({
          orderId: order.id,
          menuItemId: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          customizations: item.customizations ? JSON.stringify(item.customizations) : null,
        });
      }
    }

    return res.status(201).json({ success: true, data: order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: OrderItem, include: [{ model: MenuItem }] },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.json({ success: true, data: orders });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: OrderItem, include: [{ model: MenuItem }] },
      ],
    });
    if (!order) return res.status(404).json({ success: false, error: "Order not found" });
    return res.json({ success: true, data: order });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// PATCH /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    if (!['C', 'R', 'D'].includes(orderStatus)) {
      return res.status(400).json({ success: false, error: 'Invalid orderStatus' });
    }
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
    order.orderStatus = orderStatus;
    await order.save();
    return res.json({ success: true, data: order });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}; 