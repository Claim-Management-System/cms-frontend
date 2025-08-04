import { useNavigate } from 'react-router-dom';
import {Button } from '@mui/material';
import type { GridRenderCellParams } from '@mui/x-data-grid';
import type { ClaimRecord } from '../../types';

interface ActionsCellProps {
    params: GridRenderCellParams<ClaimRecord>;
}

const ActionsCell = ({ params }: ActionsCellProps) => {
    const navigate = useNavigate();

    const handleViewClick = () => {
        if (params.row?.id) {
            navigate(`/claim-details/${params.row.id}`);
        }
    };

    return (
        <Button
            variant="outlined"
            size="small"
            onClick={handleViewClick}
            className="view-button-claims-table"
        >
            View
        </Button>
    );
};

export default ActionsCell;
