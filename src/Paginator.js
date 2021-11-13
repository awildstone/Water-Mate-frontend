import Pagination from '@mui/material/Pagination';

const Paginator = ({ pageCount, currentPage, handlePageChange }) => {
    return (
        <Pagination 
            count={pageCount}
            onChange={handlePageChange}
            page={currentPage}
            size="large"
            color="secondary" 
        />
    );
};

export default Paginator;