import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_PROFILE_URL = import.meta.env.VITE_API_IMAGE_URL;
const API_SIGNATURE = import.meta.env.VITE_API_SIGNATURE;
const API_POSTS_URL = import.meta.env.VITE_API_POSTS_URL;


// Registration,login, logout calls
 
//  Register a new user
export const register = (username, email, password, confirm_password) => {
  return axios.post(`${API_URL}register/`, {
    username,
    email,
    password,
    confirm_password,
  });
};

// Login call 
export const login = (username, password) => {
  return axios.post(`${API_URL}login/`, { username, password });
};

// Logout Call
export const logout = () => {
  console.log(`Logging out with URL: ${API_URL}logout/`);
  return axios.post(`${API_URL}logout/`);
};

// Removes auth token on logout
export const setAuthToken = (token) => {
  if (token) {
    console.log(`Setting auth token: ${token}`);
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    console.log("Removing auth token");
    delete axios.defaults.headers.common["Authorization"];
  }
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



// handling the profile image After receiving the signature from the server
export const updateProfile = async (userId, bio, profileImageUrl) => {
  const token = localStorage.getItem("token") || "";

  const headers = {
    Authorization: `Token ${token}`,
  };

  const response = await axios.patch(
    `${API_PROFILE_URL}${userId}/`,
    {
      bio,
      profile_image: profileImageUrl,
    },
    { headers }
  );

  return response.data;
};

// Call for posts

export const createPost = async (title, image, ingredients, recipe, cookingTime) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('image', image);
  formData.append('ingredients', ingredients);
  formData.append('recipe', recipe);
  formData.append('cookingTime', cookingTime);

  const response = await axios.post(API_POSTS_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
