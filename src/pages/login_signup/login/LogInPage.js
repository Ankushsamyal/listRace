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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HeroButton from '../../../component/MainButton';
import { loginUser } from '../../../API/ApiService';
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

const pageStyles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    marginTop: '70px',
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [googlecredentialResponse, setGooglecredentialResponse] =useState([])
  const [jwtGooglecredentialResponse, setJwtGooglecredentialResponse] =useState([])
  

  if(googlecredentialResponse.credential){
      sessionStorage.setItem('authToken',  googlecredentialResponse.credential );
        sessionStorage.setItem('userEmail', jwtGooglecredentialResponse.email );
        sessionStorage.setItem('userName', jwtGooglecredentialResponse.name);
        sessionStorage.setItem('userId',jwtGooglecredentialResponse.sub);
        navigate('/');
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!password) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(email, password);

      if (data.token) {
        console.log(data.token, "login cred");
        sessionStorage.setItem('authToken', data.token  );
        sessionStorage.setItem('userEmail', data.user.email);
        sessionStorage.setItem('userName', data.user.name);
        sessionStorage.setItem('userId', data.user.id);
      }

      navigate('/');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={pageStyles.root}>
      <Container maxWidth="xs">
        <Box sx={pageStyles.container}>
          <LockOutlinedIcon sx={pageStyles.icon} />
          <Typography component="h1" variant="h5" sx={pageStyles.title}>
            Welcome Back
          </Typography>

          {error && (
            <Alert severity="error" sx={pageStyles.alert}>
              {error}
            </Alert>
          )}
          <Box
            component="form"
            sx={pageStyles.form}
            onSubmit={handleLogin}
            onKeyPress={handleKeyPress}
          >
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
              sx={pageStyles.textField}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
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
            <Box sx={pageStyles.buttonContainer}>
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
            <div style={{ display: 'inline-grid', marginTop: '10px' }}>
            
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse)
                  setGooglecredentialResponse(credentialResponse)
                  console.log(jwtDecode(credentialResponse.credential))
                  setJwtGooglecredentialResponse(jwtDecode(credentialResponse.credential))
                }}
                onError={() => console.log('Login fail')}
              />
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;