import { Box, Button, Card, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import React from 'react';
import data from './data.json'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import './style.css'

function ExploreCards() {
    const getBackgroundColor = (rating) => {
        if (rating >= 4.5) { return 'green'; }
        else if (rating >= 3) { return 'orange'; }
        else { return 'red'; }
    }

        return (
            <div className='E-Card-Main-Box'>
                <Box className="e-Card-box" >
                    {data && data.map(valuedata => (

                        <Card className='e-card' sx={{
                            maxWidth: 280, borderRadius: '0.7',
                            '&:hover': { boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }
                        }}><Box className="image-container">
                            <CardMedia
                                sx={{ height: 170 }}
                                image={valuedata.Himage_url}
                                title="hotel img"
                                className="large-image"
                            />
                            <Box >
                                <Button className="small-image" size='small' sx={{backgroundColor:'#ff3333',textAlign:'center',width:'40px',height:'20px',fontSize:'7px',fontWeight:'bold',color:'white',bottom:'40px',left:'10px'}}>{valuedata.feature}</Button>
                             <BookmarkBorderIcon fontSize="small" className="small-image"  sx={{bottom: '40px', right: '10px'}}/>
                             <ZoomOutMapIcon className='small-image' fontSize="small" sx={{bottom: '40px', right: '40px'}}/>
                            </Box>
                             </Box>
                            <CardContent className='E-card-content'>
                                <Typography className='e-Card-header' gutterBottom variant="h7" component="div">
                                    {valuedata.name}
                                </Typography>
                                <Box className="e-subheading-main-box">
                                    <Box className="e-sub-header-box" component='span'>
                                        <Typography className="e-rating" component='span' fontSize={13} sx={{ backgroundColor: getBackgroundColor(valuedata.rating) }} >{valuedata.rating}</Typography>
                                        <Typography className="e-rating-lable" component='span' fontSize={13}>{valuedata.ratting2}</Typography>
                                        <Divider orientation="vertical" flexItem />
                                        <Typography className="e-hotel-price-lable" component='span' fontSize={13}>Form
                                            <Typography className="e-hotel-price" component='span' fontSize={13} sx={{ color: 'red' }}> {valuedata.price}</Typography>
                                        </Typography>
                                        <Divider orientation="vertical" flexItem />
                                    </Box>
                                    <Typography className="e-typeofplace" fontSize={12}>{valuedata.type}</Typography>
                                </Box>
                                <Box className="e-image-box">
                                    
                                    <CardMedia
                                        sx={{ height: 51, width: 221 }}
                                        image={valuedata.person_url}
                                        title="hotel img"
                                        className='person-img'
                                    />
                                   
                                    <Typography variant="body2" sx={{ color: 'text.secondary', paddingLeft: '5px' }}>
                                        {valuedata.message}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box className="e-extrainfo">
                                    <Box>{valuedata.opening_status ?
                                        <Typography component='span' fontSize={11} sx={{ color: 'green' }}>Open Now</Typography> :
                                        <Typography component='span' fontSize={11} sx={{ color: 'red' }} >Close Now</Typography>}</Box>
                                    <Box >
                                        <LocationOnOutlinedIcon fontSize='small' className='e-style-icone' />
                                        <FileUploadOutlinedIcon fontSize='small' className='e-style-icone' />
                                        <FavoriteBorderOutlinedIcon fontSize='small' className='e-style-icone' />

                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}



                </Box>

            </div>
        )
    }

    export default ExploreCards