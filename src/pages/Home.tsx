import { useEffect } from 'react';

import { useEventContext } from '../hooks/useEventContext';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import EventTable from '../components/Event/EventTable';

const Home = () => {
  const { dispatch } = useEventContext();

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
      <EventTable />
    </div>
  );
};

export default Home;
