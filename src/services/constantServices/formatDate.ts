import type { ClaimRecord } from "../../components/claimsTable/ClaimTable";

const formatDate = (claimsData: ClaimRecord[]): ClaimRecord[] => {

    return claimsData.map(claim => {
        const date = new Date(claim.created_at).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })

        return { ...claim, created_at: date}
    });
}

export default formatDate;