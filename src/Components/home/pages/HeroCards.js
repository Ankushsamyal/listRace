import React from 'react'
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined';
import '../style.css';
import BackpackOutlinedIcon from '@mui/icons-material/BackpackOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';

function HeroCards() {
    return (<div className='hero-card-main-box'>
        <div style={{ paddingTop: '23vh'  }}>
            <Box sx={{ display:'grid',grid:'auto / auto auto auto auto ', alignItems: 'center', margin: '0 auto'}}>
                <Card className='Hero-cards' sx={{ minWidth: 200,margin:'10px' }}>
                    <CardActionArea sx={{ '&:hover': { boxShaadow: '0 4px rgbari(0,0,0,0.2)', backgroundColor: '#ff4d4d', color: 'whitesmoke' } }}>
                        <CardContent className='Card-content' sx={{ justifyItems: 'center', }}>
                            <DinnerDiningOutlinedIcon fontSize='large' />
                            <Typography variant='h6'> Restaurant </Typography>
                            <Typography variant='body'>150 listing</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card className='Hero-cards' sx={{ minWidth: 200,margin:'10px' }}>
                    <CardActionArea sx={{ '&:hover': { boxShaadow: '0 4px rgba(0,0,0,0.2)', backgroundColor: '#ff4d4d', color: 'whitesmoke' } }}>
                        <CardContent className='Card-content' sx={{ justifyItems: 'center' }}>
                            <BackpackOutlinedIcon fontSize='large' />
                            <Typography variant='h6'> Destination </Typography>
                            <Typography variant='body'>214 listing</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card className='Hero-cards' sx={{ minWidth: 200,margin:'10px' }}>
                    <CardActionArea sx={{ '&:hover': { boxShaadow: '0 4px rgba(0,0,0,0.2)', backgroundColor: '#ff4d4d', color: 'whitesmoke' } }}>
                        <CardContent className='Card-content' sx={{ justifyItems: 'center' }}>
                            <HotelOutlinedIcon fontSize='large' />
                            <Typography variant='h6'> Hotels </Typography>
                            <Typography variant='body'>185 listing</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card className='Hero-cards' sx={{ minWidth: 200,margin:'10px' }}>
                    <CardActionArea sx={{ '&:hover': { boxShaadow: '0 4px rgba(0,0,0,0.2)', backgroundColor: '#ff4d4d', color: 'whitesmoke' } }}>
                        <CardContent className='Card-content' sx={{ justifyItems: 'center' }}>
                            <MedicalServicesOutlinedIcon fontSize='large' />
                            <Typography variant='h6'> Health Care </Typography>
                            <Typography variant='body'>120 listing</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card className='Hero-cards' sx={{ minWidth: 200,margin:'10px' }}>
                    <CardActionArea sx={{ '&:hover': { boxShaadow: '0 4px rgba(0,0,0,0.2)', backgroundColor: '#ff4d4d', color: 'whitesmoke' } }}>
                        <CardContent className='Card-content' sx={{ justifyItems: 'center' }}>
                            <CarRepairOutlinedIcon fontSize='large' ></CarRepairOutlinedIcon>
                            <Typography variant='h6'> Automotion </Typography>
                            <Typography variant='body'>120 listing</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </div>
        </div>
    )
}

export default HeroCards