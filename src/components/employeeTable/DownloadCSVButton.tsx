import React from 'react';
import Button from '@mui/material/Button';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove'; 
import { useNavigate } from 'react-router-dom';

interface DownloadCSVButtonProps {
    path: string;
}

function DownloadCSVButton({ path }: DownloadCSVButtonProps) {
    const navigate = useNavigate();

    return (
        <Button
            variant="contained"
            size="large"
            endIcon={<DriveFileMoveIcon />}
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
                display: 'flex',
                alignItems: 'center'
            }}
        >
            Download CSV
        </Button>
    )
}

export default React.memo(DownloadCSVButton);