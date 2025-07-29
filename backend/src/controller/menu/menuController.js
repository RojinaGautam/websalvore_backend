import { MenuItem } from '../../models/index.js';
import path from 'path';

const getAll = async (req, res) => {
  try {
    const items = await MenuItem.findAll();
    res.status(200).send({ data: items, message: "successfully fetched data" });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

const create = async (req, res) => {
  try {
    const body = req.body;
    let image = null;
    if (req.file) {
      image = req.file.filename;
    }
    if (!body?.name || !body?.category || !body?.price || !body?.stock || !body?.status)
      return res.status(400).send({ message: "Invalid payload" });
    const item = await MenuItem.create({
      name: body.name,
      category: body.category,
      price: body.price,
      stock: body.stock,
      status: body.status,
      image: image,
    });
    res.status(201).send({ data: item, message: "successfully created menu item" });
  } catch (e) {
    res.status(500).json({ error: 'Failed to create menu item' });
  }
};

const update = async (req, res) => {
  try {
    const { id = null } = req.params;
    
    // Convert id to integer and validate
    const menuId = parseInt(id);
    if (isNaN(menuId)) {
      return res.status(400).send({ message: "Invalid menu item ID" });
    }
    
    const body = req.body;
    const item = await MenuItem.findOne({ where: { id: menuId } });
    if (!item) {
      return res.status(404).send({ message: "Menu item not found" });
    }
    let image = item.image;
    if (req.file) {
      image = req.file.filename;
    }
    item.name = body.name || item.name;
    item.category = body.category || item.category;
    item.price = body.price || item.price;
    item.stock = body.stock || item.stock;
    item.status = body.status || item.status;
    item.image = image;
    await item.save();
    res.status(200).send({ data: item, message: "menu item updated successfully" });
  } catch (e) {
    console.error('Error updating menu item:', e);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id = null } = req.params;
    
    // Convert id to integer and validate
    const menuId = parseInt(id);
    if (isNaN(menuId)) {
      return res.status(400).send({ message: "Invalid menu item ID" });
    }
    
    const item = await MenuItem.findOne({ where: { id: menuId } });
    if (!item) {
      return res.status(404).send({ message: "Menu item not found" });
    }
    
    await item.destroy();
    res.status(200).send({ message: "menu item deleted successfully" });
  } catch (e) {
    console.error('Error deleting menu item:', e);
    
    // Handle foreign key constraint error
    if (e.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({ 
        error: 'Cannot delete menu item. It is currently being used in orders.',
        details: 'This menu item has been ordered by customers and cannot be deleted to maintain order history.'
      });
    }
    
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
};

const getById = async (req, res) => {
  try {
    const { id = null } = req.params;
    
    // Convert id to integer and validate
    const menuId = parseInt(id);
    if (isNaN(menuId)) {
      return res.status(400).send({ message: "Invalid menu item ID" });
    }
    
    const item = await MenuItem.findOne({ where: { id: menuId } });
    if (!item) {
      return res.status(404).send({ message: "Menu item not found" });
    }
    res.status(200).send({ data: item, message: "menu item fetched successfully" });
  } catch (e) {
    console.error('Error fetching menu item:', e);
    res.status(500).json({ error: 'Failed to fetch menu item' });
  }
};

export const menuController = {
  getAll,
  create,
  update,
  deleteById,
  getById
}; 