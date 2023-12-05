import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { categories } from '../../../mock/selectCategories';
import LocationPicker from '../../LocationPicker';
import ImageUploadBox from '../../ImageUploadBox';
import SingleDatePicker from './SingleDatePicker';
import { Grid } from '@mui/material';
import { IEvent } from '../../../interfaces/event';
import TabPanel from '../../TabPanel';
import useCreateEvent from '../../../hooks/useCreateEvent';

interface AddEventModalProps {
  onClose: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose }) => {
  const [newEvent, setNewEvent] = useState<IEvent>({
    title: '',
    category: '',
    description: '',
    place: '',
    city: '',
    startDate: null,
    endDate: null,
    coords: {
      lat: 0,
      lng: 0,
    },
    googleMapsLink: '',
    ticketPrice: '',
    eventImages: [],
  });

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

  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const addEventMutation = useCreateEvent(onClose);

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
            height: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <Box sx={{ height: 450 }}>
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
              <Grid container spacing={2} sx={{ pt: 2, justifyContent: 'space-between' }}>
                <Grid item xs={12} md={6}>
                  <SingleDatePicker label="Start Date" date={newEvent.startDate} onDateChange={(date) => setNewEvent((prev) => ({ ...prev, startDate: date }))} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SingleDatePicker label="End Date" date={newEvent.endDate} onDateChange={(date) => setNewEvent((prev) => ({ ...prev, endDate: date }))} />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <TextField fullWidth margin="normal" id="eventPlace" label="Event Place" name="place" value={newEvent.place} onChange={handleChange} />
              <LocationPicker onLocationSelected={handleLocationSelected} />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <ImageUploadBox onImagesUpload={handleImagesUpload} />
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <TextField fullWidth margin="normal" id="ticketPrice" label="Ticket Price" name="ticketPrice" value={newEvent.ticketPrice} onChange={handleChange} />
            </TabPanel>
          </Box>

          <Box mt={2} display="flex" justifyContent="center">
            <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ paddingX: '80px' }}>
              Save
            </Button>
            <Button onClick={onClose} variant="contained" color="secondary" sx={{ paddingX: '80px', marginLeft: '20px' }}>
              Close
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddEventModal;
