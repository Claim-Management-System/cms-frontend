import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './EmployeeTable.css';

interface ActionsCellProps {
  employeeId: number | string;
}

export default function ActionsCell({ employeeId }: ActionsCellProps) {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      size="small"
      onClick={() => navigate(`/employee-profile/${employeeId}`)}
      className='view-button'
    >
      View
    </Button>
  );
}