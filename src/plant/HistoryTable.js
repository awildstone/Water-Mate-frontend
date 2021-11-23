import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import Paper from '@mui/material/Paper';

const HistoryTable = ({ rows }) => {

    const createData = (action, water_date, snoozed_days, notes) => {
        return { action, water_date, snoozed_days, notes };
    };

    const formattedRows = rows.map((row) => {
        return createData(
            row.snooze ? 'Snooze' : 'Water', 
            moment(row.water_date).format('MM/DD/YYYY'), 
            row.snooze ? 3 : 'None', 
            row.notes )
    });

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right">Action</TableCell>
                        <TableCell align="right">Water Date</TableCell>
                        <TableCell align="right">Snoozed Days</TableCell>
                        <TableCell align="right">Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {formattedRows.map((row, i) => (
                        <TableRow
                            key={row.id ? row.id : i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell align="right">{row.action}</TableCell>
                            <TableCell align="right">{row.water_date}</TableCell>
                            <TableCell align="right">{row.snoozed_days}</TableCell>
                            <TableCell align="right">{row.notes}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default HistoryTable;
