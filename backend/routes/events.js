import express from 'express';
import { createEvent, getEvents, getEvent, updateEvent, deleteEvent, rsvpEvent } from '../controllers/eventController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);
router.post('/:id/rsvp', auth, rsvpEvent);

export default router;
