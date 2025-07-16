import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'
import SearchBox from '../../components/SearchBox'
import AddRequestButton from '../../components/AddRequestButton'
import ClaimsStatus from '../../components/ClaimsStatus'
import ClaimTable from '../../components/claimsTable/ClaimTable'
import Pagination from '../../components/Pagination'
import { useError } from '../../context/errorContext';
import { getClaims } from '../../services/dataServices/claimRequests'
import { useAuth } from '../../context/authContext'

export default function Miscellaneous() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [claimData, setClaimData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { setError } = useError();
    const { user } = useAuth();

    // const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

    const fetchAllClaims = async () => {
        setIsLoading(true);
        try {
            const data = await getClaims(searchTerm, currentPage);
            setClaimData(data);
        } catch (error: any) {
            setError(error?.message || 'Failed to fetch claims');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllClaims();
    }, [currentPage, searchTerm]);

    return (
        <Box sx={{ marginX: 3 }}>
            <Header pageName='Claim Requests / MISC. EXPENSES' />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 3, marginTop:2 ,alignItems: 'center'}}>
                <SearchBox onSearchChange={setSearchTerm} />
                <AddRequestButton />
            </Box>

            <Box sx={{ paddingX: 3, marginY: 4}}>
                <ClaimsStatus />
            </Box>

            <ClaimTable
                data={claimData}
                userRole={user?.role || "user"}
                claimType="misc"
                category="claim history"
                loading={isLoading}
            />

            <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
        </Box>
    )
}