import React, {  useState } from 'react';
import { Button, Menu, MenuItem, Avatar, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';

export default function   UserProfile({setMobileOpen,mobileOpen}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
   const navigate = useNavigate();
   const username = sessionStorage.getItem('userName')
   const uppercase = username.charAt(0).toUpperCase() || 'A'
   

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    setMobileOpen(!mobileOpen)
   sessionStorage.removeItem('authToken');
   sessionStorage.removeItem('userEmail');
   sessionStorage.removeItem('userId');
   sessionStorage.removeItem('userName');
   sessionStorage.removeItem('userRole');
   navigate("/login")
    console.log('User has been logged out'); 
  };

  const handleProfile = () => {
    handleClose();
   navigate('/profile');
   setMobileOpen(!mobileOpen)
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        onClick={handleClick}
        color="primary"
        startIcon={<Avatar sx={{ bgcolor: '#f55f56' }}>{uppercase && uppercase}</Avatar>}
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
