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

export type UserRole = 'admin' | 'user' | 'employee';
export type ClaimCategory = 'claim history' | 'claim requests';
export type ClaimType = 'miscellaneous' | 'outpatient';

export type FormType =
    | "MISCELLANEOUS EXPENSE FORM"
    | "OUT PATIENT EXPENSE FORM";

export interface FormData {
  title: string;
  itemTypeId: string;
  description: string;
  relationship: string;
  totalAmount: number;
}

export type newAddRequest = {
  user_id: string,
  employee_number: number,
  claim_type_id: string,
  title: string,
  description: string,
  relationship: string,
  submitted_amount: number,
  month: string,
  images: File[]
}

export interface Claim {
  approved_amount: number;
  claim_type: string;
  claim_type_id: number;
  created_at: string;
  description: string;
  employee_number: number;
  id: number;
  image_hash: string;
  month: string;
  purpose_of_visit: string;
  relationship: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_amount: number;
  title: string;
  updated_at: Date;
  user_id: string;
  reason_for_edit?: string;
  reason_for_rejection?: string;
}

export interface Employee {
  age: number;
  bank_account_number: string;
  created_at: string; // Or Date if you plan to parse it
  date_of_birth: string; // Or Date
  department: string;
  employee_number: number;
  employee_type_id: number;
  first_name: string;
  id: number;
  job_title: string;
  last_name: string;
  marital_status_id: number;
  onboarding_date: string; // Or Date
  position: string;
  primary_email: string;
  primary_number: string;
  team: string;
  updated_at: string; // Or Date
  work_email: string;
  work_location_id: number;
}


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
    userId?: string;
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

export interface ProfileDetail {
  label: string;
  value: string | number;
}

export interface ProfileSection {
  title: string;
  details: ProfileDetail[];
}

export interface ClaimDetail {
  type: string;
  approvedAmount: number;
  approvedCount: number;
  pendingAmount: number;
  pendingCount: number;
}

export interface DashboardData {
  claimDetails: ClaimDetail[];
  totalLimit: number;
  employeeName: string;
  employeeEmail: string;
}