import { Setting } from '../models/Setting.js';

export const updateSetting = async (req, res) => {
  try {
    const body = req.body;
    // Assume only one settings row (id=1)
    let setting = await Setting.findByPk(1);
    if (!setting) {
      // If not found, create it
      setting = await Setting.create({ id: 1, ...body });
    } else {
      await setting.update(body);
    }
    res.status(200).json({ message: 'Settings updated successfully', data: setting });
  } catch (e) {
    res.status(500).json({ error: 'Failed to update settings', details: e.message });
  }
};

export const getSetting = async (req, res) => {
  try {
    let setting = await Setting.findByPk(1);
    if (!setting) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.status(200).json({ data: setting });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch settings', details: e.message });
  }
}; 