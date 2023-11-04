// useCreateEvent.js

import { useMutation } from 'react-query';
import { createEvent } from '../services/eventService';
import { useSnackbar } from 'notistack';
import { useEventContext } from './useEventContext';

const useCreateEvent = (onClose: () => void) => {
  const { enqueueSnackbar } = useSnackbar();
  const { dispatch } = useEventContext();

  const mutation = useMutation(createEvent, {
    onSuccess: (data) => {
      // Etkinlik başarıyla oluşturulduğunda yapılacak işlemler
      console.log('Event created successfully:', data);
      onClose();
      enqueueSnackbar('Event Created successfully', {
        variant: 'success',
        autoHideDuration: 3000,
      });
      dispatch({ type: 'CREATE_EVENT', payload: data });
    },
    onError: (error) => {
      // Etkinlik oluşturulurken bir hata meydana geldiğinde yapılacak işlemler
      console.error('Error creating the event:', error);
    },
  });

  return mutation;
};

export default useCreateEvent;
