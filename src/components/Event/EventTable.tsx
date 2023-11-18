import React, { useState } from 'react';
import { Box, IconButton, Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { useEventContext } from '../../hooks/useEventContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import { deleteEvent } from '../../services/eventService';
import { useMutation } from 'react-query';
import EditEventModal from './EditEventModal';
import AddEventModal from './AddEventModal';
import { IEvent } from '../../interfaces/event';
import { useSnackbar } from 'notistack';

const EventTable = () => {
  const { state, dispatch } = useEventContext();
  const { events } = state;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleEditClick = (event: IEvent) => {
    console.log('Editing:', event._id);
    setEditingEvent(event); // Düzenlenen etkinliğin ID'sini kaydedin.
    setIsEditModalOpen(true); // Modal'ı açın.
  };

  const handleCloseModal = () => {
    setEditingEvent(null); // Düzenlenen etkinliğin ID'sini temizleyin.
    setIsEditModalOpen(false); // Modal'ı kapatın.
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const deleteEventMutation = useMutation(deleteEvent, {
    onSuccess: (data, variables) => {
      const id = variables as string;
      enqueueSnackbar('Event Deleted successfully', {
        variant: 'error',
        autoHideDuration: 3000,
      });
      dispatch({ type: 'DELETE_EVENT', payload: { _id: id } });
      console.log(`Event with ID: ${id} deleted successfully.`);
    },
    onError: (error: any) => {
      console.error('Error while deleting event:', error);
    },
  });

  const handleDeleteClick = (id: string) => {
    deleteEventMutation.mutate(id);
  };

  const columns: GridColDef[] = [
    {
      field: 'index',
      headerName: '#',
      width: 70,
      valueGetter: (params) => {
        const index = events?.findIndex((row) => row._id === params.row._id);
        return index !== undefined && index !== -1 ? index + 1 : 0;
      },
    },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'place', headerName: 'Place', width: 150 },
    { field: 'ticketPrice', headerName: 'Ticket Price', width: 150 },
    { field: 'startDate', headerName: 'Start Date', width: 200 },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton aria-label="edit" color="primary" onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" color="error" onClick={() => handleDeleteClick(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Box mx="20px" mt="60px" display="flex" justifyContent="flex-end">
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          onClick={() => {
            handleOpenAddModal();

            console.log('Add New Event');
          }}
        >
          Add Event
        </Button>
      </Box>
      <Box mx="auto" mt="20px" width="1300px">
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={events || []}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
      {isEditModalOpen && <EditEventModal event={editingEvent} onClose={handleCloseModal} />}
      {isAddModalOpen && <AddEventModal onClose={handleCloseAddModal} />}
    </Box>
  );
};

export default EventTable;
