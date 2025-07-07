import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HeroButton from '../../../component/MainButton';
import { signupUser } from '../../../API/ApiService';


const pageStyles = {
  root: {
    // minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    marginTop: '80px',
    paddingTop: '30px',
    paddingBottom: '30px'
  },
  container: {
    padding: '40px',
    borderRadius: '20px',
    background: '#e0e5ec',
    boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
    textAlign: 'center'
  },
  icon: {
    fontSize: 100,
    mb: 2,
    color: '#ff6b6b',
    background: '#e0e5ec',
    padding: '15px',
    borderRadius: '50%',
    boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff'
  },
  title: {
    color: '#4a4a4a',
    fontWeight: 'bold',
    mb: 2
  },
  alert: {
    mt: 2,
    mb: 2,
    borderRadius: '10px',
    background: '#ffebee',
    color: '#d32f2f'
  },
  form: {
    mt: 1,
    width: '100%'
  },
  buttonContainer: {
    mt: 3,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '15px',
      background: '#e0e5ec',
      boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
      '& fieldset': {
        border: 'none'
      },
    },
    '& .MuiInputLabel-root': {
      color: '#6b6b6b',
      '&.Mui-focused': {
        color: 'red',
      },
    },
  },
  iconButton: {
    color: '#6b6b6b',
  }
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= minLength && hasUpperCase && hasNumber;
  };

  const validateName = (name) => {
    if (!name.trim()) {
      return 'Name is required.';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      return 'Name can only contain letters and spaces.';
    } else if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long.';
    }
    return '';
  };
  const handleSignup = async (e) => {
    e?.preventDefault();
    if (validateName(name)) {
      setError('please enter a valid name')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be 8+ characters with at least one uppercase letter and one number');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await signupUser(email, password, confirmPassword, name);

      if (data.token) {
        sessionStorage.setItem('authToken', data.token);
      }

      navigate('/login');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  const handleSignIn = () => {
    navigate('/login');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup(e);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={pageStyles.root}>
      <Container maxWidth="xs">
        <Box sx={pageStyles.container}>
          <PersonAddIcon sx={pageStyles.icon} />
          <Typography component="h1" variant="h5" sx={pageStyles.title}>
            Create Account
          </Typography>

          {error && (
            <Alert severity="error" sx={pageStyles.alert}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            sx={pageStyles.form}
            onSubmit={handleSignup}
            onKeyPress={handleKeyPress}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="Full name"
              label="Full name"
              name="Full name"
              autoComplete="Full name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={pageStyles.textField}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={pageStyles.textField}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password (min 8 chars, 1 uppercase, 1 number)"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={pageStyles.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={pageStyles.iconButton}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={pageStyles.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={pageStyles.iconButton}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Box sx={pageStyles.buttonContainer}>
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
      </Container>
    </div>
  );
};

export default Signup;