import { Box } from "@mui/material";
import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <Box 
      sx={{
        display: "flex", 
        alignItems: "center", 
        paddingX: 3, 
        paddingY: 2, 
        position: "fixed", 
        right: "2vw", 
        bottom: "2vw"
      }}
    >
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(_, pg) => onPageChange(pg)}
        color="primary"
        shape="rounded"
        siblingCount={0}
        boundaryCount={2}
      />
    </Box>
  );
}

export default Pagination;