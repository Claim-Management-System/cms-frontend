import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './Header';
import SearchBox from './SearchBox';
import ClaimTable from './claimsTable/ClaimTable';
import Pagination from './Pagination';
import formatDate from '../services/constantServices/formatDate';
import { useError } from '../context/errorContext';
import { getClaimsRequest, getEmployeeClaimsRequest } from '../services/dataServices/claimsRequest';
import { type ClaimRecord } from '../types';
import { Box } from '@mui/material';


interface ClaimRequestProps {
    pageTitle: string;
    apiClaimType: 'miscellaneous' | 'medical';
    tableClaimType: 'miscellaneous' | 'outpatient';
}

function ClaimRequest({ pageTitle, apiClaimType, tableClaimType }: ClaimRequestProps) {
    const [claimData, setClaimData] = useState<ClaimRecord[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const { setError } = useError();

    const fetchAllClaims = async (page: number, search: string) => {
        if (searchTerm.length > 0 && !/^\d{4}$/.test(searchTerm)) {
            setError("The employee ID should be of 4-Digits");
            return;
        }

        setIsLoading(true);
        try {
            let data;

            if (search.length) {
                data = await getEmployeeClaimsRequest(apiClaimType, search, page)
            } else {
                data = await getClaimsRequest({ claimType: apiClaimType, page });
            }

            let allClaims = data.claims?.length > 0 ? formatDate(data.claims) : [];

            setClaimData(allClaims);
            setTotalPages(Math.ceil(data.totalCount / 10));
        } catch (error: any) {
            setError(error?.message || 'Failed to fetch claims');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllClaims(currentPage, searchTerm);
    }, [currentPage, searchTerm, apiClaimType]);

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: String(newPage) });
    };

    return (
        <Box sx={{ marginX: 3 }}>
            <Header pageName={pageTitle} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 3, marginTop: 2, marginBottom: 4, alignItems: 'center' }}>
                <SearchBox onSearchChange={setSearchTerm} />
            </Box>

            <ClaimTable
                data={claimData}
                userRole="admin"
                claimType={tableClaimType}
                category="claim requests"
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
}

export default ClaimRequest