import React from 'react';
import ProfileTable from '../../components/profile/ProfileTable';
import './UserProfile.css';
import Header from '../../components/Header';

const UserProfile = () => {
  // Mock data for user profile
  const user = {
    firstName: 'Taha',
    lastName: 'Munawar',
    jobTitle: 'Software Engineer',
    position: 'Senior Developer',
    age: 28,
    dob: '1996-08-25',
    onboardingDate: '2021-06-01',
    employmentType: 'Full-time',
    department: 'Engineering',
    team: 'Platform',
    email: 'taha.munawar@securiti.ai',
    workLocation: 'Remote',
    address: '123 Tech Lane, Silicon Valley, CA',
    contactNumber: '+1 234 567 8900',
  };

  const personalDetails = [
    { label: 'First Name', value: user.firstName },
    { label: 'Last Name', value: user.lastName },
    { label: 'Job Title', value: user.jobTitle },
    { label: 'Position', value: user.position },
    { label: 'Age', value: user.age.toString() },
    { label: 'Date of Birth', value: user.dob },
    { label: 'Onboarding Date', value: user.onboardingDate },
  ];

  const jobDetails = {
    title: 'Job Details',
    details: [
      { label: 'Employment Type', value: user.employmentType },
      { label: 'Department', value: user.department },
      { label: 'Team', value: user.team },
      { label: 'Email', value: user.email },
      { label: 'Work Location', value: user.workLocation },
    ],
  };

  const contactDetails = {
    title: 'Address and Contact Details',
    details: [
      { label: 'Address', value: user.address },
      { label: 'Contact Number', value: user.contactNumber },
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
    </div>
    </>
  );
};

export default UserProfile;
