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

export interface ClaimCounts {
  total: number;
  accepted: number;
  denied: number;
  pending: number;
}