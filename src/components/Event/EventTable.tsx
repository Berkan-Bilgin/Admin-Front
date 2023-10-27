import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Pagination } from '@mui/material';

const EventTable = () => {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const data = [
    { id: 1, name: 'Ali' },
    { id: 2, name: 'Ayşe' },
    { id: 3, name: 'Mehmet' },
    { id: 4, name: 'Fatma' },
    { id: 5, name: 'Hasan' },
    { id: 6, name: 'Hüseyin' },
    { id: 7, name: 'Elif' },
    { id: 8, name: 'Ömer' },
    { id: 9, name: 'Zeynep' },
    { id: 10, name: 'Yusuf' },
    { id: 11, name: 'Emine' },
    { id: 12, name: 'Ahmet' },
    { id: 13, name: 'Selin' },
    { id: 14, name: 'Berk' },
    { id: 15, name: 'Sema' },
    { id: 16, name: 'Murat' },
    { id: 17, name: 'Nur' },
    { id: 18, name: 'Kerem' },
    { id: 19, name: 'Büşra' },
    { id: 20, name: 'Emir' },
  ];

  const filteredData = data.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));
  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ padding: 40 }}>
      <TextField label="Filtrele" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>İsim</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination count={Math.ceil(filteredData.length / itemsPerPage)} page={page} onChange={(_, value) => setPage(value)} />
    </div>
  );
};

export default EventTable;
