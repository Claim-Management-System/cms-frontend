import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useError } from '../../context/errorContext';
import { Visibility, VisibilityOff, MailOutline } from '@mui/icons-material'; 
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    IconButton,
    CircularProgress
} from '@mui/material';
import googleIcon from '../../assets/logos/google-gsuite.svg';
import './LoginCard.css';


const LoginCard: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { setError } = useError();
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await loginUser(email, password);
            if (result.success && result.user) {
                if (result.user.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/');
                }
            } else {
                setError(result.error || 'Login failed. Please try again.');
            }
        } catch (error: any) {
            setError(error.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className='login-card'>
            <CardContent className="login-card-content">
                <Typography component="h1">
                    LOG IN
                </Typography>

                <Box component="form" noValidate autoComplete="off" className="login-form" onSubmit={handleLogin}>
                    <Box className="fields-container"> {/* This was made so that the remember me checkbox is right below the password field*/}
                        <TextField
                            className="email-field styled-textfield"
                            fullWidth
                            required
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            placeholder="example@securiti.net"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: !email && (
                                    <InputAdornment position="end">
                                        <MailOutline className="email-field-icon" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            className="password-field styled-textfield"
                            fullWidth
                            required
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            placeholder="Type here..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            
                            InputLabelProps={{
                                shrink: true,
                            }}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff className="visibility-icon" /> : <Visibility className="visibility-icon" />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormControlLabel
                            className="remember-me-control"
                            control={
                                <Checkbox
                                    name="remember"
                                    className="remember-me-checkbox"
                                />
                            }
                            label={
                                <Typography className="remember-me-label">
                                    Remember me
                                </Typography>
                            }
                        />
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        className="login-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'LOG IN'}
                    </Button>

                    <Typography
                        variant="body2"
                        color="textSecondary"
                        className="divider-text"
                    >
                        OR
                    </Typography>

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={
                            <img src={googleIcon} alt="Google G" /> 
                        }
                        className="google-login-button"
                    >
                        LOG IN WITH GOOGLE
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default LoginCard;