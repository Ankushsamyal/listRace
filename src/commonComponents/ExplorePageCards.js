    import { Box, Button, Card, CardContent, CardMedia, Divider, Typography } from '@mui/material'
    import React, { useContext } from 'react';
    import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
    import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
    import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
    import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
    import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
    import CloseIcon from '@mui/icons-material/Close';
    import BookmarkIcon from '@mui/icons-material/Bookmark';
    import '../components/explore/style.css';
import { AuthContext } from './AuthProvider';

    const iconStyle = (valuedata) => ({
        fontSize: 'large',
        '&:hover': {
            color: valuedata.opening_status ? 'green' : 'red',
        },
    });
    const PhotoiconStyle = () => ({
        fontSize: 'large',
        background: 'none',
        bottom: '40px',
        right: '10px',
        '&:hover': {
            color: "red"
        },
    });
    function ExploreCards({ data, saveBookmark, flag,setSaveBookmark }) {
        
          const { user } = useContext(AuthContext);
        const getBackgroundColor = (rating) => {
            if (rating >= 4.5) return 'green';
            else if (rating >= 3) return 'orange';
            else return 'red';
        }
        const openImage = (imageUrl) => {
            window.open(imageUrl);
        }

// Add a bookmark (only updates state)

  const openBookmark = (BookMarkData) => {
    if(!user) {
        alert ("Login to save this place")
    }
    else{
    const updatedBookmarks = [...saveBookmark, BookMarkData];
    setSaveBookmark(updatedBookmarks);}
  };

  // Remove a specific bookmark (only updates state)
  const clearBookmark = (FindSaveBookmark) => {
    const updatedBookmarks = saveBookmark.filter((item) => item.id !== FindSaveBookmark.id);
    setSaveBookmark(updatedBookmarks);
  };



        return (
            <div className='E-Card-Main-Box'>
                <Box className="e-Card-boxss" style={{
                    display:'grid',
                    grid: flag ? 'auto / auto' : 'auto / auto auto auto',
                    padding: '40px',
                    gridGap: '40px',
                    justifyContent: 'space-evenly'
                }}>
                    {data && data.map((valuedata, index) => (

                        <Card className='e-card' key={index} sx={{
                            maxWidth: 280, borderRadius: '0.7',
                            '&:hover': { boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }
                        }}><Box className="image-container">
                                <CardMedia
                                    sx={{ height: 170 }}
                                    image={valuedata.Himage_url}
                                    title="hotel img"
                                    className="large-image"
                                />
                                <Box >
                                    <Button className="small-image" size='small' sx={{ backgroundColor: '#ff3333', textAlign: 'center', width: '40px', height: '20px', fontSize: '7px', fontWeight: 'bold', color: 'white', bottom: '40px', left: '10px' }}>{valuedata.feature}</Button>
                                    {flag && flag
                                        ?
                                        <CloseIcon fontSize="small"
                                            className="small-image"
                                            sx={PhotoiconStyle}
                                            onClick={() => { clearBookmark(valuedata) }}></CloseIcon>
                                        :
                                        saveBookmark.some((item) => item.id === valuedata.id) ?
                                            <BookmarkIcon
                                                fontSize="small"
                                                className="small-image"
                                                sx={PhotoiconStyle}
                                                style={{ color: 'red' }} />
                                            :
                                            <BookmarkBorderIcon
                                                onClick={() => { openBookmark(valuedata) }}
                                                fontSize="small"
                                                className="small-image"
                                                sx={PhotoiconStyle} />
                                    }
                                    <ZoomOutMapIcon onClick={() => { openImage(valuedata.Himage_url) }}
                                        className='small-image'
                                        fontSize="large"
                                        sx={PhotoiconStyle}
                                        style={{ right: '40px' }} />
                                </Box>
                            </Box>
                            <CardContent className='E-card-content'>
                                <Typography className='e-Card-header' gutterBottom variant="h7" component="div">
                                    {valuedata.name}
                                </Typography>
                                <Box className="e-subheading-main-box">
                                    <Box className="e-sub-header-box" component='span'>
                                        <Typography className="e-rating" component='span' fontSize={13} sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
                                            backgroundColor: getBackgroundColor(valuedata.rating),
                                            height: '15px',
                                            alignContent: 'center'
                                        }} >{valuedata.rating}</Typography>
                                        <Typography className="e-rating-lable" component='span' fontSize={13}>{valuedata.ratting2}</Typography>
                                        <Divider orientation="vertical" flexItem />
                                        <Typography className="e-hotel-price-lable" component='span' fontSize={13}>Form
                                            <Typography className="e-hotel-price" component='span' fontSize={13} sx={{ color: 'red' }}> {valuedata.price}</Typography>
                                        </Typography>
                                        <Divider orientation="vertical" flexItem />
                                    </Box>
                                    <Typography className="e-typeofplace" fontSize={12}>{valuedata.type}</Typography>
                                </Box>
                                <Box className="e-image-box">

                                    <CardMedia
                                        sx={{ height: 51, width: 221 }}
                                        image={valuedata.person_url}
                                        title="hotel img"
                                        className='person-img'
                                    />

                                    <Typography variant="body2" sx={{ color: 'text.secondary', paddingLeft: '5px' }}>
                                        {valuedata.message}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box className="e-extrainfo">
                                    <Box>
                                        <Typography component='span' fontSize={11} sx={{ color: valuedata.opening_status ? "green" : "red" }}>
                                            {valuedata.opening_status ? "Open Now" : "Closed Now"}</Typography>
                                    </Box>
                                    <Box >
                                        <LocationOnOutlinedIcon sx={iconStyle(valuedata)} className="e-style-icone" />
                                        <FileUploadOutlinedIcon sx={iconStyle(valuedata)} className="e-style-icone" />
                                        <FavoriteBorderOutlinedIcon sx={iconStyle(valuedata)} className="e-style-icone" />
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}



                </Box>

            </div>
        )
    }

    export default ExploreCards