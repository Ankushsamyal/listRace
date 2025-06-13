import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import data from './data.json';
import './style.css';
import StarIcon from '@mui/icons-material/Star';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import useIsMobile from '../../hooks/useIsMobile';

function ReviewCard() {
  const isMobile = useIsMobile();
  const slidesToShow = isMobile ? 1 : 3;

  const settings = {
    className: "center",
    centerMode: !isMobile,        
    infinite: true,
    centerPadding: 0,
    slidesToShow,
    speed: 300,            
    autoplay: true,
    autoplaySpeed: 1500,
    focusOnSelect: true,
    variableWidth: false,
  };

  return (
    <div className='Review-Card-Main-Box' style={{ padding: '20px 0' }}>
      <Box className="box-container" sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Slider {...settings}>
          {data && data.map((value, index) => (
            <div key={index} style={{ padding: '0 10px', boxSizing: 'border-box' }}>
              < Card
                className='Review-card'
                sx={{
                  width: '100% !important',
                  maxWidth: 375,
                  borderRadius: '0.7rem',
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  margin: '0 auto',
                  padding:'10px'
                }}
              >
                <CardContent className='Review-card-content'>
                  <Box className="Review-image-box" sx={{ display: 'flex' }}>
                    <CardMedia
                      sx={{
                        height: 51,
                        width: 51,
                        marginTop: '20px',
                        borderRadius: '50%',
                      }}
                      image={value.person_image}
                      title="person img"
                      component="img"
                      alt={value.name}
                    />
                    <Box sx={{ display: 'grid', marginLeft: '20px' }}>
                      <Typography variant="h5" className='Review-name' sx={{ color: 'black', paddingLeft: '5px' }}>
                        {value.name}
                      </Typography>
                      <Typography variant="div" className='Review-name' sx={{ color: 'text.secondary', paddingLeft: '5px' }}>
                        {value.place}, {value.country}
                      </Typography>
                      <Box>
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} sx={{ color: '#ffda2b' }} fontSize='small' />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <Typography component='p' sx={{ color: '#494949', marginTop: '10px' }} fontSize={12}>
                    {value.comment}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </Box>
    </div>
  );
}

export default ReviewCard;
