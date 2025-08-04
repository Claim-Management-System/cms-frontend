import { useEffect, useState } from 'react';
import ProfileTable from '../../components/profile/ProfileTable';
import UserTitle from '../../components/userTitle/UserTitle';
import Header from '../../components/Header';
import ChangePasswordPopup from '../../components/profile/ChangePasswordPopup';
import { fetchProfile } from '../../utils/userProfileUtils';
import { useAuth } from '../../context/authContext';
import { useError } from '../../context/errorContext';
import { Button } from '@mui/material';
import { USER_ROLES } from '../../services/constantServices/constants';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import type { ProfileSection } from '../../types';
import './UserProfile.css';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState<ProfileSection[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true)

  const { user } = useAuth();
  const { setError } = useError();

  useEffect(() => {
    const fetchUserProfileDetails = async () => {
      setLoading(true);

      try {
        const data: ProfileSection[] = await fetchProfile(user?.employee_number!)
        setUserDetails(data)
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfileDetails()
  }, [])


  return !loading ? (
    <>
      <Header pageName={ user?.role === USER_ROLES.EMPLOYEE ? 'User Profile' : 'Admin Profile'} />

      <div className="user-profile-container">
        <UserTitle mainText={user?.employee_name!} subText={`Employee ID: ${user?.employee_number!}`} />
        {userDetails.map(userDetail => (
          <ProfileTable 
            key={userDetail.title} 
            title={userDetail.title} 
            details={userDetail.details} 
          />
        ))}
        <div className="change-password-container">
          <Button variant="contained" className="change-password-button" onClick={() => setShowPopup(true)}>
            Change Password
          </Button>
        </div>
        <ChangePasswordPopup open={showPopup} onClose={() => setShowPopup(false)} />
      </div>
    </>
  ) : (
    <LoadingScreen />
  )
};

export default UserProfile;