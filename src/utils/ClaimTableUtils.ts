import { USER_ROLES, CLAIM_TYPES, CLAIM_CATEGORY } from "../services/constantServices/constants";
import type { UserRole, ClaimType, ClaimCategory } from "../types";

const getClaimTableColumns = (role: UserRole, type: ClaimType, category: ClaimCategory) => {
    if (role === USER_ROLES.EMPLOYEE && type === CLAIM_TYPES.MISC && category === CLAIM_CATEGORY.HISTORY) {
        return ['date', 'purpose', 'status', 'amount', 'actions'];
    }
    else if (role === USER_ROLES.EMPLOYEE && type === CLAIM_TYPES.OUTPATIENT && category === CLAIM_CATEGORY.HISTORY) {
        return ['date', 'purpose', 'relationship', 'status', 'amount', 'actions'];
    }
    else if (role === USER_ROLES.ADMIN && type === CLAIM_TYPES.OUTPATIENT && category === CLAIM_CATEGORY.HISTORY) {
        return ['date', 'name', 'relationship', 'status', 'amount', 'actions'];
    }
    else if (role === USER_ROLES.ADMIN && type === CLAIM_TYPES.MISC && category === CLAIM_CATEGORY.HISTORY) {
        return ['date', 'name', 'purpose', 'status', 'amount', 'actions'];
    }
    else if (role === USER_ROLES.ADMIN && type === CLAIM_TYPES.OUTPATIENT && category === CLAIM_CATEGORY.REQUEST) {
        return ['date', 'name', 'relationship', 'description', 'amount', 'actions'];
    }
    else if (role === USER_ROLES.ADMIN && type === CLAIM_TYPES.MISC && category === CLAIM_CATEGORY.REQUEST) {
        return ['date', 'name', 'purpose', 'amount', 'actions'];
    }
}

export default getClaimTableColumns;