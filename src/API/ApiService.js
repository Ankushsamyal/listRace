import axios from 'axios';
import {API_URL} from '../constant/ApiConstant' 

const API_BASE_URL = process.env.REACT_APP_BACKEND_PORT

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

//get API

export const fetchCategories = async () => {
    try {
        const response = await api.get(`${API_URL.HOME}`);
        return response.data[0].categories;
    } catch (error) {
        throw error?.response?.data?.message || error.message || 'API error';
    }
};
export const fetchExplore = async () => {
    try {
        const response = await api.get(`${API_URL.EXPLORE}`);
        return response.data;
    } catch (error) {
        throw error?.response?.data?.message || error.message || 'API error';
    }
};
export const fetchBookmarks = async () => {
    try {
        const response = await api.get(`${API_URL.FETCH_BOOKMARKS}`);
        return response.data;
    } catch (error) {
        throw error?.response?.data?.message || error.message || 'API error';
    }
};

export const fetchBlog = async () => {
    try {
        const response = await api.get(`${API_URL.BLOG}`);
        return response.data;
    } catch (error) {
        throw error?.response?.data?.message || error.message || 'API error';
    }
};

//post API


// PostBookmark with userId and bookmarks as parameters
export const PostBookmark = async (userId, bookmarks) => {
    try {
        const response = await api.post(`${API_URL.BOOKMARK}`, {
            userId,
            bookmarks
        });
        return response.data;

    } catch (error) {
        throw error?.response?.data?.message || error.message || 'API error';
    }
};


// src/api/api.js
export const loginUser = async (email, password) => {
    try {
      const response =  await api.post(`${API_URL.LOGIN}`, { email, password }, { withCredentials: true });
      console.log("login data",response.data)
        return response.data;
    } catch (error) {
        throw error?.response?.data?.message || 
              error?.response?.data?.error || 
              error.message || 
              'Login failed. Please try again.';
    }
};


export const signupUser = async (email, password, confirmPassword ,name) => {
  try {
    const response = await api.post(API_URL.SIGNUP, 
      { email, password, confirmPassword,name },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || 
          error?.response?.data?.error || 
          error.message || 
          'Signup failed. Please try again.';
  }
};
