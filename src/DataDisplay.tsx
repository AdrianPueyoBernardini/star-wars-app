import { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople } from './peopleSlice';
import { RootState, AppDispatch } from './store';

export const DataDisplay = () => {
    const dispatch: AppDispatch = useDispatch();
    const { data, loading } = useSelector((state: RootState) => state.people);
    const filter = useSelector((state: RootState) => state.filter.filter);

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

  const getIdFromUrl = (url: string) => {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
  };

  const filteredData = data.filter(person =>
    person.name.toLowerCase().includes(filter)
  );

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 250 },
    { field: 'height', headerName: 'Altura', width: 250 },
    { field: 'gender', headerName: 'Género', width: 250 },
    {
      field: 'action',
      headerName: 'Información',
      width: 250,
      renderCell: (params) => (
        <Link to={`/character/${params.row.id}`}>
          <Button variant="contained" color="primary">Info</Button>
        </Link>
      ),
    },
  ];

  const rows = filteredData.map((person) => ({
    id: getIdFromUrl(person.url),
    name: person.name,
    height: `${person.height} cm`,
    gender: person.gender,
  }));

  return (
    <>
      {loading
        ? <p>Cargando...</p>
        : <DataGrid rows={rows} columns={columns} initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }} />
      }
    </>
  );
};
