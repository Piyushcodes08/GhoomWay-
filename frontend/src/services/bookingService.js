const API_URL = import.meta.env.VITE_API_URL;

export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/bookings`, {
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

export const fetchBookings = async (params = {}) => {
  try {
    const query = new URLSearchParams();
    if (params.status && params.status !== 'All') query.append('status', params.status);
    if (params.search) query.append('search', params.search);

    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/v1/bookings?${query.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
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

export const fetchBookingById = async (id) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/v1/bookings/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch booking.');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

export const updateBookingStatus = async (id, status, adminRemark) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/v1/bookings/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status, adminRemark }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update booking status.');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};