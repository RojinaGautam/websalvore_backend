// settingController.test.js
import { jest } from '@jest/globals';

// Mock the model before importing the controller
await jest.unstable_mockModule('../models/Setting.js', () => {
  return {
    Setting: {
      findByPk: jest.fn(),
      create: jest.fn(),
    },
  };
});

// Import the mocked Setting and controller AFTER mocking
const { Setting } = await import('../models/Setting.js');
const { updateSetting, getSetting } = await import('../controller/settingController.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('settingController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateSetting', () => {
    it('should create setting if not found and return 200', async () => {
      const req = { body: { theme: 'dark', notifications: true } };
      const createdSetting = { id: 1, theme: 'dark', notifications: true };

      Setting.findByPk.mockResolvedValue(null);
      Setting.create.mockResolvedValue(createdSetting);

      const res = mockRes();

      await updateSetting(req, res);

      expect(Setting.findByPk).toHaveBeenCalledWith(1);
      expect(Setting.create).toHaveBeenCalledWith({ id: 1, ...req.body });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Settings updated successfully',
        data: createdSetting,
      });
    });

    it('should update setting if found and return 200', async () => {
      const req = { body: { theme: 'light' } };
      const settingInstance = {
        update: jest.fn().mockResolvedValue(),
        ...req.body,
      };

      Setting.findByPk.mockResolvedValue(settingInstance);

      const res = mockRes();

      await updateSetting(req, res);

      expect(Setting.findByPk).toHaveBeenCalledWith(1);
      expect(settingInstance.update).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Settings updated successfully',
        data: settingInstance,
      });
    });

    it('should return 500 if update fails', async () => {
      const req = { body: { theme: 'dark' } };
      const errorMessage = 'DB error';

      Setting.findByPk.mockRejectedValue(new Error(errorMessage));

      const res = mockRes();

      await updateSetting(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to update settings',
        details: errorMessage,
      });
    });
  });

  describe('getSetting', () => {
    it('should return 200 and setting if found', async () => {
      const settingInstance = { id: 1, theme: 'dark' };

      Setting.findByPk.mockResolvedValue(settingInstance);

      const req = {};
      const res = mockRes();

      await getSetting(req, res);

      expect(Setting.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: settingInstance });
    });

    it('should return 404 if setting not found', async () => {
      Setting.findByPk.mockResolvedValue(null);

      const req = {};
      const res = mockRes();

      await getSetting(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Settings not found' });
    });

    it('should return 500 if fetching fails', async () => {
      const errorMessage = 'DB error';

      Setting.findByPk.mockRejectedValue(new Error(errorMessage));

      const req = {};
      const res = mockRes();

      await getSetting(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch settings',
        details: errorMessage,
      });
    });
  });
});
