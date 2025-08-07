import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../actionButton/ActionButton';
import getClaimTableColumns from '../../utils/ClaimTableUtils';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Chip } from '@mui/material';
import type { ClaimRecord, UserRole, ClaimType, ClaimCategory } from '../../types';
import './ClaimTable.css';


interface ClaimTableProps {
  data: ClaimRecord[];
  userRole: UserRole;
  claimType: ClaimType;
  category: ClaimCategory;
  onStatusChange?: (id: string, newStatus: ClaimRecord['status']) => void;
  loading?: boolean;
}

export default function ClaimTable({ data, userRole, claimType, category, loading }: ClaimTableProps) {
  const navigate = useNavigate();

  const columns: GridColDef<(typeof data)[number]>[] = useMemo(() => {
    const baseColumns: Record<string, GridColDef<ClaimRecord>> = {
      date: {
        field: 'created_at',
        headerName: 'Date',
        flex: 1,
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
      description: {
        field: 'description',
        headerName: 'Description',
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
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'amount-column-header',
      },
      relationship: {
        field: 'relationship',
        headerName: 'Relationship',
        flex: 0.75,
        align: 'left',
        headerAlign: 'left',
      },
      name: {
        field: 'employee_name',
        headerName: 'Name',
        flex: 1,
        align: 'left',
        headerAlign: 'left',
      },
      actions: {
        field: 'actions',
        headerName: '',
        flex: 0.5,
        sortable: false,
        filterable: false,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => (
          <ActionButton
            className={"view-button primary-button"}
            placeholder={"View"}
            handleEvent={() => navigate(`/claim-details/${params.row.id}`)}
          />
        )
      }
    };

    const columnNames = getClaimTableColumns(userRole, claimType, category)
    const finalColumns: GridColDef<ClaimRecord>[] = columnNames?.map(name => baseColumns[name]) ?? [];
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