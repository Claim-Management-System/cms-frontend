import * as React from 'react';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { USER_ROLES, CLAIM_TYPES, CLAIM_CATEGORY } from '../../services/constantServices/constants';
import { type ClaimRecord } from '../../types';
import './ClaimTable.css';


interface ActionsCellProps {
  params: GridRenderCellParams<ClaimRecord>;
  category: "claim history" | "claim requests"
}

interface ClaimTableProps {
  data: ClaimRecord[];
  userRole: "admin" | "user";
  claimType: "miscellaneous" | "outpatient";
  category: "claim history" | "claim requests";
  onStatusChange?: (id: string, newStatus: ClaimRecord['status']) => void;
  loading?: boolean;
}

const ActionsCell = ({ params, category }: ActionsCellProps) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    if(action === 'View') {
      navigate(`/claim-history/${params.row?.id}`);
    } else if(action === 'Accepted') {
      console.log("call accept claim api")
    } else if(action === 'Declined') {
      console.log("call rejected claim api")
    }
    handleClose();
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
        MenuListProps={{
          'aria-labelledby': `actions-button-${params.id}`,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleAction('View')}>View</MenuItem>
        {category === 'claim requests' && [
          <MenuItem key="accept" onClick={() => handleAction('Accepted')}>Accept</MenuItem>,
          <MenuItem key="decline" onClick={() => handleAction('Declined')}>Decline</MenuItem>
        ]}
      </Menu>
    </Box>
  );
};


export default function ClaimTable({ data, userRole, claimType, category, loading }: ClaimTableProps) {

  const columns: GridColDef<(typeof data)[number]>[] = React.useMemo(() => {
    const baseColumns: Record<string, GridColDef<ClaimRecord>> = {
      date: {
        field: 'created_at',
        headerName: 'Date',
        flex: 0.7,
        align: 'left',
        headerAlign: 'left',
        cellClassName: 'date-column-cell',
        headerClassName: 'date-column-header',
      },
      purpose: {
        field: 'description',
        headerName: 'Purpose',
        flex: 1.4,
        align: 'left',
        headerAlign: 'left',
      },
      status: {
        field: 'status',
        headerName: 'Status',
        flex: 0.8,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'status-column-header',
        renderCell: (params: GridRenderCellParams<ClaimRecord>) => {
          const status = params.row.status;
          if (!status) return null;
          const statusClass = status.toLowerCase();
          return <Chip label={status} size="small" className={`status-chip ${statusClass}`} />;
        }
      },
      amount: {
        field: 'submitted_amount',
        headerName: 'Amount',
        type: 'number',
        flex: 0.8,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'amount-column-header',
      },
      relationship: {
        field: 'relationship',
        headerName: 'Relationship',
        flex: 1.2,
        align: 'left',
        headerAlign: 'left',
      },
      name: {
        field: 'employee_name',
        headerName: 'Name',
        flex: 0.9,
        align: 'left',
        headerAlign: 'left',
      },
      actions: {
        field: 'actions',
        headerName: '',
        flex: 0.3,
        sortable: false,
        filterable: false,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => <ActionsCell params={params} category={category}/>
      }
    };

    let finalColumns: GridColDef<ClaimRecord>[] = [];
    if (userRole === USER_ROLES.USER && claimType === CLAIM_TYPES.MISC && category === CLAIM_CATEGORY.HISTORY) {
      finalColumns = [
        baseColumns.date,
        baseColumns.purpose,
        baseColumns.status,
        baseColumns.amount,
        baseColumns.actions,
      ];
    } else if (userRole === USER_ROLES.USER && claimType === CLAIM_TYPES.OUTPATIENT && category === CLAIM_CATEGORY.HISTORY) {
      finalColumns = [
        baseColumns.date,
        baseColumns.purpose,
        baseColumns.relationship,
        baseColumns.status,
        baseColumns.amount,
        baseColumns.actions,
      ];
    } else if (userRole === USER_ROLES.ADMIN && claimType === CLAIM_TYPES.OUTPATIENT && category === CLAIM_CATEGORY.HISTORY) {
      finalColumns = [
        baseColumns.date, 
        baseColumns.name, 
        baseColumns.relationship, 
        baseColumns.status, 
        baseColumns.amount, 
        baseColumns.actions
      ];
    } else if (userRole === USER_ROLES.ADMIN && claimType === CLAIM_TYPES.MISC && category === CLAIM_CATEGORY.HISTORY) {
      finalColumns = [
        baseColumns.date, 
        baseColumns.name,
        baseColumns.purpose, 
        baseColumns.status, 
        baseColumns.amount, 
        baseColumns.actions
      ];
    } else if (userRole === USER_ROLES.ADMIN && claimType === CLAIM_TYPES.OUTPATIENT && category === CLAIM_CATEGORY.REQUEST) {
      finalColumns = [
        baseColumns.date, 
        baseColumns.name, 
        baseColumns.relationship, 
        baseColumns.amount, 
        baseColumns.actions
      ];
    } else if (userRole === USER_ROLES.ADMIN && claimType === CLAIM_TYPES.MISC && category === CLAIM_CATEGORY.REQUEST) {
      finalColumns = [
        baseColumns.date, 
        baseColumns.name, 
        baseColumns.purpose, 
        baseColumns.amount, 
        baseColumns.actions
      ];
    }

    return finalColumns;
  }, [userRole, claimType, category]);

  return (
    <Box className="scrollable-x" sx={{ overflowX: 'auto' }}>
      <Box className="claim-table-container">
        <DataGrid
          rows={data}
          columns={columns}
          loading={loading}
          rowHeight={50}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
}