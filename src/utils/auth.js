// Get the authentication token from localStorage
export const getToken = () => localStorage.getItem('token');

// Get the user data from localStorage
export const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!getToken();
};

// Save authentication data
export const setAuth = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
};

// Clear authentication data
export const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Get authorization header
export const getAuthHeader = () => {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Handle API response for authentication
export const handleAuthResponse = (response, navigate) => {
    if (response.status === 401) {
        clearAuth();
        navigate('/login');
        return true;
    }
    return false;
}; 