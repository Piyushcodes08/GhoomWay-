const express = require('express');
const { createBooking, getBookings, updateBookingStatus } = require('../controllers/bookingController');
const validate = require('../middlewares/validateMiddleware');
const { createBookingSchema, updateStatusSchema } = require('../utils/validationSchemas');

const router = express.Router();

router
  .route('/')
  .post(validate(createBookingSchema), createBooking)
  .get(getBookings);

router
  .route('/:id/status')
  .patch(validate(updateStatusSchema), updateBookingStatus);

module.exports = router;
