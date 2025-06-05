import React, { useContext, useState } from 'react';
import { Button, Menu, MenuItem, Avatar, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AuthContext } from '../../../CommonComponents/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { setUser } = useContext(AuthContext);
   const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
   localStorage.removeItem('authToken');
setUser(null);
    console.log('User has been logged out'); 
  };

  const handleProfile = () => {
    handleClose();
   navigate('/profile');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        onClick={handleClick}
        color="primary"
        startIcon={<Avatar sx={{ bgcolor: '#f55f56' }}>N</Avatar>}
        endIcon={<ArrowDropDownIcon />}
        sx={{ textTransform: 'none' }}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
