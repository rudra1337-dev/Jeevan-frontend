
import axios from "axios";

const API_BASE = "https://jeevan-backend-3974.onrender.com/api";
//const API_BASE = "http://localhost:5000/api";


//SignIn request
//https://hack-odisha-25-backend.onrender.com/api
export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || { msg: "Something went wrong" };
  }
};






// src/api/profile.js
//https://hack-odisha-25-backend.onrender.com/api/profile

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found");

    const res = await axios.get(`${API_BASE}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data; // User object
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};











// Function to update profile
export const updateProfile = async (formData) => {
  try {
    const token = localStorage.getItem("authToken"); // JWT token stored after login

    const res = await axios.patch(`${API_BASE}/profile/update`, formData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    return res.data; // return response to frontend
  } catch (err) {
    console.error("Update profile error:", err.response?.data || err.message);
    throw err;
  }
};





// src/API/requests.js

//https://hack-odisha-25-backend.onrender.com/api/request/form

export const sendRequest = async (formData) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found in localStorage");

    const res = await axios.post(
      `${API_BASE}/request/form`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Send request error:", err.response?.data || err.message);
    throw err;
  }
};








//Request History
//https://hack-odisha-25-backend.onrender.com/api/request

export const getRequestHistory = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found in localStorage");

    const res = await axios.get(`${API_BASE}/request/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data; // will contain { success, count, requests }
  } catch (err) {
    console.error("❌ Request history fetch error:", err.response?.data || err.message);
    throw err;
  }
};









// src/API/allRequests.js

//https://hack-odisha-25-backend.onrender.com/api/request/all-history

// Function to get all requests (only accessible to role == member)
export const getAllRequests = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token found in localStorage");

    const res = await axios.get(`${API_BASE}/request/all-history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Get all requests error:", err.response?.data || err.message);
    throw err;
  }
};








// frontend/src/API/auth.js

//https://hack-odisha-25-backend.onrender.com/api/auth/logout

export const logoutUser = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No token found in localStorage");
  }

  try {
    const response = await axios.post(
      `${API_BASE}/auth/logout`,
      {}, // No body needed
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Logout API Error:", error);
    throw error;
  }
};







// src/api/auth.js
//http://localhost:5000/api/auth"; 
// Change this to your backend URL if hosted

export const signupUser = async (formData) => {
  try {
    const res = await axios.post(`${API_BASE}/auth/signup`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      throw { message: "Something went wrong" };
    }
  }
};