// services/bookingApi.js
// API service for handling booking data from MockAPI

const API_BASE_URL = 'https://68a7da1fbb882f2aa6dc9cc1.mockapi.io';

/**
 * Fetch all rooms/bookings from the API
 * @returns {Promise<Array>} Array of booking objects
 */
export const getAllBookings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Room`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

/**
 * Fetch a single booking by ID
 * @param {string} id - Booking ID
 * @returns {Promise<Object>} Booking object
 */
export const getBookingById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Room/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching booking ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new booking
 * @param {Object} bookingData - Booking data to create
 * @returns {Promise<Object>} Created booking object
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Room`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * Update an existing booking
 * @param {string} id - Booking ID
 * @param {Object} bookingData - Updated booking data
 * @returns {Promise<Object>} Updated booking object
 */
export const updateBooking = async (id, bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Room/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating booking ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a booking
 * @param {string} id - Booking ID
 * @returns {Promise<Object>} Deleted booking object
 */
export const deleteBooking = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Room/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error deleting booking ${id}:`, error);
    throw error;
  }
};

// Export all methods as default object
export default {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};