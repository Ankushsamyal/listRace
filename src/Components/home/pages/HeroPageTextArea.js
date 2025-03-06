import React, { useEffect, useState } from 'react'
import { Box, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Data from '../data.json'
import BasicPopover from './BasicPopover';
import { incrementByAmount } from '../../redux/slice/counterSlice';
import { useDispatch } from 'react-redux';

function HeroPageTextArea() {
    const theme = createTheme({ palette: { primary: { main: '#ff545a' }, secondary: { main: '#1976d2' }, }, });
    const newData = Data.categories;
    const dispatch = useDispatch()
    const [whatchoose, setwhatchoose] = useState("")
    const [locationChoose, setlocationChoose] = useState("")
    const [anchorElPage, setAnchorElPage] = useState(false)

    const handleData = (event) => {
        setwhatchoose(event.target.value)
    }
    const handleData2 = (event) => {
        console.log(event.target.value,"event.target.value");
        
        setlocationChoose(event.target.value)
    }
   
    const selectedData = whatchoose.toLocaleLowerCase()
    const cityData2 = locationChoose.toLocaleLowerCase()
    useEffect(()=>{
        console.log(locationChoose,"locationChoose");
        
    },[locationChoose])

    const handleClick = ()=>{ 
        newData.map(value => {
        if (selectedData === value.name.toLocaleLowerCase()) {
            const filterValue= value.locations.find(item=>item.city.toLocaleLowerCase()===cityData2);
            console.log(filterValue,"filterValue");
            
            if(filterValue?.items.length>=0 ){
               dispatch(incrementByAmount(filterValue.items))

               setAnchorElPage(true);
           }else if(filterValue === undefined){
            dispatch(incrementByAmount(null))
           }
        }
        
        
        return 0
    })}
    return (
        <div style={{ padding: '40px' }}>
            <Box sx={{display:'flex'}}>
                <ThemeProvider theme={theme}>
                    <TextField
                        id="choose-what-to"
                        
                        sx={{
                            m: 0,
                            width: '40ch',
                            margin: '0', '& .MuiOutlinedInput-root': { '& fieldset': { border: '', }, '&:hover fieldset': { border: 'none', }, '&.Mui-focused fieldset': { border: 'none', }, },
                            backgroundColor: 'white',
                            '& .MuiFilledInput-root': {
                                backgroundColor: 'white',
                            },
                            borderTopLeftRadius: '5px',
                            borderEndStartRadius: '5px'

                        }}
                        placeholder="Ex: Place, Food"
                        slotProps={{
                            input: {
                                startAdornment: <div position="start" style={{ color: '#333333', paddingRight: '5px', fontWeight: 'bold' }}>What? </div>,
                                endAdornment: <FormatListBulletedIcon 
                                data_test_id="choose-what-to-data"/>
                            },
                        }}
                        value={whatchoose}
                        onChange={handleData}
                        
                    />
                    <TextField
                        id="choose-location"
                        
                        sx={{
                            m: 0, width: '40ch',
                            backgroundColor: 'white', '& .MuiFilledInput-root': { backgroundColor: 'white', },
                            margin: '0', '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none', }, '&:hover fieldset': { border: 'none', }, '&.Mui-focused fieldset': { border: 'none', }, },
                            borderEndEndRadius: '5px',
                            borderTopRightRadius: '5px'
                        }}
                        placeholder="Ex: New Delhi, Noida"
                        slotProps={{
                            input: {
                                data_test_id:"choose-location-data",
                                startAdornment: <div position="start" style={{ color: '#333333', fontWeight: 'bold', paddingRight: '5px' }}>Location</div>,
                                endAdornment: <GpsFixedIcon
                                 />

                            },
                        }}
                    value={locationChoose}
                    onChange={handleData2} 
                    />
                </ThemeProvider >
             <BasicPopover  handleClick={handleClick} anchorElPage={anchorElPage} setAnchorElPage={setAnchorElPage}/>
            </Box>

        </div>
    )
}

export default HeroPageTextArea