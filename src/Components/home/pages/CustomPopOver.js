import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

export default function CustomPopOver(props) {
  const { anchorEl, setAnchorEl, itemsCityList, cityList } = props
  const handleClose = () => { setAnchorEl(null); };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          maxWidth: "none",
          borderRadius: 0,
          overflow: "auto",
        }}
      >
        {cityList && cityList.map((name, index) => (
          <Stack key={index} sx={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", margin: '10px' }} spacing={2}>
            <Typography variant='h6' sx={{ p: 1 }}>{name}</Typography>
            <Typography sx={{ p: 1 }}> {itemsCityList[index] && itemsCityList[index].join(", ")}
             </Typography>
          </Stack>
        ))}
      </Popover>
    </div>
  );
}
