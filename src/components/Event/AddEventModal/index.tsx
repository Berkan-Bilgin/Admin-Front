import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { categories } from '../../../mock/selectCategories';
import LocationPicker from '../../LocationPicker';
import ImageUploadBox from '../../ImageUploadBox';
import { useMutation } from 'react-query';
import { useEventContext } from '../../../hooks/useEventContext';
import { createEvent } from '../../../services/eventService';
import { useSnackbar } from 'notistack';

interface AddEventModalProps {
  onClose: () => void;
}

interface TabPanelProps {
  value: number;
  index: number;
  children: React.ReactNode; // Bu satırı ekledik
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <Typography component="div" role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
};

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose }) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    city: '',
    startDate: new Date(),
    endDate: new Date(),
    coords: {
      lat: 0,
      lng: 0,
    },
    googleMapsLink: '',
    ticketPrice: '',
    eventImages: [],
  });

  const { enqueueSnackbar } = useSnackbar();

  const [tabValue, setTabValue] = useState(0);

  const handleImagesUpload = (images: string[]) => {
    setNewEvent((prevState) => ({ ...prevState, images }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
    console.log(newEvent);
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const { dispatch } = useEventContext();

  const addEventMutation = useMutation(createEvent, {
    onSuccess: (data) => {
      // Başarılı olduğunda yapılacaklar...
      console.log('Event created successfully:', data);
      onClose(); // Etkinlik başarıyla oluşturulduğunda modalı kapat
      enqueueSnackbar('Event Created successfully', {
        variant: 'success',
        autoHideDuration: 3000,
      });

      dispatch({ type: 'CREATE_EVENT', payload: data });
    },
    onError: (error) => {
      console.error('Error creating the event:', error);
    },
  });

  const handleSubmit = () => {
    console.log(newEvent);
    addEventMutation.mutate(newEvent);
  };

  const handleLocationSelected = (lat: number, lng: number) => {
    setNewEvent((prev) => ({ ...prev, coords: { lat, lng } }));
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Fade in={true}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            minHeight: '400px',
          }}
        >
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Event Informations" />
            <Tab label="Yer ve Fiyat Bilgisi" />
            <Tab label="Etkinlik Resimleri" />
            <Tab label="Etkinlik Ücreti" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <TextField fullWidth margin="normal" id="eventName" label="Event Name" name="title" value={newEvent.title} onChange={handleChange} />
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="eventCategory">Event Category</InputLabel>
              <Select label="eventCategory" id="eventCategory" name="category" value={newEvent.category} onChange={handleSelectChange}>
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField fullWidth margin="normal" id="eventDescription" label="Event Description" name="description" value={newEvent.description} onChange={handleChange} />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TextField fullWidth margin="normal" id="eventLocation" label="Event Location" name="location" value={newEvent.location} onChange={handleChange} />

            <TextField fullWidth margin="normal" id="googleMapsLink" label="Google Maps Link" name="googleMapsLink" value={newEvent.googleMapsLink} onChange={handleChange} />

            <LocationPicker onLocationSelected={handleLocationSelected} />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <ImageUploadBox onImagesUpload={handleImagesUpload} />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <TextField fullWidth margin="normal" id="ticketPrice" label="Ticket Price" name="ticketPrice" value={newEvent.ticketPrice} onChange={handleChange} />
          </TabPanel>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={onClose} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
              Close
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddEventModal;
