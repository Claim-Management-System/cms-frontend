import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Header from './Header';
import SearchBox from './SearchBox';
import AddRequestButton from './AddRequestButton';
import ClaimsStatus from './ClaimsStatus';
import Pagination from './Pagination';
import ClaimTable from './claimsTable/ClaimTable';
import { useError } from '../context/errorContext';
import { useAuth } from '../context/authContext';
import { getClaimsHistory, getEmployeeClaimsHistory, getClaimsCount } from '../services/dataServices/claimsHistory';
import formatDate from '../services/constantServices/formatDate';
import { USER_ROLES, CLAIM_CATEGORY } from '../services/constantServices/constants';
import type { ClaimRecord, ClaimCounts } from '../types';


interface ClaimHistoryProps {
  pageTitle: string;
  apiClaimType: 'miscellaneous' | 'medical';
  tableClaimType: 'miscellaneous' | 'outpatient';
  newRequestPath: string;
}

function ClaimHistory({ pageTitle, apiClaimType, tableClaimType, newRequestPath }: ClaimHistoryProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [claimData, setClaimData] = useState<ClaimRecord[]>([]);
  const [claimsCounts, setClaimsCounts] = useState<ClaimCounts>({
    total: 0,
    accepted: 0,
    denied: 0,
    pending: 0,
  });

  const { setError } = useError();
  const { user } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get('status') || 'total';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const handleStatusChange = (newStatus: string) => {
    setSearchParams({ status: newStatus, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ status: currentStatus, page: String(newPage) });
  };

  const fetchAllClaims = async () => {
    if(searchTerm.length > 0 && !/^\d{4}$/.test(searchTerm)) {
      setError('Enter 4-Digit Employee ID');
      return;
    }

    setIsLoading(true);

    try {
      let data;
      let countsData;

      if(user?.role === USER_ROLES.ADMIN && /^\d{4}$/.test(searchTerm)) {
        const employeeNumber = Number(searchTerm);

        countsData = await getClaimsCount(apiClaimType, employeeNumber);
        data = await getEmployeeClaimsHistory({
          employeeNumber: employeeNumber,
          claimType: apiClaimType,
          status: currentStatus,
          page: currentPage,
        });
      }
      else if (user?.role === USER_ROLES.ADMIN) {
        countsData = await getClaimsCount(apiClaimType);
        data = await getClaimsHistory({
          claimType: apiClaimType,
          status: currentStatus,
          page: currentPage,
        });
      }
      else {
        const employeeNumber = user?.employee_number;
        if (!employeeNumber) {
          throw Error("Employee ID not found!");
        }

        countsData = await getClaimsCount(apiClaimType, user?.employee_number);
        data = await getEmployeeClaimsHistory({
          employeeNumber: user?.employee_number,
          claimType: apiClaimType,
          status: currentStatus,
          page: currentPage,
        });
      }

      let allClaims = data.claims?.length > 0 ? formatDate(data.claims) : [];

      const counts = {
        total: countsData.approved_count + countsData.rejected_count + countsData.pending_count,
        accepted: countsData.approved_count,
        denied: countsData.rejected_count,
        pending: countsData.pending_count,
      };

      setClaimsCounts(counts);
      setClaimData(allClaims);
      setTotalPages(Math.ceil(data.totalCount / 10));

    } catch (error: any) {
      setError(error?.message || 'Failed to fetch claims');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllClaims();
  }, [currentStatus, currentPage, searchTerm, apiClaimType]);

  return (
    <Box>
      <Header pageName={pageTitle} />

      {user?.role !== USER_ROLES.EMPLOYEE && 
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 2,
            alignItems: 'center'
          }}
        >
          <SearchBox onSearchChange={setSearchTerm} />
          <AddRequestButton path={newRequestPath} />
        </Box>
      }

      <Box
        sx={{ marginY: 2 }}
      >
        <ClaimsStatus
          currentStatus={currentStatus}
          onStatusChange={handleStatusChange}
          counts={claimsCounts}
        />
      </Box>

      <ClaimTable
        data={claimData}
        userRole={user?.role === USER_ROLES.ADMIN ? USER_ROLES.ADMIN : USER_ROLES.EMPLOYEE}
        claimType={tableClaimType}
        category={CLAIM_CATEGORY.HISTORY}
        loading={isLoading}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '10px' }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};


export default ClaimHistory;