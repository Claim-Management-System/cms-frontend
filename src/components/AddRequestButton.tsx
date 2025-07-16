import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function AddRequestButton() {
    return (
        <Button
            variant="contained"
            size="large"
            endIcon={<AddIcon />}
            sx={{
                backgroundColor: '#1CA8DD',
                color: 'white',
                borderRadius: '4px',
                padding: '0px 24px',
                textTransform: 'none',
                fontWeight: 'bold',
                height: '45px',
                minWidth: '150px',
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: '#1785b0',
                    boxShadow: 'none',
                },
            }}
        >
            Add Request
        </Button>
    )
}

export default AddRequestButton