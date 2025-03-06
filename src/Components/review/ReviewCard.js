import { Box, Card, CardContent, CardMedia,Typography } from '@mui/material'
import React from 'react';
import data from './data.json'
import './style.css'
import StarIcon from '@mui/icons-material/Star';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ReviewCard() {
    const settings = { className: "center", 
        centerMode: true,
        infinite: true, 
        centerPadding: "60px", 
        slidesToShow: 3, 
        speed: 300, 
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2200, };
    return (
        <div className='Review-Card-Main-Box'>
            <Box className="box-container" >
            <Slider {...settings}> 
                {data && data.map(value => (
                    <Card className='Review-card' sx={{ maxWidth: 375, borderRadius: '0.7',boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                        <CardContent className='Review-card-content'>
                            <Box className="Review-image-box">
                                <CardMedia
                                   sx={{ height: 51, width: 51,marginTop:'20px' }}
                                   image={value.person_image}
                                   title="person img"
                                   className='person-img'
                                />
                                <Box sx={{ display: 'grid', marginLeft:'20px' }}>

                                    <Typography variant="h5" className='Review-name' sx={{ color:'black', paddingLeft: '5px' }}>
                                        {value.name}
                                    </Typography>
                                    <Typography variant="div" className='Review-name' sx={{ color: 'text.secondary', paddingLeft: '5px' }}>
                                        {value.place}, {value.country}
                                    </Typography>
                                    <Box>
                                    <StarIcon sx={{ color: '#ffda2b' }} fontSize='10' />
                                    <StarIcon sx={{ color: '#ffda2b' }} fontSize='10' />
                                    <StarIcon sx={{ color: '#ffda2b' }} fontSize='10' />
                                    <StarIcon sx={{ color: '#ffda2b' }} fontSize='10' />
                                    <StarIcon sx={{ color: '#ffda2b' }} fontSize='10' />
                                    </Box>
                                    </Box>
                                    </Box>
                                    <Typography component='body' sx={{color:'#494949',marginTop:'10px'}} fontSize={12}>{value.comment}</Typography>
                        </CardContent>
                    </Card>
                ))}
               </Slider>
            </Box>
        </div>
    )
}

export default ReviewCard