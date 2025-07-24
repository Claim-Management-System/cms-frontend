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
    itemType: string;
    otherItemType?: string; // NEW: To store the custom value for "Other"
    description: string;
    totalAmount: string;
}

export interface OpdFormData {
    title: string;
    patientName: string;
    relationship: string;
    purposeOfVisit: string;
    otherPurposeOfVisit?: string; // NEW: To store the custom value for "Other"
    expenseType: string;
    totalAmount: string;
}