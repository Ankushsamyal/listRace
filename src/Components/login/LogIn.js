import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginBG from '../../Images/images/loginBG.jpg'
import {
  Container,
  Box,
  Typography,
  TextField,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HeroButton from '../../CommonComponents/HeroButton';

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
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('https://your-api-endpoint/api/login', {
        email,
        password,
      });

      // Assuming the API returns a token or user data
      const { token } = response.data;
      // Store token in localStorage or Redux (based on your preference)
      localStorage.setItem('authToken', token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    // Navigate to signup page
    navigate('/signup');
  };

  return (
     <div className='signin
     -main' style={{ height: '100vh',backgroundImage:`url(${loginBG})`,paddingTop:'100px' }}>
    <Container component="main" maxWidth="xs" >
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 40, mb: 2, color: '#ff545a' }} />
          <Typography component="h1" variant="h5">
            Sign in
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={passwordFieldStyles}
            />
            <Box sx={{ mt: 3, width: '100%', display: 'flex', justifyContent: 'space-around' }}>
              <HeroButton
                fullWidth
                variant="contained"
                handleClick={handleLogin}
                Isdisabled={loading || !email || !password}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </HeroButton>
              <HeroButton
                handleClick={handleSignUp}
              >
                Sign Up
              </HeroButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
    </div>
  );
};

export default Login;