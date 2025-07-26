import { Order } from "../../models/order/Order.js";
import { OrderItem } from "../../models/order/OrderItem.js";
import { User } from "../../models/user/User.js";
import { MenuItem } from "../../models/menu/MenuItem.js";
import { Op } from "sequelize";
import { sequelize } from "../../database/index.js";

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

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Get total revenue from delivered orders (orderStatus = 'D')
    const totalRevenue = await Order.sum('total', {
      where: { orderStatus: 'D' }
    });

    // Get orders count for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const ordersToday = await Order.count({
      where: {
        createdAt: {
          [Op.gte]: today,
          [Op.lt]: tomorrow
        }
      }
    });

    // Get total customers (unique users who have placed orders)
    const totalCustomers = await Order.count({
      distinct: true,
      col: 'userId',
      where: {
        userId: {
          [Op.ne]: null
        }
      }
    });

    // Get recent orders (last 5 orders) - simplified without associations
    const recentOrders = await Order.findAll({
      attributes: ['id', 'total', 'orderStatus', 'createdAt', 'email', 'phone'],
      order: [["createdAt", "DESC"]],
      limit: 5
    });

    // Get monthly sales data for the last 6 months (simplified approach)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Get all orders from last 6 months and process them in JavaScript
    const allOrders = await Order.findAll({
      where: {
        createdAt: {
          [Op.gte]: sixMonthsAgo
        },
        orderStatus: 'D'
      },
      attributes: ['total', 'createdAt'],
      order: [['createdAt', 'ASC']]
    });

    // Process monthly data in JavaScript
    const monthlyDataMap = new Map();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    allOrders.forEach(order => {
      const date = new Date(order.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = monthNames[date.getMonth()];
      
      if (!monthlyDataMap.has(monthKey)) {
        monthlyDataMap.set(monthKey, {
          month: monthName,
          sales: 0,
          orders: 0
        });
      }
      
      const monthData = monthlyDataMap.get(monthKey);
      monthData.sales += parseFloat(order.total) || 0;
      monthData.orders += 1;
    });

    const monthlyData = Array.from(monthlyDataMap.values());

    // Calculate percentage changes
    const previousMonthRevenue = await Order.sum('total', {
      where: {
        orderStatus: 'D',
        createdAt: {
          [Op.gte]: new Date(today.getFullYear(), today.getMonth() - 1, 1),
          [Op.lt]: new Date(today.getFullYear(), today.getMonth(), 1)
        }
      }
    });

    const currentMonthRevenue = await Order.sum('total', {
      where: {
        orderStatus: 'D',
        createdAt: {
          [Op.gte]: new Date(today.getFullYear(), today.getMonth(), 1)
        }
      }
    });

    const revenueChange = previousMonthRevenue > 0 
      ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100 
      : 0;

    return res.json({
      success: true,
      data: {
        totalRevenue: totalRevenue || 0,
        ordersToday: ordersToday || 0,
        totalCustomers: totalCustomers || 0,
        averageRating: 4.8, // You can implement rating system later
        revenueChange: Math.round(revenueChange * 10) / 10,
        recentOrders: recentOrders || [],
        monthlyData: monthlyData || []
      }
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}; 