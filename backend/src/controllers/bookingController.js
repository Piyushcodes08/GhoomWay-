const Booking = require('../models/Booking');
const { sendWhatsAppNotification } = require('../services/whatsappService');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create new ride request
// @route   POST /api/v1/bookings
// @access  Public
exports.createBooking = async (req, res, next) => {
  console.log('\n[DEBUG] --- New Incoming Booking Request ---');
  console.log(`[DEBUG] Payload: ${JSON.stringify(req.body, null, 2)}`);

  try {
    let booking;
    
    // Check Database Connectivity
    if (global.dbConnected === false) {
      console.warn('[WARN] ⚠️ Database is OFFLINE. Initializing Failover Memory Storage.');
      booking = {
        ...req.body,
        _id: `mock_${Date.now()}`,
        bookingId: `GW-${Math.floor(10000 + Math.random() * 90000)}`,
        status: 'Pending',
        createdAt: new Date(),
        isMock: true
      };
      mockBookings.push(booking);
      console.log(`[INFO] ✅ Mock booking saved in memory: ${booking.bookingId}`);
    } else {
      console.log('[DEBUG] Attempting to save booking to MongoDB...');
      booking = await Booking.create(req.body);
      console.log(`[INFO] ✅ Booking saved to Database: ${booking.bookingId} (${booking._id})`);
    }
    
    // Trigger WhatsApp Notification
    console.log('[DEBUG] Triggering WhatsApp notification service...');
    
    // We run this async so we don't block the HTTP response, 
    // but the service itself has internal await/logging
    sendWhatsAppNotification('NEW_BOOKING_ADMIN', booking).then(success => {
      if (success) {
        console.log(`[INFO] WhatsApp successfully queued for: ${booking.bookingId}`);
      } else {
        console.warn(`[WARN] WhatsApp notification failed for: ${booking.bookingId}`);
      }
    }).catch(err => {
      console.error(`[ERROR] Fatal error in WhatsApp service trigger: ${err.message}`);
    });

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking request received. WhatsApp notification dispatched.'
    });
  } catch (error) {
    console.error(`[ERROR] Booking Creation Failure: ${error.message}`);
    next(error);
  }
};

// mock store for failover
const mockBookings = [];

// @desc    Get all bookings (Admin)
// @route   GET /api/v1/bookings
// @access  Private/Admin
exports.getBookings = async (req, res, next) => {
  console.log('[DEBUG] Fetching bookings...');
  try {
    let bookings;
    
    if (global.dbConnected === false) {
      console.warn('[WARN] Fetching from memory store (DB down).');
      bookings = [...mockBookings].reverse();
    } else {
      bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    }
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PATCH /api/v1/bookings/:id/status
// @access  Private/Admin
exports.updateBookingStatus = async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;
  console.log(`\n[DEBUG] --- Status Update Request ---`);
  console.log(`[DEBUG] ID: ${id} | New Status: ${status}`);

  try {
    let booking;

    if (global.dbConnected === false) {
      booking = mockBookings.find(b => b._id === id);
      if (!booking) {
        return next(new ErrorResponse(`Booking not found in memory with id of ${id}`, 404));
      }
      booking.status = status;
    } else {
      booking = await Booking.findById(id);
      if (!booking) {
        return next(new ErrorResponse(`Booking not found with id of ${id}`, 404));
      }
      booking.status = status;
      await booking.save();
    }

    console.log(`[INFO] Status updated to: ${status} for ${booking.bookingId || id}`);

    // If accepted, notify the user
    if (status === 'Accepted') {
      console.log('[DEBUG] Booking ACCEPTED. Triggering user notification...');
      sendWhatsAppNotification('BOOKING_ACCEPTED_USER', booking).catch(err => 
        console.error(`[ERROR] User notification failure: ${err.message}`)
      );
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error(`[ERROR] Status Update Failure: ${error.message}`);
    next(error);
  }
};
