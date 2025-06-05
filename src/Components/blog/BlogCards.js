import { Box, Card, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import React from 'react'
import data from './data.json'

function BlogCards() {

    return (
        <div className='BlogCards-Main-box' style={{paddingTop:'30px'}}>
            <Box className="e-Card-box" >
                {data && data.map(value => (
                    <Card key={value.id} className='e-card' sx={{
                        maxWidth: 280, borderRadius: '0.7',
                        '&:hover': { boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }
                    }}>
                        <CardMedia
                            sx={{ height: 170 }}
                            image={value.image}
                            title="hotel img"
                        />
                        <CardContent className='E-card-content'>
                            <Typography className='e-Card-header' gutterBottom variant="h7" component="div">
                                {value.title}
                            </Typography>
                            <Box className="e-subheading-main-box">
                                <Box className="e-sub-header-box" component='span'>
                                    <div>

                                    <Typography sx={{color: 'text.secondary'}} component='span' fontSize={13} >Posted By </Typography>
                                    <Typography className="e-rating-lable" component='span' fontSize={13}>{value.PostBy}</Typography>
                                    </div>
                                   
                                    <Divider orientation="vertical" flexItem />
                                    <Typography className="e-hotel-price-lable" sx={{textTransform:'uppercase',color: 'text.secondary'}} component='span' fontSize={13}>
                                        {value.date}
                                    </Typography>
                                </Box>
                               
                            </Box>
                            <Box className="e-image-box">
                                
                                <Typography variant="body2" fontSize={15} sx={{ color: 'text.secondary', paddingLeft: '5px',lineHeight:'25px' }}>
                                  {value.comment}
                                </Typography>
                            </Box>

                        </CardContent>
                    </Card>
                ))}
            </Box>

        </div>
    )
}

export default BlogCards