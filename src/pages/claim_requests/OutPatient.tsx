import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import SearchBox from '../../components/SearchBox';
import ClaimTable from '../../components/claimsTable/ClaimTable';
import Pagination from '../../components/Pagination';
import { useAuth } from '../../context/authContext'
import { useError } from '../../context/errorContext';
import { getClaimsRequest } from '../../services/dataServices/claimsRequest';

export default function Miscellaneous() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useAuth();
    const { setError } = useError();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const [claimData, setClaimData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAllClaims = async (page: number, search: string) => {
        setIsLoading(true);
        try {
            const response = await getClaimsRequest(search, page);
            setClaimData(response.data || []);
            // setTotalPages(response.pagination?.totalPages || 1);
        } catch (error: any) {
            setError(error?.message || 'Failed to fetch claims');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAllClaims(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: String(newPage) });
    };

    
    return user?.role === 'admin' && (
        <Box sx={{ marginX: 3, paddingY: 3 }}>
            <Header pageName='Claim Requests / OPD. EXPENSES' />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 3, marginTop:2 , marginBottom: 4, alignItems: 'center'}}>
                <SearchBox onSearchChange={setSearchTerm} />
             </Box>

            <ClaimTable
                data={claimData}
                userRole="admin"
                claimType="outpatient"
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