import { useState } from 'react';
import DetailsTable from '../../components/detailsTable/DetailsTable';
import Header from '../../components/Header';
import UserTitle from '../../components/userTitle/UserTitle';
import { fetchDashboard } from '../../services/constantServices/dashboardUtils';
import { TextField, Button, Box, CircularProgress, Alert } from '@mui/material';
import './AdminDashboard.css'

const claimDetailsData = [
  {
    type: 'Internet',
    approvedAmount: '17168',
    approvedCount: 0,
    pendingAmount: '0',
    pendingCount: 0,
  },
  {
    type: 'Medical',
    approvedAmount: '62058',
    approvedCount: 0,
    pendingAmount: '0',
    pendingCount: 0,
  },
  {
    type: 'Miscellaneous',
    approvedAmount: 0,
    approvedCount: 0,
    pendingAmount: 0,
    pendingCount: 0,
  },
];

const claimDetailsColumns = [
  { key: 'type', header: 'Type' },
  { key: 'approvedAmount', header: 'Approved Claim Amount' },
  { key: 'approvedCount', header: 'Approved Count' },
  { key: 'pendingAmount', header: 'Pending Claim Amount' },
  { key: 'pendingCount', header: 'Pending Count' },
];

const AdminDashboard = () => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState(null);

  const validateEmployeeNumber = (value: string) => {
    const regex = /^\d{4}$/;
    return regex.test(value);
  };

  const handleSearch = async () => {
    if (!validateEmployeeNumber(employeeNumber)) {
      setError('Please enter a valid 4-digit employee number');
      return;
    }

    setLoading(true);
    setError('');
    setIsSearched(false);

    try {
      const data = await fetchDashboard(parseInt(employeeNumber));
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
    setEmployeeNumber(value);
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <Header pageName="Admin Dashboard" />
      <Box className="user-search-container">
        <TextField
          label="Employee ID"
          variant="outlined"
          className="employee-id-field"
          value={employeeNumber}
          onChange={handleEmployeeNumberChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter 4-digit employee number"
          error={!!error}
          helperText={error}
          inputProps={{
            maxLength: 4,
            pattern: '[0-9]{4}'
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className="search-button"
          onClick={handleSearch}
          disabled={loading || !employeeNumber}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Search'}
        </Button>
      </Box>
      
      {error && !isSearched && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {isSearched && dashboardData && (
        <>
          <UserTitle 
            mainText={dashboardData.employeeName || "Employee"} 
            subText={`Employee ID: ${employeeNumber}`} 
          />
          <DetailsTable
            title="Claim Details"
            data={claimDetailsData}
            columns={claimDetailsColumns}
          />
        </>
      )}
    </div>
  );
};

export default AdminDashboard; 