import { Button } from '@mui/material';
import { type NewEmployeeInterface } from './EmployeeTable';
import './EmployeeTable.css';

interface ActionsCellProps {
  row: NewEmployeeInterface;
}

export default function ActionsCell({ row }: ActionsCellProps) {
  const handleView = () => {
    // TODO: Implement navigation to employee details page
    console.log('View employee:', row.id);
  };

  return (
    <Button variant="contained" size="small" onClick={handleView} className='view-button'>
      View
    </Button>
  );
} 