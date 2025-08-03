import { useMemo } from 'react';
import ActionsCell from './ActionCell';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import './EmployeeTable.css';

export interface NewEmployeeInterface {
    id: number;
    employee_number: number;
    employee_type_id: number;
    work_location_id: number;
    marital_status_id: number;
    first_name: string;
    last_name: string;
    job_title: string;
    position: string;
    age: number;
    onboarding_date: string;
    date_of_birth: string;
    team?: string;
    department?: string;
    work_email: string;
    primary_email?: string;
    primary_number: string;
    bank_account_number: string;
    created_at: string;
    updated_at: string;
}

interface EmployeeTableProps {
    data: NewEmployeeInterface[];
    loading: boolean;
}

export default function EmployeeTable({ data, loading }: EmployeeTableProps) {
    const columns: GridColDef<NewEmployeeInterface>[] = useMemo(
        () => [
            {
                field: 'empty',
                headerName: '',
                flex: 0.2,
                align: 'center',
                headerAlign: 'center',
                className: 'empty-column',
                headerClassName: 'empty-column-header',
                sortable: false,
            },
            {
                field: 'employee_number',
                headerName: 'Employee ID',
                flex: 0.7,
                align: 'left',
                headerAlign: 'left',
            },
            {
                field: 'name',
                headerName: 'Name',
                flex: 1,
                align: 'left',
                headerAlign: 'left',
                valueGetter: (params) => `${params.row.first_name} ${params.row.last_name}`,
            },
            {
                field: 'department',
                headerName: 'Department',
                flex: 1.1,
                align: 'left',
                headerAlign: 'left',
            },
            {
                field: 'team',
                headerName: 'Team',
                flex: 0.8,
                align: 'left',
                headerAlign: 'left',
            },
            {
                field: 'work_email',
                headerName: 'Email',
                flex: 1.4,
                align: 'left',
                headerAlign: 'left',
            },
            {
                field: 'age',
                headerName: 'Age',
                flex: 0.6,
                align: 'left',
                headerAlign: 'left',
            },
            {
                field: 'actions',
                headerName: '',
                flex: 0.7,
                sortable: false,
                filterable: false,
                align: 'center',
                headerAlign: 'center',
                className: 'actions-column',
                renderCell: (params) => <ActionsCell employeeId={params.row.employee_number} />,
            },
        ],
        []
    );

    return (
        <Box className="scrollable-x" sx={{ overflowX: 'auto' }}>
            <Box className="employee-table-container">
                <DataGrid
                    rows={data}
                    columns={columns}
                    loading={loading}
                    rowHeight={50}
                    disableSelectionOnClick
                    getRowId={(row) => row.id} 
                />
            </Box>
        </Box>
    );
}