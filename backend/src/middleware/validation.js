const { body, param, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

// User validation rules
const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['student', 'organizer']).withMessage('Invalid role'),
  handleValidationErrors
];

const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
];

const validateUserUpdate = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  handleValidationErrors
];

// Event validation rules
const validateEvent = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().trim(),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('venue').optional().trim(),
  handleValidationErrors
];

const validateEventId = [
  param('id').isMongoId().withMessage('Invalid event ID'),
  handleValidationErrors
];

// Club validation rules
const validateClub = [
  body('name').trim().notEmpty().withMessage('Club name is required'),
  body('description').optional().trim(),
  body('members').optional().isInt({ min: 0 }).withMessage('Members must be a positive number'),
  body('portalUrl').optional().isURL().withMessage('Valid URL is required'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateUserUpdate,
  validateEvent,
  validateEventId,
  validateClub
};
