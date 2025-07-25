import React, { useEffect, useState } from 'react';
import { useError } from '../../context/errorContext';
import { getClaimTypesFromApi } from '../../services/dataServices/claimsRequest'
import type { FormType, FormData } from '../../types'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { 
    TextField, 
    MenuItem, 
    Select, 
    FormControl, 
    InputLabel, 
    OutlinedInput, 
    type SelectChangeEvent,
} from '@mui/material';
import './ReceiptInfoForm.css';


interface ReceiptInfoFormProps {
    formType: FormType;
    formData: FormData;
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
        return (
            <FormControl fullWidth margin="normal" required className="custom-form-control">
                <InputLabel id="item-purpose-label" shrink>Item/Purpose</InputLabel>
                <Select
                    labelId="item-purpose-label"
                    id="itemType"
                    name="itemTypeId"
                    value={formData.itemTypeId}
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
        );
    }

    const renderOutPatientClaimFields = () => {
        return (
            <>
                <FormControl fullWidth margin="normal" required className="custom-form-control">
                    <InputLabel id="relationship-label" shrink>Relationship</InputLabel>
                    <Select
                        labelId="relationship-label"
                        id="relationship"
                        name="relationship"
                        value={formData.relationship}
                        label="Relationship"
                        onChange={handleSelectChange}
                        notched
                        MenuProps={{ autoFocus: false }}
                        required
                        IconComponent={KeyboardArrowDownIcon}
                    >
                        <MenuItem value="Parent">Parent</MenuItem>
                        <MenuItem value="Spouse">Spouse</MenuItem>
                        <MenuItem value="Chil">Children</MenuItem>
                        <MenuItem value="Self">Self</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" required className="custom-form-control">
                    <InputLabel id="purpose-of-visit-label" shrink>Purpose of Visit</InputLabel>
                    <Select
                        labelId="purpose-of-visit-label"
                        id="itemType"
                        name="itemTypeId"
                        value={formData.itemTypeId}
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
            <FormControl fullWidth margin="normal" className="custom-form-control">
                <InputLabel htmlFor="title" required shrink>Title</InputLabel>
                <OutlinedInput
                    id="title"
                    name="title"
                    label="Title"
                    placeholder="Type here..."
                    notched
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
            </FormControl>

            {formType === "MISCELLANEOUS EXPENSE FORM" ? renderMiscExpenseFields() : renderOutPatientClaimFields()}

            <FormControl fullWidth margin="normal" className="custom-form-control">
                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    required
                    placeholder="Type here..."
                    value={formData.description}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 200 }}
                    helperText={`${formData.description?.length}/200`}
                    InputLabelProps={{ shrink: true }}
                />
            </FormControl>

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