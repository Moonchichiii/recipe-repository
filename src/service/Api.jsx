import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

// Function to register a new user
export const register = (username, email, password, confirm_password) => {
    return axios.post(`${API_URL}register/`, {
        username, 
        email, 
        password, 
        confirm_password
    });
};

// second step, public profile 
export const setupProfile = (userId, bio, profileImage) => {
    return axios.post(`${API_URL}profiles/${userId}/`, {
        bio,
        profileImage
    });
};


// Function to log in a user
export const login = (username, password) => {
    return axios.post(`${API_URL}login/`, { username, password });
};

// Function to log out a user
export const logout = () => {
    return axios.post(`${API_URL}logout/`);
};

// removes auth token axios header
export const setAuthToken = token => {
    if (token) {
        
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {        
        delete axios.defaults.headers.common['Authorization'];
    }
};

// removing the token on logout
export const handleLogout = () => {
    return logout().then(() => {
        localStorage.removeItem('token');
        setAuthToken(null);
    });
};