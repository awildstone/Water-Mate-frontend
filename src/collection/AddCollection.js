import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddCollectionForm from './AddCollectionForm';

const AddCollection = ({ close, handleRequest }) => {

    return(
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Add Collection
                    </Typography>
                    <p>All fields required.</p>
                   <AddCollectionForm close={close} handleRequest={handleRequest} />
                </Paper>
            </Box>
        </Container>
    );
}

export default AddCollection;