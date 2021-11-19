import Pagination from '@mui/material/Pagination';

const Paginator = ({ pageCount, currentPage, handlePageChange, size="large" }) => {
    return (
        <Pagination 
            count={pageCount}
            onChange={handlePageChange}
            page={currentPage}
            size={size}
            color="secondary" 
        />
    );
};

export default Paginator;