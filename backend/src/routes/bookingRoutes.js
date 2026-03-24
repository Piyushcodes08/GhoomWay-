const express = require('express');
const {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
} = require('../controllers/bookingController');
const validate = require('../middlewares/validateMiddleware');
const { createBookingSchema, updateStatusSchema } = require('../utils/validationSchemas');

const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Collection routes
router
  .route('/')
  .post(validate(createBookingSchema), createBooking)
  .get(protect, authorize('admin', 'super-admin'), getBookings);

// Single resource routes
router
  .route('/:id')
  .get(protect, authorize('admin', 'super-admin'), getBooking);

// Status update route
router
  .route('/:id/status')
  .patch(protect, authorize('admin', 'super-admin'), validate(updateStatusSchema), updateBookingStatus);

module.exports = router;
