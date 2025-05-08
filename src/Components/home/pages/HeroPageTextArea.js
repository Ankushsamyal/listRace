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

function HeroPageTextArea( { catagoriData, isAlert,setIsAlert } ) {
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
        <div className='Main-Box-outter' style={{ paddingTop: '10vh', display: 'flex' }}>
            <Box className='Main-Box' sx={{ display: 'flex' }}>
                {isAlert && (
                    <Stack sx={{
                        position: 'fixed',
                        top: "60%",
                        left: "40%",
                        zIndex: 9999,
                        padding: 2
                    }} spacing={2}>
                        <Alert severity="error">Please select a valid Data</Alert>
                    </Stack>
                )}
                <ThemeProvider className='Theme-Provider' theme={theme}>
                    <Stack className='Main-Stack' id="stack-style-text" style={{ display: 'flex', flexDirection: 'row' }}>
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
                                        m: 0, width: '40ch',
                                        backgroundColor: 'white', '& .MuiFilledInput-root': { backgroundColor: 'white' },
                                        margin: '0', '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' } },
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
                                            endAdornment: <FormatListBulletedIcon />
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
                                        m: 0, width: '40ch',
                                        backgroundColor: 'white', '& .MuiFilledInput-root': { backgroundColor: 'white' },
                                        margin: '0', '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' } },
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
                                            endAdornment: <GpsFixedIcon />
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
                    customMargin="34px"
                >
                    Search
                </HeroButton>
                <CustomPopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                    {finalValue.map((value) => (
                        <Typography data_test_id={value} key={value} id={value} component="div" sx={{ p: 2 }}>{value}</Typography>
                    ))}
                </CustomPopOver>
            </Box>
        </div>
    );
}

export default HeroPageTextArea;
