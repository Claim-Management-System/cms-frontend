import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import './AddEmployeeButtons.css';

type AddEmployeeButtonsProps = {
  onCancel: () => void;
};

const AddEmployeeButtons: React.FC<AddEmployeeButtonsProps> = ({ onCancel }) => {
  return (
    <div className="form-actions">
      <button type="button" className="cancel-btn" onClick={onCancel}>
        Cancel
        <BlockIcon sx={{ fontSize: 16, marginLeft: '8px' }} />
      </button>
      <button type="submit" className="submit-btn">
        Submit
        <DoneIcon sx={{ fontSize: 16, marginLeft: '8px' }} />
      </button>
    </div>
  );
};

export default AddEmployeeButtons; 