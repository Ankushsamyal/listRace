import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  CircularProgress,
  Grid,
} from '@mui/material';
import HeroButton from '../../component/MainButton';
import { useSelector } from 'react-redux';

const pageStyles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    marginTop: '70px',
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  container: {
    padding: '40px',
    borderRadius: '20px',
    background: '#e0e5ec',
    boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    color: '#4a4a4a',
    fontWeight: 'bold',
    mb: 3,
  },
  labelText: {
    textAlign: 'left',
    color: '#6b6b6b',
    fontWeight: 600,
    marginBottom: '6px',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '15px',
      background: '#e0e5ec',
      boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
      '& fieldset': {
        border: 'none',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#6b6b6b',
      '&.Mui-focused': {
        color: 'red',
      },
    },
  },
  formControl: {
    width: '100%',
    paddingBottom: '20px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '15px',
      background: '#e0e5ec',
      boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
      '& fieldset': {
        border: 'none',
      },
    },
    '& label': {
      color: '#6b6b6b',
      '&.Mui-focused': {
        color: 'red',
      },
    },
  },
  fileInput: {
    marginTop: '8px',
    width: '100%',
    borderRadius: '15px',
    padding: '10px',
    boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
    backgroundColor: '#e0e5ec',
    border: 'none',
  },
  button: {
    marginTop: '30px',
    borderRadius: '15px',
    backgroundColor: '#ff6b6b',
    color: 'white',
    padding: '10px 0',
    boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
    '&:hover': {
      backgroundColor: '#e05555',
    },
  },
};


function UploadAdminExplore() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    rating: '',
    price: '',
    type: '',
    Himage_url: null,
    person_url: null,
    message: '',
    opening_status: '',
    feature: '',
  });
  const [loading, setLoading] = useState(false);
  const types = ['Type A', 'Type B', 'Type C'];
  const openingStatuses = ['Open', 'Close'];
  const features = ['Best rated', 'Best price', 'Best location'];
  const IdData = useSelector((state) => state.counter.IdData);
const allUserId = IdData?.map((item) => item.id) || [];
console.log("allUserId",allUserId)


//creating random id and check if id exist


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Form submitted! Check console for formData');
      console.log('Form Data:', formData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={pageStyles.root}>
      <Container maxWidth="sm">
        <Box sx={pageStyles.container} component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h4" sx={pageStyles.title}>
            Upload Details
          </Typography>

          {/* Row 1: ID, Rating, Price */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography sx={pageStyles.labelText}>ID</Typography>
              <TextField
                name="id"
                value={formData.id}
                onChange={handleChange}
                fullWidth
                sx={pageStyles.textField}
                required
                InputProps={{
                  readOnly: true, 
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography sx={pageStyles.labelText}>Rating (out of 5)</Typography>
              <TextField
                name="rating"
                type="number"
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                value={formData.rating}
                onChange={handleChange}
                fullWidth
                sx={pageStyles.textField}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography sx={pageStyles.labelText}>Price</Typography>
              <TextField
                name="price"
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                value={formData.price}
                onChange={handleChange}
                fullWidth
                sx={pageStyles.textField}
                required
              />
            </Grid>
          </Grid>

          {/* Row 2: Name */}
          <Box mt={3}>
            <Typography sx={pageStyles.labelText}>Name</Typography>
            <TextField
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              sx={pageStyles.textField}
              required
            />
          </Box>

          {/* Row 3: Type */}
          <Box mt={3}>
            <Typography sx={pageStyles.labelText}>Type</Typography>
            <FormControl sx={pageStyles.formControl} required>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Type' }}
              >
                <MenuItem value="" disabled>
                  Select Type
                </MenuItem>
                {types.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Row 4: File uploads */}
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} sm={6}>
              <Typography sx={pageStyles.labelText}>Himage Upload</Typography>
              <input
                name="Himage_url"
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={pageStyles.fileInput}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={pageStyles.labelText}>Person Upload</Typography>
              <input
                name="person_url"
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={pageStyles.fileInput}
                required
              />
            </Grid>
          </Grid>

          {/* Row 5: Message */}
          <Box mt={3}>
            <Typography sx={pageStyles.labelText}>Message</Typography>
            <TextField
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              sx={pageStyles.textField}
              required
            />
          </Box>

          {/* Row 6: Opening Status & Feature */}
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} sm={6}>
              <Typography sx={pageStyles.labelText}>Opening Status</Typography>
              <FormControl sx={pageStyles.formControl} required>
                <Select
                  name="opening_status"
                  value={formData.opening_status}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Opening Status' }}
                >
                  <MenuItem value="" disabled>
                    Select Opening Status
                  </MenuItem>
                  {openingStatuses.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={pageStyles.labelText}>Feature</Typography>
              <FormControl sx={pageStyles.formControl} required>
                <Select
                  name="feature"
                  value={formData.feature}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Feature' }}
                >
                  <MenuItem value="" disabled>
                    Select Feature
                  </MenuItem>
                  {features.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <HeroButton handleClick={handleSubmit} Isdisabled={loading}>
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Upload'}
          </HeroButton>
        </Box>
      </Container>
    </div>
  );
}

export default UploadAdminExplore;
