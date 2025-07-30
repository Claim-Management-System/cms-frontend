import React, { useState } from 'react';
import ProfileTable from '../../components/profile/ProfileTable';
import './UserProfile.css';
import Header from '../../components/Header';
import ChangePasswordPopup from '../../components/profile/ChangePasswordPopup';
import { Button } from '@mui/material';

const UserProfile = () => {
  const [showPopup, setShowPopup] = useState(false);
  // Mock data for user profile
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dob: '1990-01-01',
    joiningDate: '2020-01-15',
    role: 'employee',
    employeeType: 'permanent',
    team: 'Development',
    bankAccountNumber: '1234567890',
    employeeId: 'EMP123',
    maritalStatus: 'single',
    workLocation: 'New York',
    jobTitle: 'Software Engineer',
    position: 'Senior',
    phoneNumber: '123-456-7890',
    password: '********',
    age: '34',
  };

  const personalDetails = [
    { label: 'First Name', value: user.firstName },
    { label: 'Last Name', value: user.lastName },
    { label: 'Date of Birth', value: user.dob },
    { label: 'Onboarding Date', value: user.joiningDate },
    { label: 'Age', value: user.age },
    { label: 'Role', value: user.role },
    { label: 'Marital Status', value: user.maritalStatus },
  ];

  const jobDetails = {
    title: 'Job Details',
    details: [
      { label: 'Employee Type', value: user.employeeType },
      { label: 'Team', value: user.team },
      { label: 'Employee ID', value: user.employeeId },
      { label: 'Job Title', value: user.jobTitle },
      { label: 'Position', value: user.position },
    ],
  };

  const contactDetails = {
    title: 'Address and Contact Details',
    details: [
      { label: 'Work Location', value: user.workLocation },
      { label: 'Email', value: user.email },
      { label: 'Phone Number', value: user.phoneNumber },
      { label: 'Account Number', value: user.bankAccountNumber },
      { label: 'Password', value: user.password },
    ],
  };

  return (
    <>
    <Header pageName='User Profile' />
    <div className="user-profile-container">
      <div className="profile-header">
        <p>{`${user.firstName} ${user.lastName}`}</p>
      </div>
      <ProfileTable title="Personal Details" details={personalDetails} />
      <ProfileTable title={jobDetails.title} details={jobDetails.details} />
      <ProfileTable title={contactDetails.title} details={contactDetails.details} />
      <div className="change-password-container">
          <Button variant="contained" className="change-password-button" onClick={() => setShowPopup(true)}>
          Change Password
        </Button>
      </div>
      <ChangePasswordPopup open={showPopup} onClose={() => setShowPopup(false)} />
    </div>
    </>
  );
};

export default UserProfile;
