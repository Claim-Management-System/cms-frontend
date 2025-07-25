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
    | "OUT PATIENT CLAIM FORM";

export interface MiscFormData {
    title: string;
    itemTypeId: string;
    description: string;
    totalAmount: number;
}

export interface OpdFormData {
    title: string;
    patientName: string;
    relationship: string;
    purposeOfVisit: string;
    expenseType: string;
    totalAmount: number;
}

export type newAddRequest = {
  user_id: string,
  employee_number: number,
  claim_type_id: string,
  title: string,
  description: string,
  purpose_of_visit?: string,
  relationship: string,
  submitted_amount: number,
  month: string,
  images: File[]
}