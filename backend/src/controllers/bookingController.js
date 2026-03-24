const Booking = require('../models/Booking');
const { sendWhatsAppNotification } = require('../services/whatsappService');
const ErrorResponse = require('../utils/errorResponse');

// In-memory fallback store for when DB is offline
const mockBookings = [];

// ─────────────────────────────────────────────
// @desc    Create new booking request
// @route   POST /api/v1/bookings
// @access  Public
// ─────────────────────────────────────────────
exports.createBooking = async (req, res, next) => {
  console.log('\n[Booking] New booking submission received.');
  console.log(`[Booking] Payload: ${JSON.stringify(req.body, null, 2)}`);

  try {
    let booking;

    if (global.dbConnected === false) {
      console.warn('[Booking] ⚠️ Database offline — saving to in-memory store.');
      booking = {
        ...req.body,
        _id: `mock_${Date.now()}`,
        bookingId: `GW-${Math.floor(10000 + Math.random() * 90000)}`,
        status: 'Pending',
        adminRemark: '',
        createdAt: new Date(),
        isMock: true,
      };
      mockBookings.push(booking);
      console.log(`[Booking] ✅ Mock booking created: ${booking.bookingId}`);
    } else {
      booking = await Booking.create(req.body);
      console.log(`[Booking] ✅ Saved to DB: ${booking.bookingId} (${booking._id})`);
    }

    // Fire-and-forget admin WhatsApp notification
    sendWhatsAppNotification('NEW_BOOKING_ADMIN', booking)
      .then((sent) => {
        if (sent) {
          console.log(`[Booking] WhatsApp admin notification sent for ${booking.bookingId}`);
        } else {
          console.warn(`[Booking] WhatsApp admin notification failed for ${booking.bookingId}`);
        }
      })
      .catch((err) => {
        console.error(`[Booking] Unexpected WhatsApp error: ${err.message}`);
      });

    return res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking received successfully.',
    });
  } catch (error) {
    console.error(`[Booking] Creation error: ${error.message}`);
    return next(error);
  }
};

// ─────────────────────────────────────────────
// @desc    Get all bookings with optional search + status filter
// @route   GET /api/v1/bookings?status=Pending&search=GW-12345
// @access  Private/Admin
// ─────────────────────────────────────────────
exports.getBookings = async (req, res, next) => {
  const { status, search } = req.query;
  console.log(`[Booking] Fetching bookings | status="${status || 'all'}" search="${search || ''}"`);

  try {
    let bookings;

    if (global.dbConnected === false) {
      console.warn('[Booking] Serving from in-memory store.');
      bookings = [...mockBookings].reverse();

      if (status && status !== 'All') {
        bookings = bookings.filter((b) => b.status === status);
      }
      if (search) {
        const q = search.toLowerCase();
        bookings = bookings.filter(
          (b) =>
            b.bookingId?.toLowerCase().includes(q) ||
            b.customerName?.toLowerCase().includes(q) ||
            b.phoneNumber?.includes(q) ||
            b.pickupCity?.toLowerCase().includes(q) ||
            b.dropCity?.toLowerCase().includes(q)
        );
      }
    } else {
      const query = {};

      if (status && status !== 'All') {
        query.status = status;
      }

      if (search) {
        const regex = new RegExp(search, 'i');
        query.$or = [
          { bookingId: regex },
          { customerName: regex },
          { phoneNumber: regex },
          { pickupCity: regex },
          { dropCity: regex },
        ];
      }

      bookings = await Booking.find(query).sort({ createdAt: -1 }).lean();
    }

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error(`[Booking] Fetch error: ${error.message}`);
    return next(error);
  }
};

// ─────────────────────────────────────────────
// @desc    Get single booking by ID
// @route   GET /api/v1/bookings/:id
// @access  Private/Admin
// ─────────────────────────────────────────────
exports.getBooking = async (req, res, next) => {
  const { id } = req.params;
  console.log(`[Booking] Fetching single booking: ${id}`);

  try {
    let booking;

    if (global.dbConnected === false) {
      booking = mockBookings.find((b) => b._id === id);
    } else {
      booking = await Booking.findById(id).lean();
    }

    if (!booking) {
      return next(new ErrorResponse(`Booking not found with id: ${id}`, 404));
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error(`[Booking] Single fetch error: ${error.message}`);
    return next(error);
  }
};

// ─────────────────────────────────────────────
// @desc    Update booking status (Admin action)
// @route   PATCH /api/v1/bookings/:id/status
// @access  Private/Admin
// ─────────────────────────────────────────────
exports.updateBookingStatus = async (req, res, next) => {
  const { status, adminRemark } = req.body;
  const { id } = req.params;

  console.log(`\n[Booking] Status update → id=${id} | newStatus=${status}`);
  if (adminRemark) console.log(`[Booking] Admin remark: "${adminRemark}"`);

  try {
    let booking;

    if (global.dbConnected === false) {
      booking = mockBookings.find((b) => b._id === id);
      if (!booking) {
        return next(new ErrorResponse(`Booking not found in memory with id: ${id}`, 404));
      }
      booking.status = status;
      if (adminRemark !== undefined) booking.adminRemark = adminRemark;
    } else {
      booking = await Booking.findById(id);
      if (!booking) {
        return next(new ErrorResponse(`Booking not found with id: ${id}`, 404));
      }
      booking.status = status;
      if (adminRemark !== undefined) booking.adminRemark = adminRemark;
      await booking.save();
    }

    console.log(`[Booking] ✅ Status updated to "${status}" for ${booking.bookingId}`);

    // Dispatch customer WhatsApp notification on terminal admin decisions
    if (status === 'Accepted') {
      sendWhatsAppNotification('BOOKING_ACCEPTED_USER', booking).catch((err) =>
        console.error(`[Booking] Customer notification error (Accept): ${err.message}`)
      );
    } else if (status === 'Rejected') {
      sendWhatsAppNotification('BOOKING_REJECTED_USER', booking).catch((err) =>
        console.error(`[Booking] Customer notification error (Reject): ${err.message}`)
      );
    } else if (status === 'Completed') {
      sendWhatsAppNotification('BOOKING_COMPLETED_USER', booking).catch((err) =>
        console.error(`[Booking] Customer notification error (Complete): ${err.message}`)
      );
    } else if (status === 'Cancelled') {
      sendWhatsAppNotification('BOOKING_CANCELLED_USER', booking).catch((err) =>
        console.error(`[Booking] Customer notification error (Cancel): ${err.message}`)
      );
    }

    return res.status(200).json({
      success: true,
      data: booking,
      message: `Booking status updated to ${status}.`,
    });
  } catch (error) {
    console.error(`[Booking] Status update error: ${error.message}`);
    return next(error);
  }
};
