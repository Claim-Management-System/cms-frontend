import ClaimHistory from "../../components/ClaimHistory";

function Miscellaneous() {
  return (
    <ClaimHistory
      pageTitle="Claim Requests / MISC. EXPENSES"
      apiClaimType="miscellaneous"
      tableClaimType="miscellaneous"
      newRequestPath="/new-request/miscellaneous"
    />
  );
};

export default Miscellaneous