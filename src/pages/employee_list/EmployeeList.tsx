import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import SearchBox from '../../components/SearchBox';
import EmployeeTable from '../../components/employeeTable/EmployeeTable';
import type { NewEmployeeInterface } from '../../components/employeeTable/EmployeeTable';
import DownloadCSVButton from '../../components/employeeTable/DownloadCSVButton';
import './EmployeeList.css';

function EmployeeList() {

    const dummyData: NewEmployeeInterface[] = [
        {
            "id": 15,
            "employee_number": 1015,
            "employee_type_id": 1,
            "work_location_id": 15,
            "marital_status_id": 1,
            "first_name": "Liam",
            "last_name": "Gupta",
            "job_title": "Software Engineer",
            "position": "Mid-level Developer",
            "age": 28,
            "onboarding_date": "2021-11-15",
            "date_of_birth": "1996-09-08",
            "team": "Gamma",
            "department": "Engineering",
            "work_email": "liam.gupta@example.com",
            "primary_email": "liam.g@personal.com",
            "primary_number": "+917778889990",
            "bank_account_number": "6060707080",
            "created_at": "2025-07-12T12:18:17Z",
            "updated_at": "2025-07-12T12:18:17Z"
        },
        {
            "id": 70,
            "employee_number": 9999,
            "employee_type_id": 2,
            "work_location_id": 1,
            "marital_status_id": 1,
            "first_name": "Muhaib",
            "last_name": "Shamsher",
            "job_title": "Software Engineer",
            "position": "Intern",
            "age": 21,
            "onboarding_date": "2025-06-12",
            "date_of_birth": "2004-01-03",
            "team": "Frontend",
            "department": "Product Development",
            "work_email": "muhaib.shamsher@gmail.com",
            "primary_number": "03448976342",
            "bank_account_number": "999-99999999999-999",
            "created_at": "2025-07-31T21:11:50Z",
            "updated_at": "2025-07-31T21:11:50Z"
        }
    ]
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            <Box sx={{ marginX: 3 }}>
                <Header pageName="Employee List" />
            </Box>
            <Box className='search-box-container'>
                <SearchBox onSearchChange={setSearchTerm} />
                <DownloadCSVButton path="" />
            </Box>
            <EmployeeTable data={dummyData} loading={false} />
        </>
    );
}

export default EmployeeList;