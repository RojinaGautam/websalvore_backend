import { jest } from '@jest/globals';

// Mock the User model before importing the controller
await jest.unstable_mockModule('../models/index.js', () => {
  return {
    User: {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
    },
  };
});

// Import the mocked User and controller AFTER mocking
const { User } = await import('../models/index.js');
const { userController } = await import('../controller/user/userController.js');

// Helper to mock res object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('userController', () => {
  beforeEach(() => {
    // Mock console.log to prevent output during tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    if (console.log.mockRestore) {
      console.log.mockRestore();
    }
  });

  describe('getAll', () => {
    it('should return 200 and all users', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ];
      User.findAll = jest.fn().mockResolvedValue(mockUsers);

      const req = {};
      const res = mockRes();

      await userController.getAll(req, res);

      expect(User.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        data: mockUsers,
        message: "successfully fetched data"
      });
    });

    it('should return 500 if database fails', async () => {
      User.findAll = jest.fn().mockRejectedValue(new Error('DB Error'));

      const req = {};
      const res = mockRes();

      await userController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch users'
      });
    });
  });

  describe('getForgottenUsers', () => {
    it('should return 200 and forgotten users', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', isForgotten: true }
      ];
      User.findAll = jest.fn().mockResolvedValue(mockUsers);

      const req = {};
      const res = mockRes();

      await userController.getForgottenUsers(req, res);

      expect(User.findAll).toHaveBeenCalledWith({ where: { isForgotten: true } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        data: mockUsers,
        message: "successfully fetched forgotten users"
      });
    });

    it('should return 500 if database fails', async () => {
      User.findAll = jest.fn().mockRejectedValue(new Error('DB Error'));

      const req = {};
      const res = mockRes();

      await userController.getForgottenUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch forgotten users'
      });
    });
  });

  describe('requestForgotPassword', () => {
    it('should return 200 when user exists and sets isForgotten to true', async () => {
      const user = {
        id: 1,
        email: 'john@example.com',
        isForgotten: false,
        save: jest.fn().mockResolvedValue()
      };
      User.findOne = jest.fn().mockResolvedValue(user);

      const req = { body: { email: 'john@example.com' } };
      const res = mockRes();

      await userController.requestForgotPassword(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
      expect(user.isForgotten).toBe(true);
      expect(user.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: "Forgot password request submitted successfully. Admin will contact you soon."
      });
    });

    it('should return 400 when email is missing', async () => {
      const req = { body: {} };
      const res = mockRes();

      await userController.requestForgotPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "Email is required"
      });
    });

    it('should return 404 when user not found', async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      const req = { body: { email: 'nonexistent@example.com' } };
      const res = mockRes();

      await userController.requestForgotPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        message: "User not found"
      });
    });

    it('should return 500 if database fails', async () => {
      User.findOne = jest.fn().mockRejectedValue(new Error('DB Error'));

      const req = { body: { email: 'john@example.com' } };
      const res = mockRes();

      await userController.requestForgotPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to process forgot password request'
      });
    });
  });

  describe('resetPassword', () => {
    it('should return 200 when password is reset successfully', async () => {
      const user = {
        id: 1,
        email: 'john@example.com',
        password: 'oldpassword',
        isForgotten: true,
        save: jest.fn().mockResolvedValue()
      };
      User.findOne = jest.fn().mockResolvedValue(user);

      const req = { 
        params: { id: 1 }, 
        body: { newPassword: 'newpassword123' } 
      };
      const res = mockRes();

      await userController.resetPassword(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(user.password).toBe('newpassword123');
      expect(user.isForgotten).toBe(false);
      expect(user.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: "Password reset successfully"
      });
    });

    it('should return 400 when newPassword is missing', async () => {
      const req = { params: { id: 1 }, body: {} };
      const res = mockRes();

      await userController.resetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "New password is required"
      });
    });

    it('should return 404 when user not found', async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      const req = { 
        params: { id: 999 }, 
        body: { newPassword: 'newpassword123' } 
      };
      const res = mockRes();

      await userController.resetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        message: "User not found"
      });
    });

    it('should return 500 if database fails', async () => {
      User.findOne = jest.fn().mockRejectedValue(new Error('DB Error'));

      const req = { 
        params: { id: 1 }, 
        body: { newPassword: 'newpassword123' } 
      };
      const res = mockRes();

      await userController.resetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to reset password'
      });
    });
  });

  describe('create', () => {
    it('should create user successfully with all required fields', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
        role: 'user'
      };
      const createdUser = { id: 1, ...userData, isForgotten: false };
      User.create = jest.fn().mockResolvedValue(createdUser);

      const req = { body: userData };
      const res = mockRes();

      await userController.create(req, res);

      expect(User.create).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
        role: 'user',
        image: null,
        position: null,
        department: null,
        hireDate: null,
        salary: null,
        status: 'active',
        performance: null,
        avatar: null,
        isForgotten: false
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: createdUser,
        message: "successfully created user"
      });
    });

    it('should create user with optional fields', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
        role: 'user',
        image: 'profile.jpg',
        position: 'Manager',
        department: 'IT',
        hireDate: '2023-01-01',
        salary: 50000,
        status: 'active',
        performance: 'Excellent',
        avatar: 'avatar.jpg'
      };
      const createdUser = { id: 1, ...userData, isForgotten: false };
      User.create = jest.fn().mockResolvedValue(createdUser);

      const req = { body: userData };
      const res = mockRes();

      await userController.create(req, res);

      expect(User.create).toHaveBeenCalledWith({
        ...userData,
        isForgotten: false
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: createdUser,
        message: "successfully created user"
      });
    });

    it('should return 500 when required fields are missing', async () => {
      const req = { body: { name: 'John Doe' } }; // missing other required fields
      const res = mockRes();

      await userController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "Invalid paylod"
      });
    });

    it('should return 500 if create fails', async () => {
      User.create = jest.fn().mockRejectedValue(new Error('DB Error'));

      const req = {
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          phone: '1234567890',
          role: 'user'
        }
      };
      const res = mockRes();

      await userController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch users'
      });
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'oldpassword',
        phone: '1234567890',
        role: 'user',
        image: 'old.jpg',
        position: 'Developer',
        department: 'IT',
        hireDate: '2023-01-01',
        salary: 50000,
        status: 'active',
        performance: 'Good',
        avatar: 'old-avatar.jpg',
        isForgotten: false,
        save: jest.fn().mockResolvedValue()
      };
      User.findOne = jest.fn().mockResolvedValue(user);

      const req = {
        params: { id: 1 },
        body: {
          name: 'John Updated',
          email: 'john.updated@example.com',
          password: 'newpassword',
          phone: '0987654321',
          role: 'admin',
          image: 'new.jpg',
          position: 'Senior Developer',
          department: 'Engineering',
          hireDate: '2023-02-01',
          salary: 60000,
          status: 'active',
          performance: 'Excellent',
          avatar: 'new-avatar.jpg',
          isForgotten: true
        }
      };
      const res = mockRes();

      await userController.update(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(user.name).toBe('John Updated');
      expect(user.email).toBe('john.updated@example.com');
      expect(user.password).toBe('newpassword');
      expect(user.phone).toBe('0987654321');
      expect(user.role).toBe('admin');
      expect(user.image).toBe('new.jpg');
      expect(user.position).toBe('Senior Developer');
      expect(user.department).toBe('Engineering');
      expect(user.hireDate).toBe('2023-02-01');
      expect(user.salary).toBe(60000);
      expect(user.status).toBe('active');
      expect(user.performance).toBe('Excellent');
      expect(user.avatar).toBe('new-avatar.jpg');
      expect(user.isForgotten).toBe(true);
      expect(user.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: user,
        message: "user updated successfully"
      });
    });

    it('should update user with partial data', async () => {
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'oldpassword',
        phone: '1234567890',
        role: 'user',
        image: 'old.jpg',
        position: 'Developer',
        department: 'IT',
        hireDate: '2023-01-01',
        salary: 50000,
        status: 'active',
        performance: 'Good',
        avatar: 'old-avatar.jpg',
        isForgotten: false,
        save: jest.fn().mockResolvedValue()
      };
      User.findOne = jest.fn().mockResolvedValue(user);

      const req = {
        params: { id: 1 },
        body: { name: 'John Updated' }
      };
      const res = mockRes();

      await userController.update(req, res);

      expect(user.name).toBe('John Updated');
      expect(user.email).toBe('john@example.com'); // unchanged
      expect(user.password).toBe('oldpassword'); // unchanged
      expect(user.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: user,
        message: "user updated successfully"
      });
    });

    it('should return 500 when user not found', async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      const req = { params: { id: 999 }, body: { name: 'John Updated' } };
      const res = mockRes();

      await userController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "User not found"
      });
    });

    it('should return 500 if update fails', async () => {
      User.findOne = jest.fn().mockRejectedValue(new Error('DB Error'));

      const req = { params: { id: 1 }, body: { name: 'John Updated' } };
      const res = mockRes();

      await userController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to update users'
      });
    });
  });

  describe('delelteById', () => {
    it('should delete user successfully', async () => {
      const user = {
        id: 1,
        name: 'John Doe',
        destroy: jest.fn().mockResolvedValue()
      };
      User.findOne = jest.fn().mockResolvedValue(user);

      const req = { params: { id: 1 } };
      const res = mockRes();

      await userController.delelteById(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(user.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        message: "user deleted successfully"
      });
    });

    it('should return 500 when user not found', async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      const req = { params: { id: 999 } };
      const res = mockRes();

      await userController.delelteById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "User not found"
      });
    });

    it('should return 500 if delete fails', async () => {
      User.findOne = jest.fn().mockRejectedValue(new Error('DB Error'));

      const req = { params: { id: 1 } };
      const res = mockRes();

      await userController.delelteById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch users'
      });
    });
  });

  describe('getById', () => {
    it('should return user when found', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
      User.findOne = jest.fn().mockResolvedValue(user);

      const req = { params: { id: 1 } };
      const res = mockRes();

      await userController.getById(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        message: "user fetched successfully",
        data: user
      });
    });

    it('should return 500 when user not found', async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      const req = { params: { id: 999 } };
      const res = mockRes();

      await userController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "User not found"
      });
    });

    it('should return 500 if fetching fails', async () => {
      User.findOne = jest.fn().mockRejectedValue(new Error('DB Error'));

      const req = { params: { id: 1 } };
      const res = mockRes();

      await userController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch users'
      });
    });
  });
}); 