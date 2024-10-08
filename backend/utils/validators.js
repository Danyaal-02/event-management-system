import { check, validationResult } from 'express-validator';

export const registerValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('role', 'Role must be either organizer or attendee').isIn(['organizer', 'attendee']),
];

export const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

export const eventValidation = [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('date', 'Date is required and should be valid').isISO8601().toDate(),
  check('location', 'Location is required').not().isEmpty(),
  check('capacity', 'Capacity should be a positive number').isInt({ min: 1 }),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
