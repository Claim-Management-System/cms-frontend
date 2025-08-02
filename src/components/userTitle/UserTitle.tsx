import React from 'react';
import { Box, Typography } from '@mui/material';
import './UserTitle.css';

interface UserTitleProps {
    mainText: string;
    subText?: string;
}

const UserTitle: React.FC<UserTitleProps> = ({ mainText, subText }) => {
    return (
        <Box className='user-title-container'>
            <Typography
                variant="h5"
                className='main-text'
            >
                {mainText}
            </Typography>

            {subText && (
                <Typography
                    variant="subtitle1"
                    className='sub-text'
                >
                    {subText}
                </Typography>
            )}
        </Box>
    );
};

export default UserTitle;