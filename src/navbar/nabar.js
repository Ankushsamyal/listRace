import React, { useContext } from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import HeroButton from '../commonComponents/MainButton';
import { AuthContext } from '../commonComponents/AuthProvider';
import UserProfile from '../Login_Signup/ProfileDropdown/UserProfiles';


const styles = {
  container: {
    background: '#e0e5ec',
  },
  navBar: {
    background: '#e0e5ec',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px',
  },
  logo: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '25px',
    fontWeight: '700',
    color: '#4d4d4d',
    textShadow: `
      2px 2px 4px rgba(163, 177, 198, 0.6),
      -2px -2px 4px rgba(255, 255, 255, 0.8)
    `,
    padding: '8px 16px',
    borderRadius: '10px',
    background: '#e0e5ec',
    boxShadow: `
      inset 3px 3px 7px rgba(163, 177, 198, 0.6),
      inset -3px -3px 7px rgba(255, 255, 255, 0.8)
    `,
  },
  navLink: {
    margin: '0 4px',
    padding: '8px 16px',
    borderRadius: '10px',
    background: '#e0e5ec',
    color: '#5a5a5a',
    fontWeight: '500',
    textTransform: 'uppercase',
    transition: 'all 0.2s ease',
    //   5px 5px 10px rgba(163, 177, 198, 0.6),
    //   -5px -5px 10px rgba(255, 255, 255, 0.8)
    // `,
    '&:hover': {
      boxShadow: `
        inset 3px 3px 5px rgba(163, 177, 198, 0.6),
        inset -3px -3px 5px rgba(255, 255, 255, 0.8)
      `,
      color: 'red',
      
    },
  },
  socialIcon: {
    background: '#e0e5ec',
    borderRadius: '50%',
    padding: '8px',
    margin: '0 5px',
    color: '#6a6a6a',
    transition: 'all 0.2s ease',
    boxShadow: `
      5px 5px 10px rgba(163, 177, 198, 0.6),
      -5px -5px 10px rgba(255, 255, 255, 0.8)
    `,
    '&:hover': {
      boxShadow: `
        inset 3px 3px 5px rgba(163, 177, 198, 0.6),
        inset -3px -3px 5px rgba(255, 255, 255, 0.8)
      `,
    },
  },
  footer: {
    background: '#e0e5ec',
    color: '#6a6a6a',
    padding: 4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

const Navbar = ({ footerNav }) => {
   const { user } = useContext(AuthContext);
  return (
    <div style={styles.container}>
      <AppBar
        position={!footerNav ? 'fixed' : 'static'}
        elevation={0}
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          height: footerNav ? '100px' : '80px',
        }}
      >
        <Toolbar sx={{ height: '100%', display: 'flex', justifyContent: 'space-between', ...styles.navBar }}>
          <Box sx={{ flexGrow: 1, ml: 2 }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex' }}>
              <Box component="h1" sx={styles.logo}>
                BlazeBloom
              </Box>
            </Link>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {['/', '/explore', '/review', '/blog', '/contact'].map((path) => (
              <Link key={path} to={path} style={{ textDecoration: 'none' }}>
                <Box sx={styles.navLink}>
                  {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
                </Box>
              </Link>
            ))}
            {(user ==null) ?<Link to="/login" style={{ textDecoration: 'none', marginLeft: '16px' }}>
              <HeroButton >LOGIN</HeroButton>
            </Link>:<UserProfile/>}
            
          </Box>
        </Toolbar>
      </AppBar>

      {footerNav && (
        <Box sx={styles.footer}>
          {/* <Divider variant="middle" sx={{ background: '#d1d9e6' }} /> */}
          <Box sx={{ fontSize: '14px', color: '#8a8a8a' }}>
            © Copyright. Designed and developed by Ankush Samyal
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <PhoneIcon sx={{ fontSize: '16px', mr: 1 }} />
              +91 90765467808
            </Box>
            <Box sx={{ display: 'flex' }}>
              {[
                { icon: <FacebookIcon />, url: 'https://www.facebook.com' },
                { icon: <GoogleIcon />, url: 'https://www.google.com' },
                { icon: <YouTubeIcon />, url: 'https://www.youtube.com' },
                { icon: <LinkedInIcon />, url: 'https://www.linkedin.com' },
              ].map((social, index) => (
                <a key={index} href={social.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <Box sx={styles.socialIcon}>{social.icon}</Box>
                </a>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Navbar;
