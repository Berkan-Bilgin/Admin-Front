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
import { useSnackbar } from 'notistack';
import LocationPicker from '../LocationPicker';
import TabPanel from '../TabPanel';
import { Tabs, Tab } from '@mui/material';

interface EditEventModalProps {
  event: IEvent | null;
  onClose: () => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({ event, onClose }) => {
  if (!event) {
    return null;
  }

  const { dispatch } = useEventContext();

  const { enqueueSnackbar } = useSnackbar();

  const [updatedEvent, setUpdatedEvent] = useState<IEvent>(event);
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLocationSelected = (lat: number, lng: number) => {
    setUpdatedEvent((prev) => ({ ...prev, coords: { lat, lng } }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedEvent((prev) => ({ ...prev, [name]: value }));
  };

  const updateEventMutation = useMutation((data: { id: string; eventData: IEvent }) => updateEvent(data.id, data.eventData), {
    onSuccess: (updatedEventData) => {
      console.log('Event updated successfully.');
      enqueueSnackbar('Event updated successfully', {
        variant: 'success',
        autoHideDuration: 3000,
      });
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
            width: 800,
            height: 700,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Event Informations" />
            <Tab label="Yer ve Fiyat Bilgisi" />
            <Tab label="Etkinlik Resimleri" />
            <Tab label="Etkinlik Ücreti" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <h2>Edit Event</h2>
            <form noValidate autoComplete="off">
              <TextField label="Title" name="title" value={updatedEvent.title} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Category" name="category" value={updatedEvent.category} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Description" name="description" value={updatedEvent.description} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Place" name="place" value={updatedEvent.place} onChange={handleChange} fullWidth margin="normal" />
            </form>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TextField fullWidth margin="normal" id="eventPlace" label="Event Place" name="place" value={updatedEvent.place} onChange={handleChange} />
            <LocationPicker onLocationSelected={handleLocationSelected} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            b
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            c
          </TabPanel>

          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose} style={{ marginLeft: '10px' }}>
              Close
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditEventModal;
