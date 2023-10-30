import React from 'react';
import { Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { useEventContext } from '../../hooks/useEventContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios';

const EventTable = () => {
  const { state, dispatch } = useEventContext();
  const { events } = state;

  const handleEditClick = (id: string) => {
    console.log('Editing:', id);
  };

  const handleDeleteClick = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/event/${id}`);

      if (response.status === 200) {
        dispatch({ type: 'DELETE_EVENT', payload: { _id: id } });
        console.log(`Event with ID: ${id} deleted successfully.`);
      } else {
        console.error('Failed to delete event.');
      }
    } catch (error) {
      console.error('Error while deleting event:', error);
    }
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
    { field: 'description', headerName: 'Description', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton aria-label="edit" color="primary" onClick={() => handleEditClick(params.row._id)}>
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
      <Box mx="20px" mt="40px">
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={events || []}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default EventTable;
