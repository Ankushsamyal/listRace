import { Box, Typography } from '@mui/material';
import React from 'react';
import useIsMobile from '../../hooks/useIsMobile';


function ReviewNumber() {
  const isMobile = useIsMobile();

  return (
    <Box
      className="Review-number-mainbox"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: isMobile ? 3 : 6,
        padding: '20px 10px',
        height:isMobile?'none':'50vh'
      }}
    >
      {[
        { number: '90 K+', label: 'Listing' },
        { number: '40 K+', label: 'Listing Categories' },
        { number: '65 K+', label: 'Visitors' },
        { number: '50 K+', label: 'Happy Clients' },
      ].map(({ number, label }, index) => (
        <Box
          key={index}
          className="Re-number-sub-box"
          sx={{
            flex: isMobile ? '1 1 100%' : '1 1 200px',
            textAlign: 'center',
            padding: '10px 0',
          }}
        >
          <Typography fontSize={isMobile ? 36 : 50} fontWeight="bold" component="div">
            {number}
          </Typography>
          <Typography fontSize={isMobile ? 18 : 25} sx={{ lineHeight: 0.5 }}>
            {label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default ReviewNumber;
