import React, { useState } from 'react';
import './AdminDashboard.css';
import UserSearch from '../../components/userSearch/UserSearch';
import DetailsTable from '../../components/detailsTable/DetailsTable';
import Header from '../../components/Header';

const AdminDashboard = () => {
  const [isSearched, setIsSearched] = useState(false);

  const internetClaimData = [
    { description: 'Approved Internet Claims', amount: '17168' },
    { description: 'Pending Internet Claims', amount: '0' },
  ];

  const medicalClaimData = [
    { description: 'Approved Medical Claims', amount: '62058' },
    { description: 'Pending Medical Claims', amount: '0' },
  ];

  const medicalLimitData = [
    { description: 'Medical Limit', amount: '116667' },
    { description: 'Consumed Medical Amount', amount: '62058' },
    { description: 'Remaining Amount', amount: '54609' },
  ];

  const handleSearch = () => {
    setIsSearched(true);
  };

  return (
    <div>
      <Header pageName='Admin Dashboard' />
      <UserSearch onSearch={handleSearch} />
      {isSearched && (
        <>
          <div className="employee-details">
            <p>Employee ID: 12345</p>
            <p>Employee Name: John Doe</p>
          </div>
          <DetailsTable title="Internet Claim Details" data={internetClaimData} />
          <DetailsTable title="Medical Claim Details" data={medicalClaimData} />
          <DetailsTable title="Medical Limit Details" data={medicalLimitData} />
        </>
      )}
    </div>
  );
};

export default AdminDashboard; 