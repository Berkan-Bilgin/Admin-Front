import React, { useState } from 'react';
import { IEvent } from '../../interfaces/event';
import ImageUploadBox from '../ImageUploadBox';
import { useEventContext } from '../../hooks/useEventContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import LocationPicker from '../LocationPicker';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Container } from '@mui/material';
const EventForm: React.FC = () => {
  const { dispatch } = useEventContext();

  const {
    state: { user },
  } = useAuthContext();

  const [event, setEvent] = useState<IEvent>({
    title: '',
    description: '',
    category: '',
    images: [],
    startDate: '',
    endDate: '',
    venue: '',
    city: '',
    ticketPrice: null,
    online: false,
  });

  const handleImagesUpload = (images: string[]) => {
    setEvent({ ...event, images }); // Yüklenen resimleri etkinlik durumuna ekleyin
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      console.log('You must be logged in');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/event', {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const json = await response.json();
      console.log('Event created successfully:', json);
      dispatch({ type: 'CREATE_EVENT', payload: json });
    } catch (error) {
      console.error('There was an error creating the event:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Add a New Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField variant="outlined" margin="normal" required fullWidth label="Title" name="title" value={event.title} onChange={handleChange} />
        <TextField variant="outlined" margin="normal" required fullWidth multiline rows={4} label="Description" name="description" value={event.description} onChange={handleChange} />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select name="category" value={event.category} onChange={handleChange} label="Category">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="concert">Concert</MenuItem>
            <MenuItem value="theatre">Theatre</MenuItem>
            <MenuItem value="exhibition">Exhibition</MenuItem>
            {/* Diğer kategoriler */}
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth margin="normal">
          <LocationPicker />
        </FormControl>

        <ImageUploadBox onImagesUpload={handleImagesUpload} />

        <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default EventForm;
