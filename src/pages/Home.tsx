import { useEffect } from 'react';
import { useEventContext } from '../hooks/useEventContext';
import { useAuthContext } from '../hooks/useAuthContext';
import EventTable from '../components/Event/EventTable';
import { fetchEvents } from '../services/eventService';

const Home = () => {
  const { dispatch } = useEventContext();

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    const updateEvents = async () => {
      if (!user || !user.token) {
        console.log('Kullanıcı veya token bilgisi eksik.');
        return;
      }
      try {
        console.log('Token:', user.token);
        const eventsData = await fetchEvents({ Authorization: `Bearer ${user.token}` });
        dispatch({ type: 'SET_EVENTS', payload: eventsData });
      } catch (error) {
        console.error('Error updating events:', error);
      }
    };

    updateEvents();
  }, [dispatch, user, user?.token]);

  return (
    <div>
      <EventTable />
    </div>
  );
};

export default Home;
