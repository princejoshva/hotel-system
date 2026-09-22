import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const getHotels = async (params = {}) => {
  const response = await api.get("/hotels", {
    params
  });

  return response.data;
};

export const getHotelById = async (id) => {
  const response = await api.get(`/hotels/${id}`);

  return response.data;
};

export const createHotel = async (formData) => {
  const response = await api.post("/hotels", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};

export const updateHotel = async (id, formData) => {
  const response = await api.put(`/hotels/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};

export const deleteHotel = async (id) => {
  const response = await api.delete(`/hotels/${id}`);

  return response.data;
};

export default api;

