import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'
import SearchBox from '../../components/SearchBox'
import ClaimTable from '../../components/claimsTable/ClaimTable'
import Pagination from '../../components/Pagination'
import { useError } from '../../context/errorContext';
import { getClaims } from '../../services/dataServices/claimRequests'

export default function OutPatient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [claimData, setClaimData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { setError } = useError();

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
            <Header pageName='Claim Requests / OPD. EXPENSES' />

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingX: 3, marginBottom: 3 }}>
                <SearchBox onSearchChange={setSearchTerm} />
            </Box>

            <ClaimTable
                data={claimData}
                userRole="admin"
                claimType="outpatient"
                category="claim requests"
                loading={isLoading}
            />

            <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
        </Box>
    )
}