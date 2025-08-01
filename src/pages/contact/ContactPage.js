import styled from '@emotion/styled';
import { Box, Button, TextField } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react'
import { CONTACT_CONSTANT } from '../../constant/HeadingConstant';


function Contact() {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    size: 'large',
    backgroundColor: '#ff545a',
    '&:hover': {
      backgroundColor: red[700],
    },
  }));
  return (
    <div className='Blog-main-box' style={{ backgroundColor: '#f8fafb', paddingTop: '20vh', marginTop: '13vh',paddingBottom:'30vh' }}>
      <div className="Blog-lable">
        <h2 className='Blog-header'>{CONTACT_CONSTANT.MAIN_TITLE}</h2>
        <div className="Blog-subheader" style={{padding:'10px'}}>{CONTACT_CONSTANT.SECONDARY_TITLE}</div>
        <Box style={{ marginTop: '60px',padding:'10px', display: 'flex', justifyContent: 'center' }}>


          <TextField
            id="outlined-start-adornment"
            sx={{
              m: 0, width: '40ch',
              backgroundColor: 'white', '& .MuiFilledInput-root': { backgroundColor: 'white', },
              margin: '0', '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none', }, '&:hover fieldset': { border: 'none', }, '&.Mui-focused fieldset': { border: 'none', }, },
              borderEndEndRadius: '5px',
              borderTopRightRadius: '5px',
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            placeholder="Enter your email here"

          />
          <ColorButton style={{ height: '56px', borderRadius: '0' }} variant="contained" >Contact Us</ColorButton>
        </Box>
      </div>
    </div>
  )
}

export default Contact