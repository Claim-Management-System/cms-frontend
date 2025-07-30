export interface ClaimRecord {
  id: string;
  user_id: string;
  employee_name: string;
  employee_number: string;
  status: "approved" | "rejected" | "pending";
  description?: string;
  purpose?: string;
  claim_type?: string
  relationship?: string;
  submitted_amount: number;
  created_at: string;
}

export interface ClaimCounts {
  total: number;
  accepted: number;
  denied: number;
  pending: number;
}

export type UserRole = 'admin' | 'user';
export type ClaimCategory = 'claim history' | 'claim requests';
export type ClaimType = 'miscellaneous' | 'outpatient';

export type Role = 'admin' | 'employee';
export type EmployeeType = 'permanent' | 'contractual';
export type MaritalStatus = 'single' | 'married' | 'family';

export interface EmployeeInterface {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    joiningDate: string;
    role: Role | '';
    employeeType: EmployeeType | '';
    team: string;
    bankAccountNumber: string;
    employeeId: string;
    maritalStatus: MaritalStatus | '';
    workLocation: string;
    jobTitle: string;
    position: string;
    phoneNumber: string;
    age?: number;
    password?: string;
}