import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginBG from '../../Images/images/loginBG.jpg'
import axios from 'axios';
import {
    Container,
    Box,
    Typography,
    TextField,
    Paper,
    CircularProgress,
    Alert,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HeroButton from '../../CommonComponents/HeroButton';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const passwordFieldStyles = {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: 'red',
            },
        },
        '& .MuiInputLabel-root': {
            '&.Mui-focused': {
                color: 'red', 
            },
        },
    };
    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Replace with your actual API endpoint
            const response = await axios.post('https://your-api-endpoint/api/signup', {
                email,
                password,
            });

            // Assuming the API returns a token or user data
            const { token } = response.data;
            // Store token in localStorage or Redux (based on your preference)
            localStorage.setItem('authToken', token);

            // Redirect to dashboard or home page
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = () => {
        navigate('/login');
    };
    // console.log('Local Storage Data:', { ...localStorage.getItem() });
    return (
        <div className='signup-main' style={{ height: '105vh',backgroundImage:`url(${loginBG})` }}>
        <Container component="main" maxWidth="xs" 
        style={{  
        paddingTop: '50px',
        // backgroundImage:`url(${loginBG})`
         }}>
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <PersonAddIcon color="primary" sx={{ fontSize: 40, mb: 2, color: '#ff545a' }} />
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                            {error}
                        </Alert>
                    )}
                    <Box sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={passwordFieldStyles}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={passwordFieldStyles}

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            sx={passwordFieldStyles}
                        />
                        <Box sx={{ mt: 3, width: '100%',display:'flex',justifyContent:'space-around' }}>
                            <HeroButton
                                fullWidth
                                variant="contained"
                                handleClick={handleSignup}
                                Isdisabled={loading || !email || !password || !confirmPassword}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                            </HeroButton>
                            <HeroButton
                                handleClick={handleSignIn}
                            >
                                Sign In
                            </HeroButton>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
        </div>
    );
};

export default Signup;