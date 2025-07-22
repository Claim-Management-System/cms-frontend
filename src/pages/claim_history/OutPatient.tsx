import ClaimHistory from "../../components/ClaimHistory";

function OutPatient() {
  return (
    <ClaimHistory
      pageTitle="Claim History / OPD. EXPENSES"
      apiClaimType="medical"
      tableClaimType="outpatient"
      newRequestPath="/new-request/outpatient"
    />
  );
};

export default OutPatient