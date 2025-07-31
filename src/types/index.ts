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


export interface EmployeeInterface {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    joiningDate: string;
    role: 'admin' | 'employee' | '';
    employeeType: 'permanent' | 'contractual' | '';
    team: string;
    bankAccountNumber: string;
    employeeId: string;
    maritalStatus: 'single' | 'married' | 'family' | '';
    workLocation: string;
    jobTitle: string;
    position: string;
    phoneNumber: string;
    age?: number;
    password?: string;
    status: string;
    department?: string;
}

export type FieldConfig = {
    name: keyof EmployeeInterface;
    label: string;
    type: 'text' | 'email' | 'date' | 'number' | 'password' | 'select';
    required?: boolean;
    disabled?: boolean;
    options?: Array<{ value: string; label: string }>;
    specialHandling?: 'age' | 'password';
};

export interface WorkLocation {
  id: number;
  address: string;
}

export interface MaritalStatus {
  id: number;
  status: string;
}

export interface EmployeeType {
  id: number;
  type: string;
}