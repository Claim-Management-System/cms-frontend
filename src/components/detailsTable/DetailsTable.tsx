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
  data: Record<string, string>[];
  columns?: {
    key: string;
    header: string;
  }[];
}

const DetailsTable: React.FC<DetailsTableProps> = ({ title, data, columns }) => {
  const tableColumns =
    columns || [
      { key: 'description', header: 'Description' },
      { key: 'amount', header: 'Amount' },
    ];
  return (
    <div className="details-table-container">
      <Typography variant="h6" className="details-table-title">
        {title}
      </Typography>
      <TableContainer component={Paper} className="details-table-paper">
        <Table>
          <TableHead className="details-table-head">
            <TableRow>
              {tableColumns.map(column => (
                <TableCell key={column.key}>{column.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {tableColumns.map(column => (
                  <TableCell key={column.key}>{row[column.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailsTable;
