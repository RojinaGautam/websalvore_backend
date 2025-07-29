import { jest } from '@jest/globals';

// Mock the User model and jwt-util before importing the controller
await jest.unstable_mockModule('../models/index.js', () => {
  return {
    User: {
      findOne: jest.fn(),
    },
  };
});

await jest.unstable_mockModule('../security/jwt-util.js', () => {
  return {
    generateToken: jest.fn(),
  };
});

// Import the mocked modules and controller AFTER mocking
const { User } = await import('../models/index.js');
const { generateToken } = await import('../security/jwt-util.js');
const { authController } = await import('../controller/auth/authController.js');

// Helper to mock res object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('authController', () => {
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

  describe('login', () => {
    it('should return 200 and token when credentials are valid', async () => {
      const user = {
        id: 1,
        email: 'john@example.com',
        password: 'password123',
        name: 'John Doe',
        toJSON: jest.fn().mockReturnValue({
          id: 1,
          email: 'john@example.com',
          name: 'John Doe'
        })
      };
      const mockToken = 'mock-jwt-token';

      User.findOne = jest.fn().mockResolvedValue(user);
      generateToken.mockReturnValue(mockToken);

      const req = {
        body: {
          email: 'john@example.com',
          password: 'password123'
        }
      };
      const res = mockRes();

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
      expect(user.toJSON).toHaveBeenCalled();
      expect(generateToken).toHaveBeenCalledWith({ user: user.toJSON() });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        data: { access_token: mockToken },
        message: "successfully logged in"
      });
    });

    it('should return 500 when email is missing', async () => {
      const req = { body: { password: 'password123' } };
      const res = mockRes();

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "email is required"
      });
    });

    it('should return 500 when password is missing', async () => {
      const req = { body: { email: 'john@example.com' } };
      const res = mockRes();

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "email is required"
      });
    });

    it('should return 500 when user not found', async () => {
      User.findOne = jest.fn().mockResolvedValue(null);

      const req = {
        body: {
          email: 'nonexistent@example.com',
          password: 'password123'
        }
      };
      const res = mockRes();

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'nonexistent@example.com' } });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "user not found"
      });
    });

    it('should return 500 when password is incorrect', async () => {
      const user = {
        id: 1,
        email: 'john@example.com',
        password: 'correctpassword',
        name: 'John Doe'
      };

      User.findOne = jest.fn().mockResolvedValue(user);

      const req = {
        body: {
          email: 'john@example.com',
          password: 'wrongpassword'
        }
      };
      const res = mockRes();

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
      // Should not call generateToken or send success response
      expect(generateToken).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalledWith(200);
    });

    it('should return 500 if database fails', async () => {
      User.findOne = jest.fn().mockRejectedValue(new Error('DB Error'));

      const req = {
        body: {
          email: 'john@example.com',
          password: 'password123'
        }
      };
      const res = mockRes();

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to login"
      });
    });
  });

  describe('init', () => {
    it('should return 201 and user data without password', async () => {
      const userData = {
        id: 1,
        email: 'john@example.com',
        name: 'John Doe',
        password: 'password123',
        role: 'user'
      };

      const req = {
        user: {
          user: userData
        }
      };
      const res = mockRes();

      await authController.init(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: {
          id: 1,
          email: 'john@example.com',
          name: 'John Doe',
          role: 'user'
        },
        message: "successfully fetched current  user"
      });
    });

    it('should return 201 with user data when password is already missing', async () => {
      const userData = {
        id: 1,
        email: 'john@example.com',
        name: 'John Doe',
        role: 'user'
        // password is already missing
      };

      const req = {
        user: {
          user: userData
        }
      };
      const res = mockRes();

      await authController.init(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        data: userData,
        message: "successfully fetched current  user"
      });
    });

    it('should return 500 if user data is missing', async () => {
      const req = { user: {} }; // missing user property
      const res = mockRes();

      await authController.init(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to fetch users"
      });
    });

    it('should return 500 if database fails', async () => {
      const req = {
        user: {
          user: {
            id: 1,
            email: 'john@example.com',
            name: 'John Doe',
            password: 'password123'
          }
        }
      };
      const res = mockRes();

      // Mock a scenario where accessing user property fails
      const reqWithError = {
        get user() {
          throw new Error('Database connection failed');
        }
      };

      await authController.init(reqWithError, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to fetch users"
      });
    });
  });
}); 