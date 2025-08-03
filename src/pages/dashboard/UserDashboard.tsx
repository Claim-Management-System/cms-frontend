import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import UserTitle from '../../components/userTitle/UserTitle';
import DetailsTable from '../../components/detailsTable/DetailsTable';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import { useAuth } from '../../context/authContext';
import { useError } from '../../context/errorContext';
import { fetchDashboardData } from '../../services/constantServices/dashboardService';
import type { DashboardData } from "../../types";

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const { setError } = useError();
  const { user } = useAuth();

  const fetchUserDashboard = async (employee_number: number) => {
    setLoading(true);
    try {
      const data = await fetchDashboardData(employee_number);
      setDashboardData(data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.employee_number) {
      fetchUserDashboard(user.employee_number);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!dashboardData) {
    return (
      <Box>
        <Header pageName="Dashboard" />
        <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>No dashboard data available.</h2>
      </Box>
    );
  }

  return (
    <Box>
      <Header pageName="Dashboard" />
      <UserTitle
        mainText={dashboardData.employeeName}
        subText={dashboardData.employeeEmail}
      />
      <DetailsTable data={dashboardData.claimDetails} />
      <h2 className='total-medical-limit'>Total Medical Limit: {dashboardData.totalLimit}</h2>
    </Box>
  );
};

export default UserDashboard;