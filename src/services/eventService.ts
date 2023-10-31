import axios from 'axios';
import { IEvent } from '../interfaces/event';

const BASE_URL = 'http://localhost:3000/api';

export const fetchEvents = () => axios.get(`${BASE_URL}/events`).then((res) => res.data);
export const createEvent = (eventData: IEvent) => axios.post(`${BASE_URL}/event`, eventData).then((res) => res.data);
export const deleteEvent = (id: string) => axios.delete(`${BASE_URL}/event/${id}`).then((res) => res.data);
export const updateEvent = (id: string, eventData: IEvent) => axios.put(`${BASE_URL}/event/${id}`, eventData).then((res) => res.data);
