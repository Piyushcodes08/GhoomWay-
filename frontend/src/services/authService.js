import API from './api';

/**
 * @desc    Login as admin
 * @route   POST /api/v1/admin/login
 */
export const login = async (email, password) => {
  try {
    const response = await API.post('/api/v1/admin/login', { email, password });
    const data = response.data;

    if (data.token) {
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.admin));
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @desc    Log out and clear local storage
 */
export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  window.location.href = '/admin/login';
};

export const getStoredToken = () => localStorage.getItem('adminToken');

export const getStoredUser = () => {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => !!localStorage.getItem('adminToken');
