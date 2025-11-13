const jwt = require('jsonwebtoken');

// Authentication middleware - verifies JWT token
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Check if user is an organizer
function isOrganizer(req, res, next) {
  if (req.user.role !== 'organizer') {
    return res.status(403).json({ error: 'Access denied. Organizer role required.' });
  }
  next();
}

// Check if user owns the resource (event)
async function isEventOwner(req, res, next) {
  try {
    const Event = require('../models/Event');
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    if (event.organizer.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized to modify this event' });
    }
    
    req.event = event; // Attach event to request for use in route
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  authMiddleware,
  isOrganizer,
  isEventOwner
};
