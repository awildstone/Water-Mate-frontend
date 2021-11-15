import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditCollectionForm from './EditCollectionForm';

const EditCollection = ({ close, handleEdit, collection }) => {
    return(
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Edit Collection
                    </Typography>
                    <p>All fields required.</p>
                   <EditCollectionForm close={close} handleEdit={handleEdit} collection={collection} />
                </Paper>
            </Box>
        </Container>
    );
}

export default EditCollection;