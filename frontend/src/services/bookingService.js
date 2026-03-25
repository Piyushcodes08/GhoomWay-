import API from './api';

/**
 * @desc    Create a new booking
 * @route   POST /api/v1/bookings
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await API.post('/api/v1/bookings', bookingData);
    return response.data;
  } catch (error) {
    throw error; // Re-throw to let component handle it (it now has userMessage attached)
  }
};

/**
 * @desc    Fetch all bookings with optional filters
 * @route   GET /api/v1/bookings
 */
export const fetchBookings = async (params = {}) => {
  try {
    const query = new URLSearchParams();
    if (params.status && params.status !== 'All') query.append('status', params.status);
    if (params.search) query.append('search', params.search);

    const response = await API.get(`/api/v1/bookings?${query.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * @desc    Fetch single booking by ID
 * @route   GET /api/v1/bookings/:id
 */
export const fetchBookingById = async (id) => {
  try {
    const response = await API.get(`/api/v1/bookings/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * @desc    Update booking status (Admin only)
 * @route   PATCH /api/v1/bookings/:id/status
 */
export const updateBookingStatus = async (id, status, adminRemark) => {
  try {
    const response = await API.patch(`/api/v1/bookings/${id}/status`, { 
      status, 
      adminRemark 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};