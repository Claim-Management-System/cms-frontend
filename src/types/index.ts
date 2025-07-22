export interface ClaimRecord {
  id: string;
  created_at: string;
  name: string;
  amount: number;
  employee_number: string;
  purpose?: string;
  status?: "Accepted" | "Denied" | "Pending" | "Completed" | "Forwarded";
  relationship?: string;
}