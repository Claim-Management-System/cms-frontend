import React from 'react';
import DetailsTable from '../../components/detailsTable/DetailsTable';
import Header from '../../components/Header';
import './UserDashboard.css';

const UserDashboard = () => {
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

  const overallClaimData = [
    { status: 'Pending Claims', number: '10' },
    { status: 'Denied Claims', number: '2' },
    { status: 'Accepted Claims', number: '30' },
  ];

  const overallClaimColumns = [
    { key: 'status', header: 'Claim Status' },
    { key: 'number', header: 'Number' },
  ];

  return (
    <div>
      <Header pageName="User Dashboard" />
      <div className="employee-details">
        <p>Employee ID: 67890</p>
        <p>Employee Name: Jane Smith</p>
      </div>
      <DetailsTable title="Internet Claim Details" data={internetClaimData} />
      <DetailsTable title="Medical Claim Details" data={medicalClaimData} />
      <DetailsTable title="Medical Limit Details" data={medicalLimitData} />
      <DetailsTable title="Overall Claim Details" data={overallClaimData} columns={overallClaimColumns} />
    </div>
  );
};

export default UserDashboard; 