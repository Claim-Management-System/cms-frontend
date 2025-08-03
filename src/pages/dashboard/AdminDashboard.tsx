import { useState } from 'react';
import Header from '../../components/Header';
import UserTitle from '../../components/userTitle/UserTitle';
import DetailsTable from '../../components/detailsTable/DetailsTable';
import { useError } from '../../context/errorContext'; 
import { fetchDashboardData } from '../../services/constantServices/dashboardService';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import type { DashboardData } from "../../types";
import './Dashboard.css'


function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | undefined>(undefined);
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setError } = useError();

  const handleSearch = async () => {
    setLoading(true);
    setIsSearched(false);

    try {
      const data = await fetchDashboardData(parseInt(employeeNumber));
      setDashboardData(data);
      setIsSearched(true);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch dashboard data');
      setIsSearched(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      if (value.length <= 4) {
        setEmployeeNumber(value);
      } else {
        setError("Employee Number should be of 4-digit")
      }
    }
  };

  return (
    <Box>
      <Header pageName="Admin Dashboard" />
      <Box className="user-search-container">
        <TextField
          className="employee-id-field"
          label="Employee ID"
          variant="outlined"
          type="text"
          value={employeeNumber}
          onChange={handleEmployeeNumberChange}
          placeholder="Enter 4-digit Employee ID"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          inputProps={{
            pattern: '\\d{4}',
            inputMode: 'numeric',
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className="search-button"
          onClick={handleSearch}
          disabled={loading || employeeNumber.length < 4}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Search'}
        </Button>
      </Box>

      {isSearched && dashboardData && (
        <>
          <UserTitle
            mainText={dashboardData.employeeName}
            subText={dashboardData.employeeEmail}
          />
          <DetailsTable data={dashboardData.claimDetails} />
          <h2 className='total-medical-limit'>Total Medical Limit: {dashboardData.totalLimit}</h2>
        </>
      )}
    </Box>
  );
};

export default AdminDashboard;