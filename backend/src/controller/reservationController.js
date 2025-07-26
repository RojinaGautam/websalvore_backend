import { Reservation } from '../models/index.js';

// Get all reservations
const getAll = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).send({ data: reservations, message: 'successfully fetched reservations' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

// Create a new reservation
const create = async (req, res) => {
  try {
    const body = req.body;
    if (!body.date || !body.time || !body.guests || !body.firstName || !body.lastName || !body.email || !body.phone) {
      return res.status(400).send({ message: 'Invalid payload' });
    }
    const reservation = await Reservation.create({
      date: body.date,
      time: body.time,
      guests: body.guests,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      specialRequests: body.specialRequests || null,
      status: body.status || 'confirmed',
    });
    res.status(201).send({ data: reservation, message: 'successfully created reservation' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to create reservation' });
  }
};

// Update reservation
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const reservation = await Reservation.findOne({ where: { id } });
    if (!reservation) {
      return res.status(404).send({ message: 'Reservation not found' });
    }
    reservation.date = body.date || reservation.date;
    reservation.time = body.time || reservation.time;
    reservation.guests = body.guests || reservation.guests;
    reservation.firstName = body.firstName || reservation.firstName;
    reservation.lastName = body.lastName || reservation.lastName;
    reservation.email = body.email || reservation.email;
    reservation.phone = body.phone || reservation.phone;
    reservation.specialRequests = body.specialRequests || reservation.specialRequests;
    reservation.status = body.status || reservation.status;
    await reservation.save();
    res.status(200).send({ data: reservation, message: 'reservation updated successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to update reservation' });
  }
};

// Delete reservation
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findOne({ where: { id } });
    if (!reservation) {
      return res.status(404).send({ message: 'Reservation not found' });
    }
    await reservation.destroy();
    res.status(200).send({ message: 'reservation deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete reservation' });
  }
};

// Get reservation by id
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findOne({ where: { id } });
    if (!reservation) {
      return res.status(404).send({ message: 'Reservation not found' });
    }
    res.status(200).send({ data: reservation, message: 'reservation fetched successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch reservation' });
  }
};

export const reservationController = {
  getAll,
  create,
  update,
  deleteById,
  getById,
}; 