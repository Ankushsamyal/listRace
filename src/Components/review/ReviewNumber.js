import { Box, Typography } from '@mui/material'
import React from 'react'

function ReviewNumber() {
  return (
   <div className="Review-number-mainbox">
    <Box className='Re-number-sub-box'>
      <Typography fontSize={50}>90 K+</Typography>
      <Typography fontSize={25} sx={{lineHeight:'0.5'}}>Listing</Typography>
    </Box>
    <Box className='Re-number-sub-box'>
      <Typography fontSize={50}>40 k+</Typography>
      <Typography fontSize={25} sx={{lineHeight:'0.5'}}>Listing Categories</Typography>
    </Box>
    <Box className='Re-number-sub-box'>
      <Typography fontSize={50}>65 k+</Typography>
      <Typography fontSize={25} sx={{lineHeight:'0.5'}}>Visitors</Typography>
    </Box>
    <Box className='Re-number-sub-box'>
      <Typography fontSize={50}>50 k+</Typography>
      <Typography fontSize={25} sx={{lineHeight:'0.5'}}>Happy Clients</Typography>
    </Box>
   </div>
  )
}

export default ReviewNumber