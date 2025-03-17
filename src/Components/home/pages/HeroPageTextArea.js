import React, { useEffect, useState } from 'react'
import { Alert, Autocomplete, Box, Stack, TextField } from '@mui/material';
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
    const [AutomaticLocations, setAutomaticLocations] = useState([])
    const handleData = (event) => { setwhatchoose(event.target.value) }
    const handleData2 = (event) => { setlocationChoose(event.target.value) }
    const selectedData = whatchoose.toLocaleLowerCase()
    const cityData2 = locationChoose.toLocaleLowerCase()
    const [isAlert, setIsAlert] = useState(false)
    const handleClick = () => {
        newData.map(value => {
            // debugger
            if (selectedData === value?.name?.toLocaleLowerCase()) {
                const filterValue = value?.locations?.find(item => item?.city.toLocaleLowerCase() === cityData2);
                if (filterValue?.items.length >= 0) {
                    dispatch(incrementByAmount(filterValue.items))
                    setAnchorElPage(true);
                    setIsAlert(false);
                }
                else {
                    setIsAlert(true);
                    dispatch(incrementByAmount(null));
                }
            }
            else{
                return 0
            }

        })
    }
    useEffect(() => {
        Data?.categories?.map(option2 => {
            if (selectedData === option2?.name.toLocaleLowerCase()) {
                const DataOption = option2?.locations?.map(FindingNames => {
                    return FindingNames?.city
                })
                setAutomaticLocations(DataOption)
            }
            return 0
        })
    }, [selectedData])
    return (
        <div style={{ padding: '40px',display:'flex' }}>
           <Box sx={{ display: 'flex' }}>
            {isAlert && (<Stack sx={{ 
            position: 'fixed', 
            top:"60%",
            left: "40%", 
            zIndex: 9999,  
            padding: 2
        }} spacing={2}>
          <Alert severity="error">Please select a valid Data</Alert>
        </Stack>)}
                <ThemeProvider theme={theme}>
                    <Stack id="stack-style-text" style={{ display: 'flex', flexDirection: 'row' }}>
                        <Autocomplete
                        id='AutoComplete-choose-what-to'
                            freeSolo
                            value={whatchoose}
                            onChange={(event, newValue) => {
                                setwhatchoose(newValue);
                            }}
                            disableClearable
                            options={Data.categories.map((option) => option.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id="choose-what-to"
                                    data_test_id="choose-what-to-data"
                                    sx={{
                                        m: 0, width: '40ch',
                                        backgroundColor: 'white', '& .MuiFilledInput-root': { backgroundColor: 'white', },
                                        margin: '0', '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none', }, '&:hover fieldset': { border: 'none', }, '&.Mui-focused fieldset': { border: 'none', }, },
                                        borderTopLeftRadius: '5px',
                                        borderBottomLeftRadius: '5px',
                                    }}
                                    placeholder="Ex: Place, Food"
                                    slotProps={{
                                        input: {
                                            data_test_id: "choose-what-to-data",
                                            ...params.InputProps,
                                            type: 'search',
                                            startAdornment: <div position="start" style={{ color: '#333333', paddingRight: '5px', fontWeight: 'bold' }}>What? </div>,
                                            endAdornment: <FormatListBulletedIcon
                                            />
                                        },
                                    }}
                                    value={whatchoose}
                                    onChange={handleData}

                                />)} />
                        <Autocomplete
                        id='Automatic-choose-location'
                            freeSolo
                            disableClearable
                            value={locationChoose}
                            onChange={(event, newValue) => {
                                setlocationChoose(newValue);
                            }}
                            options={AutomaticLocations}
                            renderInput={(params) => (
                                <TextField
                                    id="choose-location"
                                    {...params}
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
                                            data_test_id: "choose-location-data",
                                            ...params.InputProps,
                                            type: 'search',
                                            startAdornment: <div position="start" style={{ color: '#333333', fontWeight: 'bold', paddingRight: '5px' }}>Location</div>,
                                            endAdornment: <GpsFixedIcon
                                            />

                                        },
                                    }}
                                    value={locationChoose}
                                    onChange={handleData2}
                                />
                            )}
                        />
                    </Stack>
                </ThemeProvider >
                <BasicPopover handleClick={handleClick} anchorElPage={anchorElPage} setAnchorElPage={setAnchorElPage} />
            </Box>

        </div>
    )
}

export default HeroPageTextArea