interface DashboardApiData {
  ApprovedInternetClaimAmount: number;
  ApprovedInternetCount: number;
  ApprovedMedicalClaimAmount: number;
  ApprovedMedicalCount: number;
  ApprovedMiscellaneousClaimAmount: number;
  ApprovedMiscellaneousCount: number;
  PendingInternetClaimAmount: number;
  PendingInternetCount: number;
  PendingMedicalClaimAmount: number;
  PendingMedicalCount: number;
  PendingMiscellaneousClaimAmount: number;
  PendingMiscellaneousCount: number;
  TotalMedicalLimit: number;
  [key: string]: number; 
}

export const formatDashboardData = (apiData: DashboardApiData) => {
    const claimTypes = ['Internet', 'Medical', 'Miscellaneous'];

    const claimDetailsData = claimTypes.map(type => {
        return {
            type: type,
            approvedAmount: Math.round(apiData[`Approved${type}ClaimAmount`] || 0),
            approvedCount: apiData[`Approved${type}Count`] || 0,
            pendingAmount: Math.round(apiData[`Pending${type}ClaimAmount`] || 0),
            pendingCount: apiData[`Pending${type}Count`] || 0,
        };
    });

    return claimDetailsData;
}

export const tableColumns:  { key: string; header: string; }[] = [
  { key: 'type', header: 'Type' },
  { key: 'approvedAmount', header: 'Approved Claim Amount' },
  { key: 'approvedCount', header: 'Approved Count' },
  { key: 'pendingAmount', header: 'Pending Claim Amount' },
  { key: 'pendingCount', header: 'Pending Count' },
];