export const BASE_URL = "https://claim-management-336ef680a3ee.herokuapp.com/static/";

export const USER_ROLES = Object.freeze({
    ADMIN: 'admin',
    USER: 'user'
});

export const CLAIM_TYPES = Object.freeze({
    MISC: 'miscellaneous',
    OPD: 'medical'
});

export const STATUS = Object.freeze({
  APPROVED: 'approved',
  PENDING: 'pending',
  REJECTED: 'rejected',
});

export const IMAGE_MODE = Object.freeze({
  UPLOAD: 'upload',
  VIEW: 'view'
})
