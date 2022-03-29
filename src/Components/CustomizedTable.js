import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import '../App.css'







export default function CustomizedTable({head1,head2,head3,head4,head5,head6,rows}) {


    

    const columns = [
        { id: head1, label: head1, minWidth: 170 },
        { id: head2, label: head2, minWidth: 100 },
        {
          id: head3,
          label: head3,
          minWidth: 170,
          align: 'right',
        },
        {
          id: head4,
          label: head4,
          minWidth: 170,
          align: 'right',
        },
        {
          id: head5,
          label: head5,
          minWidth: 170,
          align: 'right',
        },
        {
          id: head6,
          label: head6,
          minWidth: 170,
          align: 'right',
        },
      ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.schedule_id}>
                    <TableCell>
                        {row.doctor_name}
                    </TableCell>
                    <TableCell align='right'>
                        {row.education}
                    </TableCell>
                    <TableCell align='right'>
                        {row.speciality}
                    </TableCell>
                    <TableCell align='right'>
                        {row.schedule_date}
                    </TableCell>
                    <TableCell align='right'>
                        {row.schedule_time}
                    </TableCell>
                    <TableCell align='right'>
                        <button className='loopbutton'>Get Appointment</button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
