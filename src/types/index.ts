export interface ClaimRecord {
  id: string;
  created_at: string;
  employee_name: string;
  amount: number;
  employee_number: string;
  purpose?: string;
  status?: "Accepted" | "Denied" | "Pending" | "Completed" | "Forwarded";
  claim_type?: string
  relationship?: string;
}

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
  status: 'pending' | 'approved' | 'denied';
  submitted_amount: number;
  title: string;
  updated_at: Date;
  user_id: string;
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