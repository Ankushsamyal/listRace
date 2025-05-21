import React, { useEffect, useState } from 'react';
import { Alert, Autocomplete, Box, Stack, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { incrementByAmount } from '../../redux/slice/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomPopOver from '../../../CommonComponents/CustomPopOver';
import SearchIcon from '@mui/icons-material/Search';
import HeroButton from '../../../CommonComponents/HeroButton';

// Neomorphic styles
const neoStyles = {
  mainContainer: {
    paddingTop: '5vh',
    display: 'flex',
    justifyContent: 'center',
    // background: '#e0e5ec',
    // minHeight: '100vh',
    width: '100%'
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexDirection: { xs: 'column', sm: 'row' },
    padding: '20px',
    borderRadius: '20px',
    // background: '#e0e5ec',
    // boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '15px',
      background: '#e0e5ec',
      boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
      '& fieldset': { border: 'none' },
      '&.Mui-focused': {
        boxShadow: 'inset 2px 2px 5px #bebebe, inset -2px -2px 5px #ffffff',
      }
    },
    '& .MuiInputLabel-root': {
      color: '#6b6b6b',
      '&.Mui-focused': { color: '#ff545a' },
    },
    '& .MuiInputBase-input': { 
      color: '#4a4a4a',
    },
    width: '40ch', // Increased from 40ch to 60ch
    margin: '0'
  },
  alert: {
    position: 'fixed',
    top: '65%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    padding: '16px',
    borderRadius: '15px',
  },
  popover: {
    p: 3,
    margin:'5px',
    borderRadius: '15px',
    background: '#e0e5ec',
    boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
    color: '#4a4a4a',
  }
};

function HeroPageTextArea({ catagoriData, isAlert, setIsAlert }) {
    const theme = createTheme({ palette: { primary: { main: '#ff545a' }, secondary: { main: '#1976d2' } } });
    const dispatch = useDispatch();
    const [whatchoose, setwhatchoose] = useState('');
    const [locationChoose, setlocationChoose] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [AutomaticLocations, setAutomaticLocations] = useState([]);
    const finalValue = useSelector((state) => state.counter.finalValue || []);

    const handleData = (event) => { setwhatchoose(event.target.value); };
    const handleData2 = (event) => { setlocationChoose(event.target.value); };

    const selectedData = whatchoose.toLocaleLowerCase();
    const cityData2 = locationChoose.toLocaleLowerCase();

    const handleClick = () => {
        const checkValue = catagoriData.filter(item => item.name.toLocaleLowerCase() === selectedData);
        if (checkValue.length <= 0) {
            setIsAlert(true);
        } else {
            const filterValue = checkValue[0]?.locations?.find(item => item?.city?.toLocaleLowerCase() === cityData2);
            if (filterValue && filterValue.items.length > 0) {
                setIsAlert(false);
                dispatch(incrementByAmount(filterValue.items));
                setAnchorEl(true);
            } else {
                setIsAlert(true);
                dispatch(incrementByAmount(null));
            }
        }
    };

    useEffect(() => {
        catagoriData.forEach(option2 => {
            if (selectedData === option2?.name.toLocaleLowerCase()) {
                const DataOption = option2?.locations?.map(FindingNames => FindingNames?.city) || [];
                setAutomaticLocations(DataOption);
            }
        });
    }, [selectedData, catagoriData]);

    return (
        <div style={neoStyles.mainContainer}>
            <Box sx={neoStyles.searchContainer}>
                {isAlert && (
                    <Stack sx={neoStyles.alert} spacing={2}>
                        <Alert severity="error">Please select a valid Data</Alert>
                    </Stack>
                )}
                <ThemeProvider theme={theme}>
                    <Stack direction="row" spacing={1}>
                        <Autocomplete
                            id='AutoComplete-choose-what-to'
                            freeSolo
                            value={whatchoose}
                            onChange={(event, newValue) => setwhatchoose(newValue || '')}
                            disableClearable
                            options={catagoriData.map((option) => option.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id="choose-what-to"
                                    data_test_id="choose-what-to-data"
                                    sx={{
                                        ...neoStyles.textField,
                                        borderTopLeftRadius: '15px',
                                        borderBottomLeftRadius: '15px',
                                    }}
                                    placeholder="Ex: Place, Food"
                                    slotProps={{
                                        input: {
                                            data_test_id: "choose-what-to-data",
                                            ...params.InputProps,
                                            type: 'search',
                                            startAdornment: <div position="start" style={{ 
                                              color: '#6b6b6b', 
                                              paddingRight: '10px', 
                                              fontWeight: 'bold'
                                            }}>What? </div>,
                                            endAdornment: <FormatListBulletedIcon sx={{ color: '#6b6b6b' }} />
                                        },
                                    }}
                                    onChange={handleData}
                                />
                            )}
                        />
                        <Autocomplete
                            id='Automatic-choose-location'
                            freeSolo
                            disableClearable
                            value={locationChoose}
                            onChange={(event, newValue) => setlocationChoose(newValue || '')}
                            options={AutomaticLocations}
                            renderInput={(params) => (
                                <TextField
                                    id="choose-location"
                                    {...params}
                                    sx={{
                                        ...neoStyles.textField,
                                        borderTopRightRadius: '15px',
                                        borderBottomRightRadius: '15px',
                                    }}
                                    placeholder="Ex: New Delhi, Noida"
                                    slotProps={{
                                        input: {
                                            data_test_id: "choose-location-data",
                                            ...params.InputProps,
                                            type: 'search',
                                            startAdornment: <div position="start" style={{ 
                                              color: '#6b6b6b', 
                                              fontWeight: 'bold', 
                                              paddingRight: '10px'
                                            }}>Location</div>,
                                            endAdornment: <GpsFixedIcon sx={{ color: '#6b6b6b' }} />
                                        },
                                    }}
                                    onChange={handleData2}
                                />
                            )}
                        />
                    </Stack>
                </ThemeProvider>
                <HeroButton
                    handleClick={handleClick}
                    endIcon={<SearchIcon />}
                    customMargin="0"
                    customHeight="55px"
                    sx={{
                        borderRadius: '15px',
                        background: '#e0e5ec',
                        boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff',
                        '&:active': {
                            boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
                        },
                        color: '#ff545a',
                        fontWeight: 'bold'
                    }}
                >
                    Search
                </HeroButton>
                <CustomPopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                    {finalValue.map((value) => (
                        <Typography 
                            data_test_id={value} 
                            key={value} 
                            id={value} 
                            component="div" 
                            sx={neoStyles.popover}
                        >
                            {value}
                        </Typography>
                    ))}
                </CustomPopOver>
            </Box>
        </div>
    );
}

export default HeroPageTextArea;    