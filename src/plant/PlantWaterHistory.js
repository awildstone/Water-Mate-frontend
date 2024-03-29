import React, { useState, useEffect, useContext } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Paginator from '../Paginator';
import HistoryTable from './HistoryTable';
import Loading from '../alerts/Loading';
import UserContext from '../context/UserContext';
import useHistory, { getHistory } from './useHistory';
import { isValid } from '../utils';

const PlantWaterHistory = ({ close, plant }) => {
    const { token, refreshToken, getAuthToken } = useContext(UserContext);
    const [error, history, setHistory, handleHistoryRequest] = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(null);
    const [count, setCount] = useState(null);
    const [page, setPage] = useState(1);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        const getData = async () => {
            let paginatedData = await handleHistoryRequest(getHistory(token, plant.id, page));
            if (paginatedData) {
                setHistory(paginatedData.data);
                setItemsPerPage(paginatedData.data.itemsPerPage);
                setCount(paginatedData.data.count);
                setIsLoading(false);
            }
        }

        if (!isValid(token)) {
            getAuthToken(refreshToken);
        } else {
            getData();
        }
    }, [token, refreshToken, getAuthToken, page, handleHistoryRequest, plant, setHistory]);

    if (!isLoading && history && token && refreshToken) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', '& > :not(style)': { m: 2, p: 2 } }}>
                    <Paper>
                        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                            {plant.name} History
                        </Typography>
                        <HistoryTable rows={history.history} />
                        <Box sx={{ textAlign: 'center', '& > :not(style)': { m: 2 } }} >
                            {count > itemsPerPage ?
                                <Paginator
                                    itemsPerPage={itemsPerPage}
                                    currentPage={page}
                                    pageCount={Math.ceil(count / itemsPerPage)}
                                    handlePageChange={handlePageChange}
                                />
                                :
                                ''
                            }
                        </Box>
                        <Box sx={{ textAlign: 'left', '& > :not(style)': { m: 2 } }}>
                            <Tooltip title="Back to Plant Details">
                                <Button
                                    onClick={() => close('view-history')}
                                    color="info" sx={{ color: '#fff' }}
                                    variant="contained"
                                    size="large"
                                >
                                    Close
                                </Button>
                            </Tooltip>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        );
    }
    return <Loading />
}

export default PlantWaterHistory;
