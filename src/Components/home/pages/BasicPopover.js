import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { red } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';

const ColorButton = styled(Button)(() => ({
  color: 'white',
  size: 'large',
  backgroundColor: '#ff545a',
  '&:hover': {
    backgroundColor: red[700],
  },
  height: '56px',
  marginLeft: '25px'
}));

export default function BasicPopover(props) {
  const {  handleClick = () => { },anchorEl , setanchorEl} = props;
 
  const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      
     { anchorEl && <Popover
      data_test_id="Search-Popover"
        className='Popover-but-style'
        id={id}
        open={anchorEl}
        anchorEl={anchorEl}
        onClose={()=>setanchorEl(false)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPaper-root': {
            width: 400,
          },
        }}

      >
       
      </Popover>}
    </div>
  );
}
