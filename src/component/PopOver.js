import * as React from 'react';
import Popover from '@mui/material/Popover';

export default function CustomPopOver(props) {
  const { children, anchorEl, setAnchorEl } = props;
  const handleClose = () => { setAnchorEl(null); };  

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
      <Popover
      data_test_id="Search-Popover"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: "none",
          borderRadius: 0,
          overflow: "auto",
        }}
      >
        {children}
      </Popover>
  );
}
