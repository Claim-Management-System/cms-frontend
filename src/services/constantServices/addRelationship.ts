import { type ClaimRecord } from '../../types';

const addRelationship = (claimsData: ClaimRecord[]): ClaimRecord[] => {

    return claimsData.map(claim => {
        const relationship = claim.claim_type?.split('-')[1]

        return { ...claim, relationship}
    });
}

export default addRelationship;