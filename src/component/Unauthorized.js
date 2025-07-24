import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Unauthorized() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        px: 2,
      }}
    >
      <Typography variant="h4" align="center">
        🚫 You don’t have permission to access this page.
      </Typography>
    </Box>
  );
}
