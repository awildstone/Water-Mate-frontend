import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const Paginator = ({ title, pageCount, currentPage, handlePageChange, size="large" }) => {
    return (
        <Stack>
            <Typography component="div" m={2}>
                {title}
            </Typography>
            <Pagination 
                count={pageCount}
                onChange={handlePageChange}
                page={currentPage}
                size={size}
                color="secondary" 
            />
        </Stack>
    );
};

export default Paginator;
