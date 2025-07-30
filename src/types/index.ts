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