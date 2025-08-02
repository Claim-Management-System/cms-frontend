import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileTable from '../../components/profile/ProfileTable';
import UserTitle from '../../components/userTitle/UserTitle';
import Header from '../../components/Header';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import { fetchProfile } from '../../utils/userProfileUtils';
import { useError } from '../../context/errorContext';
import type { ProfileSection } from '../../types';
import './EmployeeProfile.css';


const EmployeeProfile = () => {
    const [employeeDetails, setEmployeeDetails] = useState<ProfileSection[]>([]);
    const [employeeName, setEmployeeName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true)

    const { employeeId } = useParams();
    const { setError } = useError();

    const fetchEmployeeProfileDetails = async (employeeId: number) => {
        setLoading(true)

        try {
            const data: ProfileSection[] = await fetchProfile(employeeId)
            setEmployeeName(`${data[0].details[0].value} ${data[0].details[1].value}`)
            setEmployeeDetails(data)
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(employeeId) {
            fetchEmployeeProfileDetails(Number(employeeId))
        } else {
            setError('Employee ID not exists!')
        }
    }, [employeeId])


    return !loading ? (
        <>
            <Header pageName='User Profile' />
            <div className="user-profile-container">
                <UserTitle mainText={employeeName} subText={`Employee ID: ${employeeId}`} />
                {employeeDetails.map(employeeDetail => (
                    <ProfileTable
                        key={employeeDetail.title}
                        title={employeeDetail.title}
                        details={employeeDetail.details}
                    />
                ))}
            </div>
        </>
    ) : (
        <LoadingScreen />
    )
};

export default EmployeeProfile;