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
  const {  handleClick = () => { },anchorElPage , setAnchorElPage} = props;
  const finalValue = useSelector((state) => state.counter.finalValue);
  const open = Boolean(anchorElPage);
console.log(anchorElPage);
const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <ColorButton data_test_id="Search-Button" aria-describedby={id} variant="contained" onClick={()=>handleClick()} endIcon={<SearchIcon />}>
        Search
      </ColorButton>
     { anchorElPage && <Popover
      data_test_id="Search-Popover"
        className='Popover-but-style'
        id={id}
        open={anchorElPage}
        anchorEl={anchorElPage}
        onClose={()=>setAnchorElPage(false)}
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
        {finalValue && finalValue.map((value) => (

          <Typography data_test_id={value} key={value} id={value} component="div" sx={{ p: 2 }}>{value}</Typography>
        ))}
      </Popover>}
    </div>
  );
}
