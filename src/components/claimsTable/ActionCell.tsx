import { useNavigate } from 'react-router-dom';
import ActionButton from '../actionButton/ActionButton';
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
        <ActionButton
            size="small"
            handleEvent={handleViewClick}
            className="view-button primary-button"
            placeholder='View'
        />
    );
};

export default ActionsCell;
