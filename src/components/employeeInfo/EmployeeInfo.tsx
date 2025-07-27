import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Grid, InputAdornment, IconButton } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import './EmployeeInfo.css';

type Role = 'admin' | 'user';
type RoleExtension = 'normal' | 'ds' | 'hr' | 'social' | 'admin';
type EmployeeType = 'permanent' | 'contractual';
type MaritalStatus = 'single' | 'married' | 'family';

export interface EmployeeInterface {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  joiningDate: string;
  role: Role;
  roleExtension: RoleExtension;
  employeeType: EmployeeType;
  team: string;
  bankAccountNumber: string;
  employeeId: string;
  maritalStatus: MaritalStatus;
  age?: number;
}

type EmployeeInfoProps = {
  mode: 'create' | 'edit';
  formData: Omit<EmployeeInterface, 'age'> & { age?: number };
  password?: string;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (e: SelectChangeEvent<string>) => void;
  submitted: boolean;
};

const generateRandomPassword = (length = 12) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0, n = charset.length; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({
  mode,
  formData,
  password,
  onFormChange,
  onSelectChange,
  submitted,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

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

  return (
    <div className="employee-info-form">
      <Grid container spacing={4} className="form-grid">
        <Grid item xs={12} sm={6} md={4} className="custom-form-control">
          <TextField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={onFormChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={submitted && !formData.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="custom-form-control">
          <TextField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={onFormChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={submitted && !formData.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="custom-form-control">
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={onFormChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={submitted && !formData.email}
          />
        </Grid>
        {mode === 'create' && (
          <Grid item xs={12} sm={6} md={4} className="custom-form-control">
            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={onFormChange}
              fullWidth
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              error={submitted && !password}
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
        )}
        <Grid item xs={12} sm={6} md={4} className="custom-form-control">
          <TextField
            name="dob"
            label="Date of Birth"
            type="date"
            value={formData.dob}
            onChange={onFormChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={submitted && !formData.dob}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="custom-form-control">
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
        <Grid item xs={12} sm={6} md={4} className="custom-form-control">
          <TextField
            name="joiningDate"
            label="Joining Date"
            type="date"
            value={formData.joiningDate}
            onChange={onFormChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={submitted && !formData.joiningDate}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined" className="custom-form-control" error={submitted && !formData.role}>
            <InputLabel id="role-label" shrink required>Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={formData.role}
              onChange={onSelectChange}
              label="Role"
              required
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined" className="custom-form-control" error={submitted && !formData.roleExtension}>
            <InputLabel id="role-extension-label" shrink required>Role Extension</InputLabel>
            <Select
              labelId="role-extension-label"
              name="roleExtension"
              value={formData.roleExtension}
              onChange={onSelectChange}
              label="Role Extension"
              required
            >
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="ds">DS</MenuItem>
              <MenuItem value="hr">HR</MenuItem>
              <MenuItem value="social">Social</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined" className="custom-form-control" error={submitted && !formData.employeeType}>
            <InputLabel id="employee-type-label" shrink required>Employee Type</InputLabel>
            <Select
              labelId="employee-type-label"
              name="employeeType"
              value={formData.employeeType}
              onChange={onSelectChange}
              label="Employee Type"
              required
            >
              <MenuItem value="permanent">Permanent</MenuItem>
              <MenuItem value="contractual">Contractual</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="custom-form-control">
          <TextField
            name="team"
            label="Team"
            value={formData.team}
            onChange={onFormChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={submitted && !formData.team}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="custom-form-control">
          <TextField
            name="bankAccountNumber"
            label="Bank Account Number"
            value={formData.bankAccountNumber}
            onChange={onFormChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={submitted && !formData.bankAccountNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="custom-form-control">
          <TextField
            name="employeeId"
            label="Employee ID"
            value={formData.employeeId}
            onChange={onFormChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={submitted && !formData.employeeId}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined" className="custom-form-control" error={submitted && !formData.maritalStatus}>
            <InputLabel id="marital-status-label" shrink required>Marital Status</InputLabel>
            <Select
              labelId="marital-status-label"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={onSelectChange}
              label="Marital Status"
              required
            >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="married">Married</MenuItem>
              <MenuItem value="family">Family</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeInfo;
