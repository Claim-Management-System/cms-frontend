import ClaimHistory from "../../components/ClaimHistory";

function Miscellaneous() {
  return (
    <ClaimHistory
      pageTitle="Claim History / MISC. EXPENSES"
      apiClaimType="miscellaneous"
      tableClaimType="miscellaneous"
      newRequestPath="/new-request/miscellaneous"
    />
  );
};

export default Miscellaneous