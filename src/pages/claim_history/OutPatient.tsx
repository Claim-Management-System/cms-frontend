import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header'
import SearchBox from '../../components/SearchBox'
import ClaimsStatus from '../../components/ClaimsStatus'
import ClaimTable from '../../components/claimsTable/ClaimTable'
import Pagination from '../../components/Pagination'
import { useError } from '../../context/errorContext';
import { getClaimsHistory } from '../../services/dataServices/claimsHistory'
import { useAuth } from '../../context/authContext'
import AddRequestButton from '../../components/AddRequestButton'


export default function OutPatient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [claimData, setClaimData] = useState([])
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    
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
        setIsLoading(true);
        try {
            const response = await getClaimsHistory(currentStatus, searchTerm, currentPage);
            setClaimData(response.data || []);
            // setTotalPages(response.pagination?.totalPages || 1)
        } catch (error: any) {
            setError(error?.message || 'Failed to fetch claims');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllClaims();
    }, [currentStatus, currentPage, searchTerm]);


    return (
        <Box sx={{ marginX: 3 }}>
            <Header pageName='Claim History / OPD. EXPENSES' />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 3, marginTop: 2, alignItems: 'center' }}>
                <SearchBox onSearchChange={setSearchTerm} />
                <AddRequestButton path='/new-request/outpatient' />
            </Box>

            <Box sx={{ paddingX: 3, marginY: 4 }}>
                <ClaimsStatus
                    currentStatus={currentStatus}
                    onStatusChange={handleStatusChange}
                />
            </Box>

            <ClaimTable
                data={claimData}
                userRole={user?.role || "user"}
                claimType="outpatient"
                category="claim history"
                loading={isLoading}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </Box>
    )
}