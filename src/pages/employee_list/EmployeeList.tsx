import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useError } from '../../context/errorContext';
import Header from '../../components/Header';
import SearchBox from '../../components/SearchBox';
import Pagination from '../../components/Pagination';
import EmployeeTable from '../../components/employeeTable/EmployeeTable';
import { getAllEmployees } from '../../services/dataServices/employee';
import { Box } from '@mui/material';
import './EmployeeList.css';


function EmployeeList() {
    const [employeesData, setEmployeesData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const { setError } = useError();

    const fetchEmployeesData = async (page: number, search: string) => {
        setIsLoading(true);
        try {
            const responseData = await getAllEmployees(page, search);
            const formattedData = Array.isArray(responseData.employees) ? responseData.employees : [responseData];
            setEmployeesData(formattedData);
            setTotalPages(Math.ceil(responseData.totalCount / 10));
        } catch (error: any) {
            setError(error?.message || 'Failed to fetch claims');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployeesData(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: String(newPage) });
    };


    return (
        <>
            <Box sx={{ marginX: 3 }}>
                <Header pageName="Employee List" />
            </Box>

            <Box className='search-box-container'>
                <SearchBox onSearchChange={setSearchTerm} placeholder="Enter 4-digit Employee ID" />
            </Box>

            <EmployeeTable
                data={employeesData}
                loading={isLoading}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </Box>
        </>
    );
}

export default EmployeeList;