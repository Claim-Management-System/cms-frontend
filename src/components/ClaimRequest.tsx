import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './Header';
import SearchBox from './SearchBox';
import ClaimTable from './claimsTable/ClaimTable';
import Pagination from './Pagination';
import formatDate from '../services/constantServices/formatDate';
import addRelationship from '../services/constantServices/addRelationship';
import { useError } from '../context/errorContext';
import { getClaimsRequest } from '../services/dataServices/claimsRequest';
import { CLAIM_TYPES } from '../services/constantServices/constants';
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
        setIsLoading(true);
        try {
            const data = await getClaimsRequest({ claimType: apiClaimType, search, page });
            let allClaims = data.claims?.length > 0 ? formatDate(data.claims) : [];

            // TODO: This is a temporary function. Replace with actual logic once the backend provides the 'relationship' field.
            if (apiClaimType === CLAIM_TYPES.OPD) {
                allClaims = addRelationship(allClaims)
            }

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

export default ClaimRequest