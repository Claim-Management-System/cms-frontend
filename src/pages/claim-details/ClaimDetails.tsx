import { useParams } from 'react-router-dom';

// this is a the dummy page, all the logic and UI rendrinng for this page will be in the next PR
function ClaimDetails() {
    const { claimId } = useParams();

  return (
    <div>
        <p>Showing claims for Claim ID: <strong>{claimId}</strong></p>
    </div>
  )
}

export default ClaimDetails