import React, { useEffect, useState } from 'react';
import EventForm from '../components/Event/EventForm';
import EventCard from '../components/Event/EventCard';
import { IEvent } from '../interfaces/event';
import { useEventContext } from '../hooks/useEventContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { state, dispatch } = useEventContext();
  const { events } = state;

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/event', {
          // headers: {
          //   Authorization: `Bearer ${user.token}`,
          // },
        });
        const json = await response.json();
        console.log('events', json);

        if (response.ok) {
          dispatch({ type: 'SET_EVENTS', payload: json });
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Fetching events failed: ', error);
      }
    };
    console.log(user);

    if (user) {
      fetchEvents();
    }
  }, [dispatch, user]);

  return (
    <div>
      {user ? <h1>{user.email}</h1> : <h1>kullanıcı yok</h1>}

      <EventForm></EventForm>

      <div>{events && events.map((event: IEvent) => <EventCard key={event._id} event={event}></EventCard>)}</div>
    </div>
  );
};

export default Home;
