import { getClaim, getClaimImages } from '../services/dataServices/claimsHistory';
import { getEmployee } from '../services/dataServices/employee';
import { BOUNDARY } from '../services/constantServices/constants';
import parseMultipartImages from '../services/constantServices/parseMultiPartImages';

interface ClaimDetailsCache {
  claimData: any;
  claimImages: string[];
  employeeData: any;
}

const cachedClaimDetails: { [key: string]: ClaimDetailsCache } = {};

export const getClaimDetails = async (claimId: string, update?: boolean): Promise<ClaimDetailsCache> => {
    if (cachedClaimDetails[claimId] && !update) {
        return cachedClaimDetails[claimId];
    }

    try {
        const data = await getClaim(claimId);
        const claim = data.claims;

        const [rawImagesData, employee] = await Promise.all([
            getClaimImages(Number(claimId)),
            getEmployee(claim.employee_number)
        ]);

        const imageUrls = parseMultipartImages(rawImagesData, BOUNDARY);

        const result = {
            claimData: claim,
            claimImages: imageUrls,
            employeeData: employee
        };
        
        cachedClaimDetails[claimId] = result;
        return result;
        
    } catch (error) {
        throw error;
    }
};