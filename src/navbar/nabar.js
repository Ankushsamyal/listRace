import React from 'react';
import { AppBar, Toolbar, Typography, Box, Divider, Grid2, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import '../App.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Navbar = ({ footerNav = false }) => {

  return (<div>
    <AppBar
      elevation={footerNav ? 0 : 1}
      style={{
        position: !footerNav ? "fixed" : "static",
        backgroundColor: 'white',
        justifyItems: 'center',
        height: footerNav ? "100px" : "80px",
      }}
    >
      <Toolbar sx={{
        height: '100%',
        display: 'flex', justifyContent: 'space-between'
      }}>
        <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: '20px' }}>
          <Link size="large" style={{ textDecoration: 'none' }} component={Link} to="/">
            <span style={{ color: 'black' }}>List</span>
            <span style={{ color: 'red' }}>Race</span>
          </Link>
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Link
            className='nav-bar' to="/"
          >HOME</Link>
          <Link
            className='nav-bar' to="/how-it-works"
          >HOW IT WORKS</Link>
          <Link
            className='nav-bar' to="/explore"
          >EXPLORE</Link>
          <Link
            className='nav-bar'to="/review"
          >REVIEW</Link>
          <Link
            className='nav-bar'to="/blog"
          >BLOG</Link>
          <Link
            className='nav-bar'to="/contact"
          >CONTACT</Link>
        </Box>
      </Toolbar>
    </AppBar>

    {/* footernav */}

    {footerNav ? <div>
      <Divider variant="middle" />
      <Box
        sx={{
          padding: 4,
          color: '#464646',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" sx={{ fontSize: '14px', color: '#a5adb3' }}>
          © Copyright. Designed and developed by Themesine
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 item sx={{ alignContent: 'center' }}>
            <Typography variant="body2" sx={{ fontSize: '14px' }}>
              <PhoneIcon sx={{ fontSize: '16px', marginRight: 1, color: '#a5adb3' }} />
              +91 90765467808
            </Typography>
          </Grid2>
          <Grid2 item>
            <IconButton href="https://www.facebook.com" target="_blank" color="#a5adb3">
              <FacebookIcon />
            </IconButton>
          </Grid2>
          <Grid2 item>
            <IconButton href="https://www.google.com" target="_blank" color="#a5adb3">
              <GoogleIcon />
            </IconButton>
          </Grid2>
          <Grid2 item>
            <IconButton href="https://www.youtube.com" target="_blank" color="#a5adb3">
              <YouTubeIcon />
            </IconButton>
          </Grid2>
          <Grid2 item>
            <IconButton href="https://www.linkedin.com" target="_blank" color="#a5adb3">
              <LinkedInIcon />
            </IconButton>
          </Grid2>
        </Grid2>
      </Box>
    </div> : ''}
  </div>
  );
};

export default Navbar;
