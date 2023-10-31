import React, { useEffect, useState } from 'react';
import EventForm from '../components/Event/EventForm';
import EventCard from '../components/Event/EventCard';
import { IEvent } from '../interfaces/event';
import { useEventContext } from '../hooks/useEventContext';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

const Home = () => {
  const { state, dispatch } = useEventContext();
  const { events } = state;

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/event');

        console.log(user);

        console.log('events', response.data);
        dispatch({ type: 'SET_EVENTS', payload: response.data });
      } catch (error: any) {
        console.error('Fetching events failed: ', error);
        if (error.response) {
          // Sunucudan dönen hata mesajını yazdırabilirsiniz
          console.error('Server Error: ', error.response.data);
        }
      }
    };
    console.log(user);

    if (user) {
      fetchEvents();
    }
  }, [dispatch, user]);

  return (
    <div>
      <div>{events && events.map((event: IEvent) => <EventCard key={event._id} event={event}></EventCard>)}</div>
    </div>
  );
};

export default Home;
