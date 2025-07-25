import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useError } from '../../context/errorContext';
import { getClaim } from '../../services/dataServices/claimsHistory';

function Viewmore() {
  const { claimId } = useParams();
  const { setError } = useError();

  const fetchClaim = async (claimId: string) => {
    try {
      const response = await getClaim(claimId)
      console.log(response)
    } catch (error: any) {
      setError(error?.message || 'Failed to fetch claims');
    }
  }

  useEffect(() => {
    fetchClaim(claimId!)
  }, [claimId])

  return (
    <div>
      <h1>Claim History</h1>
      <p>Showing claims for Claim ID: <strong>{claimId}</strong></p>
    </div>
  );
}

export default Viewmore;