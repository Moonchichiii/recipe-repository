import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_PROFILE_URL = import.meta.env.VITE_API_IMAGE_URL;
const API_SIGNATURE = import.meta.env.VITE_API_SIGNATURE;

// Function to register a new user
export const register = (username, email, password, confirm_password) => {
  return axios.post(`${API_URL}register/`, {
    username,
    email,
    password,
    confirm_password,
  });
};

// Generic fetch signature for images
export const fetchCloudinarySignature = async () => {
  // Retrieve the token from storage or context
  const token = localStorage.getItem("token") || "";

  const headers = {
    Authorization: `Token ${token}`,
  };
  const response = await axios.get(API_SIGNATURE, { headers });
  return response.data;
};

// handling the profile image update
export const updateProfile = async (userId, bio, profileImageUrl) => {
  const token = localStorage.getItem("token") || "";

  const headers = {
    Authorization: `Token ${token}`,
  };

  const response = await axios.patch(`${API_PROFILE_URL}${userId}/`, {
    bio,
    profile_image: profileImageUrl,
  }, { headers });

  console.log("User ID:", userId);

  return response.data;
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
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// removing the token on logout
export const handleLogout = () => {
  return logout().then(() => {
    localStorage.removeItem("token");
    setAuthToken(null);
  });
};
