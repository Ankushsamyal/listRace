import React, { useState } from 'react'
import { Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material'
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined';
import '../style.css';
import BackpackOutlinedIcon from '@mui/icons-material/BackpackOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CustomPopOver from '../../../CommonComponents/CustomPopOver';
import Data from '../data.json'


const dataJson = [
    {
        "id": 1,
        "title": "Restaurant",
        "description": "150 listing",
        "icon": <DinnerDiningOutlinedIcon fontSize='large' />
    },
    {
        "id": 2,
        "title": "Best Place",
        "description": "214 listing",
        "icon": <BackpackOutlinedIcon fontSize='large' />

    },
    {
        "id": 3,
        "title": "Food",
        "description": "185 listing",
        "icon": <HotelOutlinedIcon fontSize='large' />

    },
    {
        "id": 4,
        "title": "Health Care",
        "description": "120 listing",
        "icon": <MedicalServicesOutlinedIcon fontSize='large' />

    },
    {
        "id": 5,
        "title": "Automotion",
        "description": "120 listing",
        "icon": <CarRepairOutlinedIcon fontSize='large' />

    },
    {
        "id": 6,
        "title": "RealEstate",
        "description": "220 listing",
        "icon": <ApartmentIcon fontSize='large' />

    }
]
function HeroCards() {
    const [anchorEl, setAnchorEl] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [itemsCityList, setItemsCityList] = useState([]);
    const handleClick = (title) => {
        const getcityList = Data.categories.find(item => item.name === title);
        let cityListArry = [];
        let itemListArry = [];

        getcityList.locations.forEach(element => {
            cityListArry.push(element.city);
            itemListArry.push(element.items);
        });
        setCityList(cityListArry);
        setItemsCityList(itemListArry);
        setAnchorEl(true);

    };

    return (<div className='hero-card-main-box'>
        <div style={{ paddingTop: '21vh' }}>
            <Box sx={{ display: 'grid', grid: 'auto / auto auto auto auto ', alignItems: 'center', margin: '0 auto' }}>
                {dataJson.map((value, index) => (
                    <Card className='Hero-cards' key={index} sx={{ minWidth: 200, margin: '20px' }}>
                        <CardActionArea onClick={() => handleClick(value.title)} sx={{ '&:hover': { boxShaadow: '0 4px rgbari(0,0,0,0.2)', backgroundColor: '#ff4d4d', color: 'whitesmoke' } }}>
                            <CardContent className='Card-content' sx={{ justifyItems: 'center', }}>
                                {value.icon}
                                <Typography variant='h6'>{value.title}  </Typography>
                                <Typography variant='body'>{value.description}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CustomPopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                            {cityList && cityList.map((name, index) => (
                                <Stack key={index} sx={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", margin: '10px' }} spacing={2}>
                                    <Typography variant='h6' sx={{ p: 1 }}>{name}</Typography>
                                    <Typography sx={{ p: 1 }}> {itemsCityList[index] && itemsCityList[index].join(", ")}
                                    </Typography>
                                </Stack>
                            ))}
                        </CustomPopOver>
                    </Card>))}
            </Box>
        </div>
    </div>
    )
}

export default HeroCards