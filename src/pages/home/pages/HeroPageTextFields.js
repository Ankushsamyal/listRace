import React, { useEffect, useState } from 'react';
import { Alert, Autocomplete, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { incrementByAmount, selectFinalValue } from '../../../redux_store/slice/CounterSlice';
import CustomPopOver from '../../../component/PopOver';
import HeroButton from '../../../component/MainButton';
import {
    MainContainer,
    SearchContainer,
    StyledTextField,
    AlertWrapper,
    PopoverWrapper
} from './StyledComponents';
import useIsMobile from '../../../hooks/useIsMobile';

function HeroPageTextArea({ catagoriData, isAlert, setIsAlert }) {
    const theme = createTheme({
        palette: {
            primary: { main: '#ff545a' },
            secondary: { main: '#1976d2' },
        },
    });

    const dispatch = useDispatch();
    const [whatchoose, setwhatchoose] = useState('');
    const [locationChoose, setlocationChoose] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [AutomaticLocations, setAutomaticLocations] = useState([]);
    const finalValue = useSelector(selectFinalValue);
    const handleData = (event) => setwhatchoose(event.target.value);
    const handleData2 = (event) => setlocationChoose(event.target.value);
    const isMobile = useIsMobile(768)
    const selectedData = whatchoose.toLowerCase();
    const cityData2 = locationChoose.toLowerCase();
    const handleClick = (event) => {
        const checkValue = catagoriData.filter(item => item.name.toLowerCase() === selectedData);
        if (checkValue.length <= 0) {
            setIsAlert(true);
        } else {
            const filterValue = checkValue[0]?.locations?.find(item => item?.city?.toLowerCase() === cityData2);
            if (filterValue && filterValue.items.length > 0) {
                setIsAlert(false);
                dispatch(incrementByAmount(filterValue.items));
                setAnchorEl(event.currentTarget);
            } else {
                setIsAlert(true);
                dispatch(incrementByAmount(null));
            }
        }
    };

    useEffect(() => {
        catagoriData.forEach(option2 => {
            if (selectedData === option2?.name.toLowerCase()) {
                const DataOption = option2?.locations?.map(FindingNames => FindingNames?.city) || [];
                setAutomaticLocations(DataOption);
            }
        });
    }, [selectedData, catagoriData]);

    return (
        <MainContainer>
            <SearchContainer>
                {isAlert && (
                    <AlertWrapper spacing={2}>
                        <Alert severity="error">Please select a valid Data</Alert>
                    </AlertWrapper>
                )}
                <ThemeProvider theme={theme}>
                    <Stack id='textField Stack' direction={isMobile ? "column" : 'row'} spacing={1} sx={{ width: '100%' }}>
                        <Autocomplete
                            id='AutoComplete-choose-what-to'
                            freeSolo
                            value={whatchoose}
                            onChange={(event, newValue) => setwhatchoose(newValue || '')}
                            disableClearable
                            options={catagoriData.map((option) => option.name)}
                            renderInput={(params) => (
                                <StyledTextField
                                    {...params}
                                    width='auto'
                                    id="choose-what-to"
                                    data_test_id="choose-what-to-data"
                                    placeholder="Ex: Place, Food"
                                    onChange={handleData}
                                    sx={{ width: 300 }}
                                    InputProps={{
                                        style: { width: 'auto' },
                                        ...params.InputProps,
                                        type: 'search',
                                        startAdornment: (
                                            <span style={{ color: '#6b6b6b', paddingRight: '10px', fontWeight: 'bold' }}>
                                                What?
                                            </span>
                                        ),
                                        endAdornment: <FormatListBulletedIcon sx={{ color: '#6b6b6b' }} />,
                                    }}
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
                            sx={{ width: 300 }}
                            fullWidth
                            renderInput={(params) => (
                                <StyledTextField
                                    {...params}
                                    id="choose-location"
                                    placeholder="Ex: New Delhi, Noida"
                                    onChange={handleData2}
                                    fullWidth
                                    InputProps={{

                                        ...params.InputProps,

                                        type: 'search',
                                        startAdornment: (
                                            <span style={{ color: '#6b6b6b', paddingRight: '10px', fontWeight: 'bold' }}>
                                                Location
                                            </span>
                                        ),
                                        endAdornment: <GpsFixedIcon sx={{ color: '#6b6b6b' }} />,
                                    }}
                                />
                            )}
                        />
                    </Stack>
                </ThemeProvider>
                <HeroButton
                    handleClick={(event) => handleClick(event)}
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
                        fontWeight: 'bold',
                    }}
                >
                    Search
                </HeroButton>
                <CustomPopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                    {finalValue?.map((value) => (
                        <PopoverWrapper data_test_id={value} key={value} id={value}>
                            {value}
                        </PopoverWrapper>
                    ))}
                </CustomPopOver>
            </SearchContainer>
        </MainContainer>
    );
}

export default HeroPageTextArea;
