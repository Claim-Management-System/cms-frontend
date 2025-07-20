import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

interface AddRequestButtonProps {
  path: string;
}

function AddRequestButton({ path }: AddRequestButtonProps) {
    const navigate = useNavigate();

    return (
        <Button
            variant="contained"
            size="large"
            endIcon={<AddIcon />}
            onClick={() => navigate(path)}
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

export default React.memo(AddRequestButton);