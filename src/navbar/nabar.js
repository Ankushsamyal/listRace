import React from 'react';
import { AppBar, Toolbar, Box, Divider, Grid2 } from '@mui/material';
import { Link } from 'react-router-dom';
import '../App.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import HeroButton from '../CommonComponents/HeroButton';
const styles = {
  richCharcoal: {
    fontFamily: "'Arial', sans-serif",
    fontSize: '25px',
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#1F1F1F',
    background: 'linear-gradient(145deg,rgb(106, 125, 207) 0%,rgb(37, 46, 101) 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0px 0px 0px #B3B3B3, 1px -1px 0px #B3B3B3, 1.5px 1.5px 2px #000000, 2px 2px 3px rgba(0, 0, 0, 0.6)',
    padding: '3px 8px',
    borderRadius: '3px',
    position: 'relative',
    textAlign: 'center',
    display: 'inline-block'
  }
};
const Navbar = ({ footerNav }) => {

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
        <Box className='logo' id='logo' sx={{ flexGrow: 1, paddingTop: '2px', marginLeft: '20px', fontSize: 'x-large', fontWeight: 'bold' }}>
          <Link size="large" style={{ textDecoration: 'none', display: "flex" }} component={Link} to="/">
            {/* <div style={{alignContent:'center',paddingLeft:'2px',color:'#F97316'}}>BlazeBloom</div> */}

            <h1 style={styles.richCharcoal}>BlazeBloom</h1>

          </Link>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Link
            style={{ alignContent: 'center' }}
            className='nav-bar' to="/"
          >HOME</Link>
          <Link style={{ alignContent: 'center' }}
            className='nav-bar' to="/explore"
          >EXPLORE</Link>
          <Link
            style={{ alignContent: 'center' }}
            className='nav-bar' to="/review"
          >REVIEW</Link>
          <Link
            style={{ alignContent: 'center' }}
            className='nav-bar' to="/blog"
          >BLOG</Link>
          <Link
            style={{ alignContent: 'center' }}
            className='nav-bar' to="/contact"
          >CONTACT</Link>
          <Link
            style={{ alignContent: 'center' }}
            className='nav-bar' to="/login"
          >
            <HeroButton>login</HeroButton>
          </Link>
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
            <a href="https://www.facebook.com" rel="noreferrer" target="_blank" color="#a5adb3">
              <FacebookIcon sx={{ color: 'rgb(0 0 0 / 54%)' }} />
            </a>
          </Grid2>
          <Grid2 item>
            <a href="https://www.google.com" rel="noreferrer" target="_blank" color="#a5adb3">
              <GoogleIcon sx={{ color: 'rgb(0 0 0 / 54%)' }} />
            </a>
          </Grid2>
          <Grid2 item>
            <a href="https://www.youtube.com" rel="noreferrer" target="_blank" color="#a5adb3">
              <YouTubeIcon sx={{ color: 'rgb(0 0 0 / 54%)' }} />
            </a>
          </Grid2>
          <Grid2 item>
            <a href="https://www.linkedin.com" rel="noreferrer" target="_blank" color="#a5adb3">
              <LinkedInIcon sx={{ color: 'rgb(0 0 0 / 54%)' }} id="linkedin-icon" />
            </a>
          </Grid2>
        </Grid2>
      </Box>
    </div> : ''}
  </div>
  );
};

export default Navbar;
