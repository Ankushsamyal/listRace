import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react'


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
    <div className='Blog-main-box' style={{backgroundColor:'#f8fafb',height:'70vh',paddingTop:'20vh'}}>
    <div className="Blog-lable">
      <h2 className='Blog-header'>
      do you want to add your business listing with us?</h2>
      <div className="Blog-subheader">Listrace offer you to list your business with us and we very much able to promote your Business.</div>
  <div style={{paddingTop:'60px',display:'flex',justifyContent:'center'}}>


 <TextField
                        id="outlined-start-adornment"
                        sx={{
                            m: 0, width: '40ch',
                            backgroundColor: 'white', '& .MuiFilledInput-root': { backgroundColor: 'white', },
                             margin: '0', '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none', }, '&:hover fieldset': { border: 'none', }, '&.Mui-focused fieldset': { border: 'none', }, },
                            borderEndEndRadius: '5px',
                            borderTopRightRadius: '5px',
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                        }}
                        placeholder="Enter your email here"
                        
                    />
    <ColorButton style={{ height: '56px',borderRadius:'0' }} variant="contained" >Create Account</ColorButton>
  </div>
    </div>
  </div>
  )   
}

export default Contact