import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import type { GridRenderCellParams } from '@mui/x-data-grid';
import type { ClaimRecord, ClaimCategory } from '../../types';
import { CLAIM_CATEGORY } from '../../services/constantServices/constants';

interface ActionsCellProps {
    params: GridRenderCellParams<ClaimRecord>;
    category: ClaimCategory;
}

const ActionsCell = ({ params, category }: ActionsCellProps) => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // the logic for accept/decline APIs is in the coming PR
    const handleAction = (action: string) => {
        if (action === 'View') {
            navigate(`/claim-details/${params.row?.id}`);
        } else if (action === 'Accepted') {
            console.log("call accept claim api")
        } else if (action === 'Declined') {
            console.log("call rejected claim api")
        }
        setAnchorEl(null);
    };

    return (
        <Box>
            <IconButton
                aria-label="more"
                id={`actions-button-${params.id}`}
                aria-controls={open ? `actions-menu-${params.id}` : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                className="actions-icon-button"
            >
                <span className="three-dots-icon"></span>
            </IconButton>
            
            <Menu
                id={`actions-menu-${params.id}`}
                MenuListProps={{ 'aria-labelledby': `actions-button-${params.id}` }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => handleAction('View')}>View</MenuItem>
                {category === CLAIM_CATEGORY.REQUEST && [
                    <MenuItem key="accept" onClick={() => handleAction('Accepted')}>Accept</MenuItem>,
                    <MenuItem key="decline" onClick={() => handleAction('Declined')}>Decline</MenuItem>
                ]}
            </Menu>
        </Box>
    );
};

export default ActionsCell;