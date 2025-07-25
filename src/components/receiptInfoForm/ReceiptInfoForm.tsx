import React, { useEffect, useState } from 'react';
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
import type { FormType, MiscFormData, OpdFormData } from '../../types'
import { useError } from '../../context/errorContext';
import { getClaimTypesFromApi } from '../../services/dataServices/claimsRequest'
import './ReceiptInfoForm.css';

interface ReceiptInfoFormProps {
    formType: FormType;
    formData: MiscFormData | OpdFormData;
    onFormDataChange: (field: string, value: string) => void;
    submitted: boolean;
}

interface ClaimType {
  id: number;
  type: string;
}

const ReceiptInfoForm: React.FC<ReceiptInfoFormProps> = ({ formType, formData, onFormDataChange, submitted }) => {
    const [claimTypes, setClaimTypes] = useState<ClaimType[]>([]);
    const { setError } = useError();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onFormDataChange(event.target.id, event.target.value);
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        onFormDataChange(event.target.name, event.target.value);
    };

    useEffect(() => {
    const fetchClaimTypes = async () => {
      try {
        const response = await getClaimTypesFromApi(formType); 
        setClaimTypes(response);
      } catch (error) {
        setError("Failed to fetch claim types")
      }
    };

    fetchClaimTypes();
  }, []);


    const renderMiscExpenseFields = () => {
        const data = formData as MiscFormData;

        return (
            <>
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

                <FormControl fullWidth margin="normal" required className="custom-form-control">
                    <InputLabel id="item-purpose-label" shrink>Item/Purpose</InputLabel>
                    <Select
                        labelId="item-purpose-label"
                        id="itemType"
                        name="itemType"
                        value={data.itemTypeId}
                        label="Item/Purpose"
                        onChange={handleSelectChange}
                        notched
                        MenuProps={{ autoFocus: false }}
                        required
                        IconComponent={KeyboardArrowDownIcon}
                    >
                        {claimTypes.map((option) => (
                            <MenuItem className="capitalize-text" key={option.id} value={option.id}>
                                {option.type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

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

                <FormControl fullWidth margin="normal" required className="custom-form-control">
                    <InputLabel id="purpose-of-visit-label" shrink>Purpose of Visit</InputLabel>
                    <Select
                        labelId="purpose-of-visit-label"
                        id="itemType"
                        name="itemType"
                        value={data.purposeOfVisit}
                        label="Purpose of Visit"
                        onChange={handleSelectChange}
                        notched
                        MenuProps={{ autoFocus: false }}
                        required
                        IconComponent={KeyboardArrowDownIcon}
                    >
                        {claimTypes.map((option) => (
                            <MenuItem className="capitalize-text" key={option.id} value={option.id}>
                                {option.type.split('-')[1]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </>
        )
    };

    return (
        <div className={`receipt-form-container ${submitted ? 'submitted' : ''}`}>
            {formType === "MISCELLANEOUS EXPENSE FORM" ? renderMiscExpenseFields() : renderOutPatientClaimFields()}

            <FormControl fullWidth margin="normal" required className="custom-form-control">
                <InputLabel htmlFor="total-amount" shrink>Total Amount claimed</InputLabel>
                <OutlinedInput
                    id="totalAmount"
                    name="totalAmount"
                    label="Total Amount claimed"
                    type='number'
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