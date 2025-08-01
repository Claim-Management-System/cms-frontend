import DetailsTable from '../../components/detailsTable/DetailsTable';
import Header from '../../components/Header';
import UserTitle from '../../components/userTitle/UserTitle';
// import './UserDashboard.css';

const UserDashboard = () => {
  const apiData = {
    "ApprovedInternetClaimAmount": 0,
    "ApprovedInternetCount": 0,
    "ApprovedMedicalClaimAmount": 0,
    "ApprovedMedicalCount": 0,
    "ApprovedMiscellaneousClaimAmount": 55,
    "ApprovedMiscellaneousCount": 2,
    "PendingInternetClaimAmount": 0,
    "PendingInternetCount": 0,
    "PendingMedicalClaimAmount": 0,
    "PendingMedicalCount": 0,
    "PendingMiscellaneousClaimAmount": 58333329,
    "PendingMiscellaneousCount": 6,
    "TotalMedicalLimit": 41666.666666666664
  };

  const claimDetailsData = [
    {
        type: 'Internet',
        approvedAmount: apiData.ApprovedInternetClaimAmount,
        approvedCount: apiData.ApprovedInternetCount,
        pendingAmount: apiData.PendingInternetClaimAmount,
        pendingCount: apiData.PendingInternetCount,
    },
    {
        type: 'Medical',
        approvedAmount: apiData.ApprovedMedicalClaimAmount,
        approvedCount: apiData.ApprovedMedicalCount,
        pendingAmount: apiData.PendingMedicalClaimAmount,
        pendingCount: apiData.PendingMedicalCount,
    },
    {
        type: 'Miscellaneous',
        approvedAmount: apiData.ApprovedMiscellaneousClaimAmount,
        approvedCount: apiData.ApprovedMiscellaneousCount,
        pendingAmount: apiData.PendingMiscellaneousClaimAmount,
        pendingCount: apiData.PendingMiscellaneousCount,
    }
  ];

  const claimDetailsColumns = [
    { key: 'type', header: 'Type' },
    { key: 'approvedAmount', header: 'Approved Claim Amount' },
    { key: 'approvedCount', header: 'Approved Count' },
    { key: 'pendingAmount', header: 'Pending Claim Amount' },
    { key: 'pendingCount', header: 'Pending Count' },
  ];

  return (
    <div>
      <Header pageName="User Dashboard" />
      <UserTitle mainText="Jane Smith" subText="Employee ID: 67890" />
      <DetailsTable title="Claim Details" data={claimDetailsData} columns={claimDetailsColumns} />
    </div>
  );
};

export default UserDashboard; 