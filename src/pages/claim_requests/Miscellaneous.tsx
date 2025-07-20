import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import SearchBox from '../../components/SearchBox';
import AddRequestButton from '../../components/AddRequestButton'
import ClaimsStatus from '../../components/ClaimsStatus';
import ClaimTable from '../../components/claimsTable/ClaimTable';
import Pagination from '../../components/Pagination';
import { useAuth } from '../../context/authContext'
import { useError } from '../../context/errorContext';
import { getClaims } from '../../services/dataServices/claimRequests';

export default function Miscellaneous() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useAuth();
    const { setError } = useError();

    const currentStatus = searchParams.get('status') || 'total';
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const [claimData, setClaimData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(totalPages)

    const fetchAllClaims = async (status: string, page: number, search: string) => {
        setIsLoading(true);
        try {
            const response = await getClaims(status, search, page);
            setClaimData(response.data);
            // setTotalPages(response.pagination?.totalPages || 1);
        } catch (error: any) {
            setError(error?.message || 'Failed to fetch claims');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAllClaims(currentStatus, currentPage, searchTerm);
    }, [currentStatus, currentPage, searchTerm, fetchAllClaims]);

    const handleStatusChange = (newStatus: string) => {
        setSearchParams({ status: newStatus, page: '1' });
    };

    const handlePageChange = (newPage: number) => {
        setSearchParams({ status: currentStatus, page: String(newPage) });
    };

    
    return (
        <Box sx={{ marginX: 3, paddingY: 3 }}>
            <Header pageName='Claim Requests / MISC. EXPENSES' />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 3, marginTop:2 ,alignItems: 'center'}}>
                <SearchBox onSearchChange={setSearchTerm} />
                <AddRequestButton path='new-request/miscellaneous'/>
             </Box>

            <Box sx={{ my: 4 }}>
                <ClaimsStatus
                    currentStatus={currentStatus}
                    onStatusChange={handleStatusChange}
                />
            </Box>

            <ClaimTable
                data={claimData}
                userRole={user?.role || "user"}
                claimType="misc"
                category="claim requests"
                loading={isLoading}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </Box>
        </Box>
    );
}