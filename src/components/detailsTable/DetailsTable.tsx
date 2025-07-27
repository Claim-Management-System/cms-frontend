import React from 'react';
import './DetailsTable.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

interface DetailsTableProps {
  title: string;
  data: {
    description: string;
    amount: string;
  }[];
}

const DetailsTable: React.FC<DetailsTableProps> = ({ title, data }) => {
  return (
    <div className="details-table-container">
      <Typography variant="h6" className="details-table-title">
        {title}
      </Typography>
      <TableContainer component={Paper} className="details-table-paper">
        <Table>
          <TableHead className="details-table-head">
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailsTable;
