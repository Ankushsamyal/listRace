import React from 'react';
import { AppBar, Toolbar, Box, Divider, Grid2 } from '@mui/material';
import { Link } from 'react-router-dom';
import '../App.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Navbar = ({ footerNav }) => {

  return (<div>
    <AppBar
      elevation={footerNav ? 0:1}
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
        <Box className='logo' id='logo' sx={{ flexGrow: 1, marginLeft: '20px',fontSize:'x-large',fontWeight:'bold' }}>
          <Link size="large" style={{ textDecoration: 'none' }} component={Link} to="/">
            <span style={{ color: 'black' }}>List</span>
            <span style={{ color: 'red' }}>Race</span>
          </Link>
        </Box>
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
        <Box variant="body2" sx={{ fontSize: '14px', color: '#a5adb3' }}>
          © Copyright. Designed and developed by Themesine
        </Box>
        <Grid2 container spacing={2}>
          <Grid2 item sx={{ alignContent: 'center' }}>
            <Box variant="body2" sx={{ fontSize: '14px' }}>
              <PhoneIcon sx={{ fontSize: '16px', marginRight: 1, color: '#a5adb3' }} />
              +91 90765467808
            </Box>
          </Grid2>
          <Grid2 item>
            <a href="https://www.facebook.com"rel="noreferrer" target="_blank" color="#a5adb3">
              <FacebookIcon sx={{color:'rgb(0 0 0 / 54%)'}}/>
            </a>
          </Grid2>
          <Grid2 item>
            <a href="https://www.google.com"rel="noreferrer" target="_blank" color="#a5adb3">
              <GoogleIcon sx={{color:'rgb(0 0 0 / 54%)'}}/>
            </a>
          </Grid2>
          <Grid2 item>
            <a href="https://www.youtube.com"rel="noreferrer" target="_blank" color="#a5adb3">
              <YouTubeIcon sx={{color:'rgb(0 0 0 / 54%)'}}/>
            </a>
          </Grid2>
          <Grid2 item>
            <a href="https://www.linkedin.com" rel="noreferrer" target="_blank" color="#a5adb3">
              <LinkedInIcon sx={{color:'rgb(0 0 0 / 54%)'}} id="linkedin-icon" />
            </a>
          </Grid2>
        </Grid2>
      </Box>
    </div> : ''}
  </div>
  );
};

export default Navbar;
