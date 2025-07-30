import { useEffect, useState } from 'react';
import { useError } from '../../context/errorContext';
import { generateRandomPassword } from '../../utils/AddEmployeeUtils';
import type { SelectChangeEvent } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import type { EmployeeInterface } from '../../types';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TextField, Select, MenuItem, FormControl, InputLabel, Grid, InputAdornment, IconButton } from '@mui/material';
import './EmployeeInfo.css';


type EmployeeInfoProps = {
    mode: 'create' | 'edit';
    formData: EmployeeInterface;
    onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSelectChange: (e: SelectChangeEvent<string>) => void;
    submitted: boolean;
};

type FieldConfig = {
    name: keyof EmployeeInterface;
    label: string;
    type: 'text' | 'email' | 'date' | 'number' | 'password' | 'select';
    required?: boolean;
    disabled?: boolean;
    options?: Array<{ value: string; label: string }>;
    specialHandling?: 'age' | 'password';
};

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({
    mode,
    formData,
    onFormChange,
    onSelectChange,
    submitted,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [locations, setLocations] = useState<string[]>([]);

    const { setError } = useError();

    // Fetch locations on component mount
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const locationData = await getLocations();
                setLocations(locationData);
            } catch (error) {
                console.error('Failed to fetch locations:', error);
                setError('Failed to load locations. Please refresh the page.');
            }
        };
        fetchLocations();
    }, []);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleGeneratePassword = () => {
        const newPassword = generateRandomPassword();
        const syntheticEvent = {
            target: {
                name: 'password',
                value: newPassword,
            },
        } as React.ChangeEvent<HTMLInputElement>;
        onFormChange(syntheticEvent);
    };

    const getFieldValue = (fieldName: keyof EmployeeInterface): string => {
        const value = formData[fieldName];
        if (value === undefined || value === null) return '';
        return String(value);
    };

    const fieldConfigs: FieldConfig[] = [
        // Text fields
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'jobTitle', label: 'Job Title', type: 'text', required: true },
        { name: 'position', label: 'Position', type: 'text', required: true },
        { name: 'phoneNumber', label: 'Phone Number', type: 'text', required: true },
        { name: 'team', label: 'Team', type: 'text', required: true },
        { name: 'bankAccountNumber', label: 'Bank Account Number', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },

        // Date fields
        { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
        { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true },

        // Special fields
        { name: 'age', label: 'Age', type: 'number', disabled: true, specialHandling: 'age' },
        { name: 'password', label: 'Password', type: 'password', required: true, specialHandling: 'password' },

        // Select fields
        {
            name: 'role',
            label: 'Role',
            type: 'select',
            required: true,
            options: [
                { value: 'employee', label: 'Employee' },
                { value: 'admin', label: 'Admin' },
            ]
        },
        {
            name: 'employeeType',
            label: 'Employee Type',
            type: 'select',
            required: true,
            options: [
                { value: 'permanent', label: 'Permanent' },
                { value: 'contractual', label: 'Contractual' },
            ]
        },
        {
            name: 'maritalStatus',
            label: 'Marital Status',
            type: 'select',
            required: true,
            options: [
                { value: 'single', label: 'Single' },
                { value: 'married', label: 'Married' },
                { value: 'family', label: 'Family' },
            ]
        },
        {
            name: 'workLocation',
            label: 'Work Location',
            type: 'select',
            required: true,
            options: locations.map((location) => ({ value: location, label: location }))
        },
    ];

    const renderField = (field: FieldConfig) => {
        // Skip password field if not in create mode
        if (field.name === 'password' && mode !== 'create') {
            return null;
        }

        // Handle special cases
        if (field.specialHandling === 'age') {
            return (
                <Grid item xs={12} sm={6} md={4} className="custom-form-control" key={field.name}>
                    <TextField
                        name="age"
                        label="Age"
                        type="number"
                        value={formData.age === undefined ? '' : formData.age}
                        fullWidth
                        disabled
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            );
        }

        if (field.specialHandling === 'password') {
            return (
                <Grid item xs={12} sm={6} md={4} className="custom-form-control" key={field.name}>
                    <TextField
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password || ''}
                        onChange={onFormChange}
                        fullWidth
                        required
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        error={submitted && !formData.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="generate password" onClick={handleGeneratePassword}>
                                        <RefreshIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            );
        }

        // Handle select fields
        if (field.type === 'select') {
            return (
                <Grid item xs={12} sm={6} md={4} key={field.name}>
                    <FormControl
                        fullWidth
                        variant="outlined"
                        className="custom-form-control"
                        error={submitted && !getFieldValue(field.name)}
                    >
                        <InputLabel id={`${field.name}-label`} shrink required={field.required}>
                            {field.label}
                        </InputLabel>
                        <Select
                            labelId={`${field.name}-label`}
                            name={field.name}
                            value={getFieldValue(field.name)}
                            onChange={onSelectChange}
                            label={field.label}
                            required={field.required}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                Select {field.label}
                            </MenuItem>
                            {field.options?.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            );
        }

        // Handle text fields (including email, date, number)
        return (
            <Grid item xs={12} sm={6} md={4} className="custom-form-control" key={field.name}>
                <TextField
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    value={getFieldValue(field.name)}
                    onChange={onFormChange}
                    fullWidth
                    required={field.required}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    error={submitted && field.required && !getFieldValue(field.name)}
                    disabled={field.disabled}
                />
            </Grid>
        );
    };

    return (
        <div className="employee-info-form">
            <Grid container spacing={4} className="form-grid">
                {fieldConfigs.map(renderField)}
            </Grid>
        </div>
    );
};

export default EmployeeInfo;