import React from 'react';
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';
import './ActionButton.css';

interface ActionButtonProps extends Omit<MuiButtonProps, 'onClick' | 'children'> {
  className?: string;
  handleEvent: (event: React.MouseEvent<HTMLButtonElement>) => void;
  placeholder: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  className,
  handleEvent,
  placeholder,
  ...rest
}) => {
  return (
    <MuiButton
      className={className}
      onClick={handleEvent}
      {...rest}
    >
      {placeholder}
    </MuiButton>
  );
};

export default ActionButton;
