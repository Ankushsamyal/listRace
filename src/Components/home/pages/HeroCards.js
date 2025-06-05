import React, { useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography
} from '@mui/material';
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined';
import BackpackOutlinedIcon from '@mui/icons-material/BackpackOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CustomPopOver from '../../../commonComponents/PopOver';

const dataItems = [
  {
    id: 1,
    title: 'Restaurant',
    description: '150 listings',
    icon: <DinnerDiningOutlinedIcon fontSize="large" />
  },
  {
    id: 2,
    title: 'Best Place',
    description: '214 listings',
    icon: <BackpackOutlinedIcon fontSize="large" />
  },
  {
    id: 3,
    title: 'Food',
    description: '185 listings',
    icon: <HotelOutlinedIcon fontSize="large" />
  },
  {
    id: 4,
    title: 'Health Care',
    description: '120 listings',
    icon: <MedicalServicesOutlinedIcon fontSize="large" />
  },
  {
    id: 5,
    title: 'Automotion',
    description: '120 listings',
    icon: <CarRepairOutlinedIcon fontSize="large" />
  },
  {
    id: 6,
    title: 'RealEstate',
    description: '220 listings',
    icon: <ApartmentIcon fontSize="large" />
  }
];

// Neomorphic styles
const neoStyles = {

  mainContainer: {
    paddingTop: '15vh',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '50vh',
    width: '100%',
    paddingBottom: '50px'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)'
    },
    gap: '24px',
    padding: '20px',
    maxWidth: '1400px',
    margin: '0 auto',
    alignItems: 'flex-start' // Ensures cards fit content height
  },
  card: {
    minWidth: 200,
    borderRadius: '20px',
    background: '#e0e5ec',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: `
        8px 8px 12px #bebebe,
        -8px -8px 12px #ffffff
      `
    }
  },
  cardAction: {
    '&:hover': {
      '& .MuiCardContent-root': {
        color: '#ff545a'
      },
      '& svg': {
        color: '#ff545a'
      }
    }
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    color: '#4a4a4a',
    textAlign: 'center',
    '& svg': {
      color: '#6b6b6b',
      marginBottom: '16px',
      fontSize: '2.5rem'
    }
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  popoverItem: {
    borderRadius: '15px',
    background: '#e0e5ec',
    boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff',
    margin: '10px',
    padding: '16px'
  }
};

function HeroCards({ catagoriData, loading, error }) {
  const [anchorEl, setAnchorEl] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [itemsCityList, setItemsCityList] = useState([]);

  const handleClick = (title) => {
    const getcityList = catagoriData?.find((item) => item.name === title);
    let cityListArry = [];
    let itemListArry = [];

    getcityList?.locations?.forEach((element) => {
      cityListArry.push(element.city);
      itemListArry.push(element.items);
    });

    setCityList(cityListArry);
    setItemsCityList(itemListArry);
    setAnchorEl(true);
  };

  return (
    <Box sx={neoStyles.mainContainer}>
      <Box sx={neoStyles.gridContainer}>
        {dataItems.map((value, index) => (
          <Card key={index} sx={neoStyles.card}>
            <CardActionArea
              onClick={() => handleClick(value.title)}
              sx={neoStyles.cardAction}
            >
              <CardContent sx={neoStyles.cardContent}>
                {value.icon}
                <Typography variant="h6" sx={neoStyles.title}>
                  {value.title}
                </Typography>
                <Typography variant="body1">{value.description}</Typography>
              </CardContent>
            </CardActionArea>

            <CustomPopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
              {cityList &&
                cityList.map((name, index) => (
                  <Stack key={index} sx={neoStyles.popoverItem} spacing={1}>
                    <Typography variant="h6">{name}</Typography>
                    <Typography>
                      {itemsCityList[index] &&
                        itemsCityList[index].join(', ')}
                    </Typography>
                  </Stack>
                ))}
            </CustomPopOver>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default HeroCards;
