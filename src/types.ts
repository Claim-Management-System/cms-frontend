export type FormType =
    | "MISCELLANEOUS EXPENSE FORM"
    | "OUT PATIENT CLAIM FORM";

export interface MiscFormData {
    title: string;
    itemType: string;
    description: string;
    totalAmount: string;
}

export interface OpdFormData {
    title: string;
    patientName: string;
    relationship: string;
    purposeOfVisit: string;
    expenseType: string;
    totalAmount: string;
} 