import axios from 'axios';
import { IEvent } from '../interfaces/event';

const BASE_URL = 'https://plankton-app-ouh3i.ondigitalocean.app/api';

const apiClient = axios.create({ baseURL: BASE_URL });

export const fetchEvents = async (headers = {}) => {
  try {
    const response = await apiClient.get('/event', { headers });
    return response.data; // Veriyi geri döndür
  } catch (error: any) {
    console.error('Fetching events failed: ', error);
    if (error.response) {
      console.error('Server Error: ', error.response.data);
    }
    throw error; // Hata durumunda hata fırlat
  }
};

export const createEvent = async (eventData: IEvent) => {
  try {
    const response = await axios.post(`${BASE_URL}/event`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error; // Hata, üst bileşene devredilir
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/event/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error; // Hata, üst bileşene devredilir
  }
};

export const updateEvent = async (id: string, eventData: IEvent) => {
  try {
    const response = await axios.put(`${BASE_URL}/event/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error; // Hata, üst bileşene devredilir
  }
};
