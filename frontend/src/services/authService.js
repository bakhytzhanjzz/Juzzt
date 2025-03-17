import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// Register User
export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

// Login User
export const loginUser = async (userData) => {
    return axios.post(`${API_URL}/login`, userData);
};

// Get User Profile (optional, if API supports fetching user data)
export const getProfile = async (token) => {
    return axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
