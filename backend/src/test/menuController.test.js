import { jest } from '@jest/globals';
import { menuController } from '../controller/menu/menuController.js';
import { MenuItem } from '../models/index.js';

// Helper to mock res object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('menuController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return 200 and all menu items', async () => {
      const mockItems = [{ id: 1, name: 'Pizza' }, { id: 2, name: 'Burger' }];
      MenuItem.findAll = jest.fn().mockResolvedValue(mockItems);

      const req = {};
      const res = mockRes();

      await menuController.getAll(req, res);

      expect(MenuItem.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        data: mockItems,
        message: "successfully fetched data",
      });
    });

    it('should return 500 if database fails', async () => {
      MenuItem.findAll = jest.fn().mockRejectedValue(new Error('DB Error'));

      const req = {};
      const res = mockRes();

      await menuController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch menu items',
      });
    });
  });

  describe('create', () => {
    it('should create menu item successfully without image', async () => {
      const req = {
        body: {
          name: 'Pizza',
          category: 'Food',
          price: 10,
          stock: 5,
          status: 'available',
        },
      };
      const createdItem = { id: 1, ...req.body, image: null };
      MenuItem.create = jest.fn().mockResolvedValue(createdItem);
      const res = mockRes();

      await menuController.create(req, res);

      expect(MenuItem.create).toHaveBeenCalledWith({
        name: 'Pizza',
        category: 'Food',
        price: 10,
        stock: 5,
        status: 'available',
        image: null,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: createdItem,
        message: "successfully created menu item",
      });
    });

    it('should create menu item successfully with image', async () => {
      const req = {
        body: {
          name: 'Pizza',
          category: 'Food',
          price: 10,
          stock: 5,
          status: 'available',
        },
        file: { filename: 'pizza.jpg' },
      };
      const createdItem = { id: 1, ...req.body, image: 'pizza.jpg' };
      MenuItem.create = jest.fn().mockResolvedValue(createdItem);
      const res = mockRes();

      await menuController.create(req, res);

      expect(MenuItem.create).toHaveBeenCalledWith({
        name: 'Pizza',
        category: 'Food',
        price: 10,
        stock: 5,
        status: 'available',
        image: 'pizza.jpg',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: createdItem,
        message: "successfully created menu item",
      });
    });

    it('should return 400 if required fields are missing', async () => {
      const req = { body: { name: 'Pizza' } }; // missing other fields
      const res = mockRes();

      await menuController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: "Invalid payload" });
    });

    it('should return 500 if create fails', async () => {
      const req = {
        body: {
          name: 'Pizza',
          category: 'Food',
          price: 10,
          stock: 5,
          status: 'available',
        },
      };
      MenuItem.create = jest.fn().mockRejectedValue(new Error('DB Error'));
      const res = mockRes();

      await menuController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to create menu item',
      });
    });
  });

  describe('update', () => {
    it('should update existing menu item without new image', async () => {
      const req = {
        params: { id: 1 },
        body: { name: 'Updated Pizza' },
      };
      const item = {
        id: 1,
        name: 'Old Pizza',
        category: 'Food',
        price: 10,
        stock: 5,
        status: 'available',
        image: 'old.jpg',
        save: jest.fn().mockResolvedValue(),
      };
      MenuItem.findOne = jest.fn().mockResolvedValue(item);
      const res = mockRes();

      await menuController.update(req, res);

      expect(MenuItem.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(item.name).toBe('Updated Pizza');
      expect(item.image).toBe('old.jpg');
      expect(item.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        data: item,
        message: "menu item updated successfully",
      });
    });

    it('should update existing menu item with new image', async () => {
      const req = {
        params: { id: 1 },
        body: { name: 'Updated Pizza' },
        file: { filename: 'new.jpg' },
      };
      const item = {
        id: 1,
        name: 'Old Pizza',
        category: 'Food',
        price: 10,
        stock: 5,
        status: 'available',
        image: 'old.jpg',
        save: jest.fn().mockResolvedValue(),
      };
      MenuItem.findOne = jest.fn().mockResolvedValue(item);
      const res = mockRes();

      await menuController.update(req, res);

      expect(item.image).toBe('new.jpg');
      expect(item.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        data: item,
        message: "menu item updated successfully",
      });
    });

    it('should return 404 if item not found', async () => {
      MenuItem.findOne = jest.fn().mockResolvedValue(null);
      const req = { params: { id: 999 }, body: {} };
      const res = mockRes();

      await menuController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: "Menu item not found" });
    });

    it('should return 500 if update fails', async () => {
      MenuItem.findOne = jest.fn().mockRejectedValue(new Error('DB Error'));
      const req = { params: { id: 1 }, body: {} };
      const res = mockRes();

      await menuController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to update menu item',
      });
    });
  });

  describe('deleteById', () => {
    it('should delete existing menu item', async () => {
      const item = {
        destroy: jest.fn().mockResolvedValue(),
      };
      MenuItem.findOne = jest.fn().mockResolvedValue(item);
      const req = { params: { id: 1 } };
      const res = mockRes();

      await menuController.deleteById(req, res);

      expect(MenuItem.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(item.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: "menu item deleted successfully",
      });
    });

    it('should return 404 if item not found', async () => {
      MenuItem.findOne = jest.fn().mockResolvedValue(null);
      const req = { params: { id: 999 } };
      const res = mockRes();

      await menuController.deleteById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: "Menu item not found" });
    });

    it('should return 500 if delete fails', async () => {
      MenuItem.findOne = jest.fn().mockRejectedValue(new Error('DB Error'));
      const req = { params: { id: 1 } };
      const res = mockRes();

      await menuController.deleteById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to delete menu item',
      });
    });
  });

  describe('getById', () => {
    it('should return the item if found', async () => {
      const item = { id: 1, name: 'Pizza' };
      MenuItem.findOne = jest.fn().mockResolvedValue(item);
      const req = { params: { id: 1 } };
      const res = mockRes();

      await menuController.getById(req, res);

      expect(MenuItem.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        data: item,
        message: "menu item fetched successfully",
      });
    });

    it('should return 404 if item not found', async () => {
      MenuItem.findOne = jest.fn().mockResolvedValue(null);
      const req = { params: { id: 999 } };
      const res = mockRes();

      await menuController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: "Menu item not found" });
    });

    it('should return 500 if fetching fails', async () => {
      MenuItem.findOne = jest.fn().mockRejectedValue(new Error('DB Error'));
      const req = { params: { id: 1 } };
      const res = mockRes();

      await menuController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch menu item',
      });
    });
  });
});
