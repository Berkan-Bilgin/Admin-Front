import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IEvent } from '../../interfaces/event';
import { useMutation } from 'react-query';
import { updateEvent } from '../../services/eventService';
import { useEventContext } from '../../hooks/useEventContext';

interface EditEventModalProps {
  event: IEvent | null;
  onClose: () => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({ event, onClose }) => {
  if (!event) {
    return null;
  }

  const { state, dispatch } = useEventContext();
  const { events } = state;

  const [updatedEvent, setUpdatedEvent] = useState<IEvent>(event);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedEvent((prev) => ({ ...prev, [name]: value }));
  };

  const updateEventMutation = useMutation((data: { id: string; eventData: IEvent }) => updateEvent(data.id, data.eventData), {
    onSuccess: (updatedEventData) => {
      console.log('Event updated successfully.');
      dispatch({ type: 'UPDATE_EVENT', payload: updatedEventData });
    },
    onError: (error: any) => {
      console.error('Error while updating event:', error);
    },
  });

  const handleSubmit = () => {
    if (event?._id) {
      // event bilgisi mevcutsa ve bir ID'ye sahipse
      updateEventMutation.mutate({
        id: event._id,
        eventData: updatedEvent,
      });
    }
    onClose();
  };

  return (
    <Modal open={Boolean(event)} onClose={onClose} closeAfterTransition>
      <Fade in={Boolean(event)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <h2>Edit Event</h2>
          <form noValidate autoComplete="off">
            <TextField label="Title" name="title" value={updatedEvent.title} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Category" name="category" value={updatedEvent.category} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Description" name="description" value={updatedEvent.description} onChange={handleChange} fullWidth margin="normal" />
            <Box mt={2} display="flex" justifyContent="space-evenly">
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Save
              </Button>
              <Button variant="contained" color="secondary" onClick={onClose} style={{ marginLeft: '10px' }}>
                Close
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditEventModal;
