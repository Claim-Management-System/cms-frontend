import { useNavigate } from 'react-router-dom';
import ActionButton from '../actionButton/ActionButton';
import './EmployeeTable.css';

interface ActionsCellProps {
  employeeId: number | string;
}

export default function ActionsCell({ employeeId }: ActionsCellProps) {
  const navigate = useNavigate();

  return (
    <ActionButton
      size="small"
      handleEvent={() => navigate(`/employee-profile/${employeeId}`)}
      className='view-button primary-button'
      placeholder='View'
    />
  );
}
