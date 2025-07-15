import * as React from 'react';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import './ClaimTable.css';

export interface ClaimRecord {
  id: string;
  date: string;
  name: string;
  amount: number;
  purpose?: string;
  status?: "Accepted" | "Denied" | "Pending" | "Completed" | "Forwarded";
  relationship?: string;
}

interface ActionsCellProps {
  params: GridRenderCellParams<ClaimRecord>;
  category: "claim history" | "claim requests"
}

interface ClaimTableProps {
  data: ClaimRecord[];
  userRole: "admin" | "user";
  claimType: "misc" | "outpatient";
  category: "claim history" | "claim requests";
  onStatusChange?: (id: string, newStatus: ClaimRecord['status']) => void;
  loading?: boolean;
}

const ActionsCell = ({ params, category }: ActionsCellProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    console.log(action, params.id);
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
        field: 'date',
        headerName: 'Date',
        flex: 0.9,
        align: 'left',
        headerAlign: 'left',
        cellClassName: 'date-column-cell',
        headerClassName: 'date-column-header',
      },
      purpose: {
        field: 'purpose',
        headerName: 'Purpose',
        flex: 1,
        align: 'left',
        headerAlign: 'left',
      },
      status: {
        field: 'status',
        headerName: 'Status',
        flex: 0.9,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'status-column-header',
        renderCell: (params: GridRenderCellParams<ClaimRecord>) => {
          const status = params.row.status;
          if (!status) return null;
          const statusClass = status.toLowerCase();
          return <Chip label={status} size="small" className={`status-chip ${statusClass}`} />;
        }
      },
      amount: {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        flex: 0.8,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'amount-column-header',
        valueFormatter: (params: { value: number }) => params.value ? params.value.toLocaleString() : '',
      },
      relationship: {
        field: 'relationship',
        headerName: 'Relationship',
        flex: 0.9,
        align: 'left',
        headerAlign: 'left',
      },
      name: {
        field: 'name',
        headerName: 'Name',
        flex: 0.9,
        align: 'left',
        headerAlign: 'left',
      },
      actions: {
        field: 'actions',
        headerName: '',
        flex: 0.4,
        sortable: false,
        filterable: false,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => <ActionsCell params={params} category={category} />
      }
    };

    let finalColumns: GridColDef<ClaimRecord>[] = [];

    if (userRole === 'user' && claimType === 'misc' && category === 'claim history') {
      finalColumns = [
        baseColumns.date,
        { ...baseColumns.purpose, headerName: 'Purpose' },
        baseColumns.status,
        baseColumns.amount,
        baseColumns.actions,
      ];
    } else if (userRole === 'user' && claimType === 'outpatient' && category === 'claim history') {
      finalColumns = [
        baseColumns.date,
        { ...baseColumns.purpose, headerName: 'Title' },
        baseColumns.relationship,
        baseColumns.status,
        { ...baseColumns.amount, headerName: 'Balance' },
        baseColumns.actions,
      ];
    } else if (userRole === 'admin' && claimType === 'outpatient' && category === 'claim history') {
      finalColumns = [baseColumns.date, baseColumns.name, baseColumns.relationship, baseColumns.status, baseColumns.amount, baseColumns.actions];
    } else if (userRole === 'admin' && claimType === 'misc' && category === 'claim history') {
      finalColumns = [baseColumns.date, baseColumns.name, baseColumns.purpose, baseColumns.status, baseColumns.amount, baseColumns.actions];
    } else if (userRole === 'admin' && claimType === 'outpatient' && category === 'claim requests') {
      finalColumns = [baseColumns.date, baseColumns.name, baseColumns.relationship, baseColumns.amount, baseColumns.actions];
    } else if (userRole === 'admin' && claimType === 'misc' && category === 'claim requests') {
      finalColumns = [baseColumns.date, baseColumns.name, baseColumns.purpose, baseColumns.amount, baseColumns.actions];
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