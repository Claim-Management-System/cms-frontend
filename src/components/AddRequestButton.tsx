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
                fontWeight: '100',
                height: '40px',
                minWidth: '200px',
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: '#1785b0',
                    boxShadow: 'none',
                },
                fontFamily: 'LLCirc',  
                fontSize: '16px',
                marginLeft: '10px',
            }}
        >
            Add Request
        </Button>
    )
}

export default React.memo(AddRequestButton);