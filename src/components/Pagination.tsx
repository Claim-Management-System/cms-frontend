import { Box } from "@mui/material";
import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  
    const handlePageChange = (event: unknown, newPage: number) => {
      onPageChange(newPage)
    }

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
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        siblingCount={0}
        boundaryCount={2}
        sx={{
          '& .Mui-selected': {
            backgroundColor: '#1CA8DD',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1785b0',
            },
          },
        }}
      />
    </Box>
  );
}