import React, { useState } from 'react';
import UserSearch from '../../components/userSearch/UserSearch';
import DetailsTable from '../../components/detailsTable/DetailsTable';
import Header from '../../components/Header';
import UserTitle from '../../components/userTitle/UserTitle';

const AdminDashboard = () => {
  const [isSearched, setIsSearched] = useState(false);

  const claimDetailsData = [
    {
      type: 'Internet',
      approvedAmount: '17168',
      approvedCount: 0,
      pendingAmount: '0',
      pendingCount: 0,
    },
    {
      type: 'Medical',
      approvedAmount: '62058',
      approvedCount: 0,
      pendingAmount: '0',
      pendingCount: 0,
    },
    {
      type: 'Miscellaneous',
      approvedAmount: 0,
      approvedCount: 0,
      pendingAmount: 0,
      pendingCount: 0,
    },
  ];

  const claimDetailsColumns = [
    { key: 'type', header: 'Type' },
    { key: 'approvedAmount', header: 'Approved Claim Amount' },
    { key: 'approvedCount', header: 'Approved Count' },
    { key: 'pendingAmount', header: 'Pending Claim Amount' },
    { key: 'pendingCount', header: 'Pending Count' },
  ];

  const handleSearch = () => {
    setIsSearched(true);
  };

  return (
    <div>
      <Header pageName="Admin Dashboard" />
      <UserSearch onSearch={handleSearch} />
      {isSearched && (
        <>
          <UserTitle mainText="John Doe" subText="Employee ID: 12345" />
          <DetailsTable
            title="Claim Details"
            data={claimDetailsData}
            columns={claimDetailsColumns}
          />
        </>
      )}
    </div>
  );
};

export default AdminDashboard; 