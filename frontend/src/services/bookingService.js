const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/v1';

/**
 * @desc    Submit a new booking request
 * @param   {object} bookingData - Form data from CabBooking
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong during booking.');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

/**
 * @desc    Fetch all bookings (Admin only)
 */
export const fetchBookings = async () => {
  try {
    const response = await fetch(`${API_URL}/bookings`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch bookings.');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};
