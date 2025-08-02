import { tableColumns } from '../../utils/dashboardUtils';
import type { ClaimDetail } from "../../types";
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
import './DetailsTable.css';


interface DetailsTableProps {
  data: ClaimDetail[];
}


function DetailsTable({ data }: DetailsTableProps) {

  return (
    <div className="details-table-container">
      <Typography variant="h6" className="details-table-title">
        Claim Details
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
                  <TableCell key={column.key}>{row[column.key as keyof ClaimDetail]}</TableCell>
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