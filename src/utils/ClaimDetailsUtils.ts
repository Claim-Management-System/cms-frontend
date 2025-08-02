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

export const getClaimDetails = async (claimId: string): Promise<ClaimDetailsCache> => {
    if (cachedClaimDetails[claimId]) {
        return cachedClaimDetails[claimId];
    }

    try {
        const data = await getClaim(claimId);
        const rawImagesData = await getClaimImages(Number(claimId));
        const imageUrls = parseMultipartImages(rawImagesData, BOUNDARY);
        const employee = await getEmployee(data.claims.employee_number);

        const result = {
            claimData: data.claims,
            claimImages: imageUrls,
            employeeData: employee
        };
        
        cachedClaimDetails[claimId] = result;
        return result;
        
    } catch (error) {
        throw error;
    }
};