import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material';
import { fetchBlog } from '../../API/ApiService';

const BlogCards = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBlog();
        setBlogData(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="BlogCards-Main-box" sx={{ paddingTop: 4 }}>
      <Box
        className="e-Card-box"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          padding: 5,
          gap: 6,
          justifyItems: 'center',
        }}
      >
        {blogData.map(({ id, image, title, PostBy, date, comment }) => (
          <Card
            key={id}
            className="e-card"
            sx={{
              maxWidth: 280,
              borderRadius: 0.7,
              '&:hover': {
                boxShadow:
                  'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
              },
            }}
          >
            <CardMedia sx={{ height: 170 }} image={image} title="blog image" />
            <CardContent className="E-card-content">
              <Typography
                className="e-Card-header"
                gutterBottom
                variant="subtitle1"
                component="div"
              >
                {title}
              </Typography>

              <Box className="e-subheading-main-box">
                <Box className="e-sub-header-box" component="span" display="flex" alignItems="center" gap={1}>
                  <Typography
                    sx={{ color: 'text.secondary' }}
                    component="span"
                    fontSize={13}
                  >
                    Posted By
                  </Typography>
                  <Typography className="e-rating-lable" component="span" fontSize={13}>
                    {PostBy}
                  </Typography>

                  <Divider orientation="vertical" flexItem />
                  <Typography
                    className="e-hotel-price-lable"
                    sx={{ textTransform: 'uppercase', color: 'text.secondary' }}
                    component="span"
                    fontSize={13}
                  >
                    {date}
                  </Typography>
                </Box>
              </Box>

              <Box className="e-image-box">
                <Typography
                  variant="body2"
                  fontSize={15}
                  sx={{
                    color: 'text.secondary',
                    paddingLeft: 1,
                    lineHeight: '25px',
                  }}
                >
                  {comment}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default BlogCards;
