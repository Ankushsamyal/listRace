import React from 'react'
import { Box, Card, CardActionArea, CardContent, Typography, Button, createTheme, ThemeProvider } from '@mui/material'
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import FmdGoodTwoToneIcon from '@mui/icons-material/FmdGoodTwoTone';
import './style.css';

function CardPages() {
  const theme = createTheme({
    palette: {
      color12: '#999999',
      color334: '#000000',
    },
  });
  return (
    <div>
      <Box className='Cardpage-mainbox' >
        <Card className='Hero-cards' sx={{ minWidth: 300, maxWidth: 300, margin: '20px' }}>
          <CardActionArea sx={{ padding: '30px', '&:hover': { boxShaadow: '0 4px rgba(0,0,0,0.2)', backgroundColor: '#ff4d4d', color: 'whitesmoke' } }}>
            <CardContent className='Card-content' >
              <TipsAndUpdatesTwoToneIcon fontSize='large' />
              <Typography variant='h6'  sx={{marginBottom:'10px'}}> choose what to do </Typography>
              <Typography variant='body ' className='bodyCard' sx={{ textAlign: 'center' }}>Lorem ipsum dolor sit amet consectetur
                adipisicing elit.Obcaecati deleniti suscipit nisi dolor, beatae illum quaerat quia, incidunt,
                tempora reiciendis voluptatum debitis!
              </Typography>
              <ThemeProvider theme={theme}>

                <Button color='color12' style={{ display: 'block', marginTop: '20px', }} variant="outlined">Read More</Button>
              </ThemeProvider>

            </CardContent>
          </CardActionArea>
        </Card>
        <Card className='Hero-cards' sx={{ minWidth: 300, maxWidth: 300, margin: '20px' }}>
          <CardActionArea sx={{ padding: '30px', '&:hover': { boxShaadow: '0 4px rgba(0,0,0,0.2)', backgroundColor: '#ff4d4d', color: 'whitesmoke' } }}>
            <CardContent className='Card-content'>
              <PersonSearchTwoToneIcon fontSize='large' />
              <Typography variant='h6' sx={{marginBottom:'10px'}}> choose what to do </Typography>
              <Typography variant='body' className='bodyCard'>Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Obcaecati deleniti suscipit nisi dolor, beatae illum quaerat quia,
                incidunt, tempora reiciendis voluptatum debitis?</Typography> <ThemeProvider theme={theme}>

                <Button color='color12' style={{ display: 'block', marginTop: '20px', }} variant="outlined">Read More</Button>
              </ThemeProvider>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className='Hero-cards' sx={{ minWidth: 300, maxWidth: 300, margin: '20px' }}>
          <CardActionArea sx={{ padding: '30px', '&:hover': { boxShaadow: '0 4px rgba(0,0,0,0.2)', backgroundColor: '#ff4d4d', color: 'whitesmoke' } }}>
            <CardContent className='Card-content'>
              <FmdGoodTwoToneIcon fontSize='large' />
              <Typography variant='h6' sx={{marginBottom:'10px'}}> choose what to do </Typography>
              <Typography variant='body' className='bodyCard'>Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Obcaecati deleniti suscipit nisi dolor, beatae illum quaerat quia, incidunt,
                tempora reiciendis voluptatum debitis!
              </Typography>
              <ThemeProvider theme={theme}>

                <Button color='color12' style={{ display: 'block', marginTop: '20px', }} variant="outlined">Read More</Button>
              </ThemeProvider>

            </CardContent>
          </CardActionArea>
        </Card>
      </Box>

    </div>
  )
}

export default CardPages