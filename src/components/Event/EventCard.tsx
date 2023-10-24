import React from 'react';
import { IEvent } from '../../interfaces/event';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEventContext } from '../../hooks/useEventContext';
import { useAuthContext } from '../../hooks/useAuthContext';

interface EventCardProps {
  event: IEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { dispatch } = useEventContext();

  const {
    state: { user },
  } = useAuthContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = async () => {
    if (!user) {
      console.log('no user');
      return;
    }

    const response = await fetch('http://localhost:3000/api/event/' + event._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    console.log('response', response);

    if (response.ok) {
      console.log('merhaba');
      dispatch({ type: 'DELETE_EVENT', payload: json });
    }
  };

  const cardStyle = {
    width: isSmallScreen ? '100%' : '30%',
    margin: 'auto',
    marginTop: '20px',
  };

  return (
    <Card style={cardStyle}>
      <CardActionArea>
        {event.images && event.images[0] && <CardMedia component="img" height="140" image={event.images[0]} alt={event.title} />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            title: {event.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            category: {event.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            category: {event._id}
          </Typography>
          <span onClick={handleClick}>Delete</span>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
