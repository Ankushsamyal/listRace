// StyledComponents.js
import styled from 'styled-components';
import { Box, Stack, TextField } from '@mui/material';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 20px;
  align-item: center;
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 0;

  & .MuiOutlinedInput-root {
  
    
  border-radius: 15px;
  background: #e0e5ec;
  box-shadow: inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff;
  
  & fieldset {
    border: none;
    }
    
    &.Mui-focused {
      box-shadow: inset 2px 2px 5px #bebebe, inset -2px -2px 5px #ffffff;
      }
      }
      
      & .MuiInputLabel-root {
        color: #6b6b6b;
        
        &.Mui-focused {
          color: #ff545a;
          }
          }
          
          & .MuiInputBase-input {
    color: #4a4a4a;
  }
`;

export const AlertWrapper = styled(Stack)`
  position: fixed;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  padding: 16px;
  border-radius: 15px;
`;

export const PopoverWrapper = styled(Box)`
  padding: 24px;
  margin: 5px;
  border-radius: 15px;
  background: #e0e5ec;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  color: #4a4a4a;
`;
