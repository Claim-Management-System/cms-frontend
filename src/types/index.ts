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