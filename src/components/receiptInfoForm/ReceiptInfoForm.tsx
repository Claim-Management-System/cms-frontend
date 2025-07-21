import React from 'react';
import {
    TextField,
    MenuItem,
    // Button,
    Select,
    FormControl,
    InputLabel,
    // FormHelperText,
    OutlinedInput,
    type SelectChangeEvent,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './ReceiptInfoForm.css';
import type { FormType, MiscFormData, OpdFormData } from '../../types'

interface ReceiptInfoFormProps {
    formType: FormType;
    formData: MiscFormData | OpdFormData;
    onFormDataChange: (field: string, value: string) => void;
    submitted: boolean;
}

const ReceiptInfoForm: React.FC<ReceiptInfoFormProps> = ({ formType, formData, onFormDataChange, submitted }) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onFormDataChange(event.target.id, event.target.value);
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        onFormDataChange(event.target.name, event.target.value);
    };


    const renderMiscExpenseFields = () => {
        const data = formData as MiscFormData;
        return (
            <>
                {/* --- Title Field --- */}
                <FormControl fullWidth margin="normal" className="custom-form-control">
                    <InputLabel htmlFor="title" required shrink>Title</InputLabel>
                    <OutlinedInput
                        id="title"
                        name="title"
                        label="Title"
                        placeholder="Type here..."
                        notched
                        value={data.title}
                        onChange={handleInputChange}
                        required
                    />
                </FormControl>

                {/* --- Item/Purpose Field --- */}
                <FormControl fullWidth margin="normal" required className="custom-form-control">
                    <InputLabel id="item-purpose-label" shrink>Item/Purpose</InputLabel>
                    <Select
                        labelId="item-purpose-label"
                        id="itemType"
                        name="itemType"
                        value={data.itemType}
                        label="Item/Purpose"
                        onChange={handleSelectChange}
                        notched
                        MenuProps={{ autoFocus: false }}
                        required
                        IconComponent={KeyboardArrowDownIcon}
                    >
                        <MenuItem value="internet">Internet</MenuItem>
                        <MenuItem value="courses">Courses</MenuItem>
                        <MenuItem value="meal-reimbursement">Meal Reimbursement</MenuItem>
                        <MenuItem value="travelling-fare">Travelling Fare</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>

                {/* --- Description Field --- */}
                <FormControl fullWidth margin="normal" className="custom-form-control">
                    <TextField
                        id="description"
                        name="description"
                        label="Description"
                        multiline
                        rows={4}
                        required
                        placeholder="Type here..."
                        value={data.description}
                        onChange={handleInputChange}
                        inputProps={{ maxLength: 200 }}
                        helperText={`${data.description.length}/200`}
                        InputLabelProps={{ shrink: true }}
                    />
                </FormControl>
            </>
        );
    }

    const renderOutPatientClaimFields = () => {
        const data = formData as OpdFormData;
        return (
            <>
                {/* --- Title Field --- */}
                <FormControl fullWidth margin="normal" className="custom-form-control">
                    <InputLabel htmlFor="title" required shrink>Title</InputLabel>
                    <OutlinedInput
                        id="title"
                        name="title"
                        label="Title"
                        placeholder="Type here..."
                        notched
                        value={data.title}
                        onChange={handleInputChange}
                        required
                    />
                </FormControl>

                {/* --- Patient's Name Field --- */}
                <FormControl fullWidth margin="normal" required className="custom-form-control">
                    <InputLabel htmlFor="patient-name" shrink>Patient's Name</InputLabel>
                    <OutlinedInput
                        id="patientName"
                        name="patientName"
                        label="Patient's Name"
                        placeholder="Type here..."
                        notched
                        value={data.patientName}
                        onChange={handleInputChange}
                        required
                    />
                </FormControl>

                {/* --- Relationship Field --- */}
                <FormControl fullWidth margin="normal" required className="custom-form-control">
                    <InputLabel id="relationship-label" shrink>Relationship</InputLabel>
                    <Select
                        labelId="relationship-label"
                        id="relationship"
                        name="relationship"
                        value={data.relationship}
                        label="Relationship"
                        onChange={handleSelectChange}
                        notched
                        MenuProps={{ autoFocus: false }}
                        required
                        IconComponent={KeyboardArrowDownIcon}
                    >
                        <MenuItem value="father">Father</MenuItem>
                        <MenuItem value="mother">Mother</MenuItem>
                        <MenuItem value="spouse">Spouse</MenuItem>
                        <MenuItem value="children">Children</MenuItem>
                        <MenuItem value="self">Self</MenuItem>
                    </Select>
                </FormControl>

                {/* --- Purpose of Visit Field --- */}
                <FormControl fullWidth margin="normal" required className="custom-form-control">
                    <InputLabel id="purpose-of-visit-label" shrink>Purpose of Visit</InputLabel>
                    <Select
                        labelId="purpose-of-visit-label"
                        id="purposeOfVisit"
                        name="purposeOfVisit"
                        value={data.purposeOfVisit}
                        label="Purpose of Visit"
                        onChange={handleSelectChange}
                        notched
                        MenuProps={{ autoFocus: false }}
                        required
                        IconComponent={KeyboardArrowDownIcon}
                    >
                        <MenuItem value="monthly-checkup">Monthly Checkup</MenuItem>
                        <MenuItem value="medical-tests">Medical Tests</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>

                {/* --- Specify the type of expense Field --- */}
                <FormControl fullWidth margin="normal" required className="custom-form-control">
                    <InputLabel id="expense-type-label" shrink>Specify the type of expense</InputLabel>
                    <Select
                        labelId="expense-type-label"
                        id="expenseType"
                        name="expenseType"
                        value={data.expenseType}
                        label="Specify the type of expense"
                        onChange={handleSelectChange}
                        notched
                        MenuProps={{ autoFocus: false }}
                        required
                        IconComponent={KeyboardArrowDownIcon}
                    >
                        <MenuItem value="consultation">Consultation</MenuItem>
                        <MenuItem value="medicine">Medicine</MenuItem>
                        <MenuItem value="lab-tests">Lab Tests</MenuItem>
                    </Select>
                </FormControl>
            </>
        )
    };

    return (
        <div className={`receipt-form-container ${submitted ? 'submitted' : ''}`}>
            {formType === "MISCELLANEOUS EXPENSE FORM" ? renderMiscExpenseFields() : renderOutPatientClaimFields()}

            {/* --- Total Amount Field --- */}
            <FormControl fullWidth margin="normal" required className="custom-form-control">
                <InputLabel htmlFor="total-amount" shrink>Total Amount claimed in numbers</InputLabel>
                <OutlinedInput
                    id="totalAmount"
                    name="totalAmount"
                    label="Total Amount claimed in numbers"
                    placeholder="Type here..."
                    notched
                    value={formData.totalAmount}
                    onChange={handleInputChange}
                    required
                />
            </FormControl>
        </div>
    );
};

export default ReceiptInfoForm;