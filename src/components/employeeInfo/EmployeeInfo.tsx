import { useEffect, useState } from 'react';
import { useError } from '../../context/errorContext';
import { generateRandomPassword } from '../../utils/AddEmployeeUtils';
import { fetchFormDependencies } from '../../services/constantServices/employeeService';
import { generateFieldConfigs } from '../../utils/AddEmployeeUtils';
import { EMPLOYEE_INFO_MODE } from '../../services/constantServices/constants';
import { Visibility, VisibilityOff, Refresh } from '@mui/icons-material'
import { TextField, Select, MenuItem, FormControl, InputLabel, Grid, InputAdornment, IconButton } from '@mui/material';
import type { EmployeeInterface, WorkLocation, MaritalStatus, EmployeeType, FieldConfig } from '../../types';
import type { SelectChangeEvent } from '@mui/material';
import './EmployeeInfo.css';


type EmployeeInfoProps = {
    mode: 'create' | 'edit';
    formData: EmployeeInterface;
    onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSelectChange: (e: SelectChangeEvent<string>) => void;
    submitted: boolean;
};

export default function EmployeeInfo({ mode, formData, onFormChange, onSelectChange, submitted }: EmployeeInfoProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [workLocation, setWorkLocation] = useState<WorkLocation[]>([]);
    const [maritalStatus, setMaritalStatus] = useState<MaritalStatus[]>([]);
    const [employeeType, setEmployeeType] = useState<EmployeeType[]>([]);

    const { setError } = useError();

    useEffect(() => {
        const fetchDependencies = async () => {
            try {
                const {
                    formattedWorkLocations,
                    formattedMaritalStatuses,
                    formattedEmployeeTypes
                } = await fetchFormDependencies();

                setWorkLocation(formattedWorkLocations);
                setMaritalStatus(formattedMaritalStatuses);
                setEmployeeType(formattedEmployeeTypes);
            } catch (error) {
                setError('Failed to load Form Dependencies. Please refresh the page.');
            }
        };
        fetchDependencies();
    }, []);

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

    const fieldConfigs = generateFieldConfigs(workLocation, maritalStatus, employeeType)

    const renderField = (field: FieldConfig) => {
        if (field.name === 'password' && mode !== EMPLOYEE_INFO_MODE.CREATE) {
            return null;
        }

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
                                        <Refresh />
                                    </IconButton>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        onMouseDown={(event: any) => event.preventDefault()}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            );
        }

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