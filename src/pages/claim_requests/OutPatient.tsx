import ClaimRequest from '../../components/ClaimRequest';

function Outpatient() {
  return (
    <ClaimRequest
      pageTitle="Claim Requests / OPD. EXPENSES"
      apiClaimType="medical"
      tableClaimType="outpatient"
    />
  );
}

export default Outpatient;