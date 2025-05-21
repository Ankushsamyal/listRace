import React, { useContext, useEffect, useState } from 'react';
import ExploreCards from '../../CommonComponents/CommanExploreCards';
import CustomPopOver from '../../CommonComponents/CustomPopOver';
import { Skeleton, Box, Stack } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CancelIcon from '@mui/icons-material/Cancel';
import { AuthContext } from '../../CommonComponents/AuthContext';

function Explore() {
  const [exploreData, setExploreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [flag, setFlag] = useState(true);
  const { user } = useContext(AuthContext);
  const [saveBookmark, setSaveBookmark] = useState([]);

  // Fetch explore data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/explore');
        const data = await res.json();
        setExploreData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch user's bookmarks
  // useEffect(() => {
    
  //     const fetchBookmarks = async () => {
  //       try {
  //         const res = await fetch(`http://localhost:5000/api/bookmark/${userID}`);
  //         const data = await res.json();
  //        if (user && userId) { 
  //         setSaveBookmark(data);}
  //       } catch (err) {
  //         console.error('Error fetching bookmarks:', err);
  //       }
  //     };
  //     fetchBookmarks();
    
  // }, [user]);

  // Save to backend on change
  useEffect(() => {
    const saveBookmarksToAPI = async () => {
      if (!user || !user.id || saveBookmark.length === 0) return;

      try {
        const res = await fetch('http://localhost:5000/api/bookmark', {
          method: 'POST',
          body: JSON.stringify({ userId: user.id, bookmarks: saveBookmark })
        });

        if (!res.ok) {
          throw new Error(`Failed to save bookmark: ${res.status}`);
        }

        const result = await res.json();
        console.log('Bookmarks saved:', result);
      } catch (err) {
        console.error('Bookmark save failed:', err);
      }
    };

    saveBookmarksToAPI();
  }, [saveBookmark, user]);

  const clearAllBookmarks = () => {
    setSaveBookmark([]);
    setAnchorEl(null);
  };

  const showBookmarkData = (event) => {
    if (saveBookmark.length === 0) {
      alert("No saved data found");
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="E-Main-Box">
      {/* Header Skeleton */}
      {loading ? (
        <Box sx={{ width: '100%' }}>
          <Skeleton
            className="e-lable"
            variant="text"
            width="30%"
            height={40}
            sx={{ mb: 1 }}
          />
          <Skeleton
            className="e-header"
            variant="text"
            width="80%"
            height={24}
          />
        </Box>
      ) : (
        <div className="e-lable">
          <h2 className="e-header">explore</h2>
          <div className="htw-subheader">
            Explore New place, food, culture around the world and many more
          </div>
        </div>
      )}

      {/* Bookmark Button Skeleton */}
      {loading ? (
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: '40px',
          alignItems: 'center',
          gap: '5px',
          mb: 3
        }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={80} height={24} />
        </Box>
      ) : (
        <div
          onClick={showBookmarkData}
          className="bookmark-icon"
          style={{
            justifyContent: "end",
            paddingRight: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <BookmarkIcon />
          <h3>Bookmark</h3>
        </div>
      )}

      {/* Cards Skeleton */}
      {loading ? (
        <Stack spacing={3}>
          {[...Array(4)].map((_, index) => (
            <Box key={index} sx={{ width: '100%' }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ borderRadius: 2 }}
              />
              <Box sx={{ pt: 1 }}>
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </Box>
            </Box>
          ))}
        </Stack>
      ) : (
        <>
          <ExploreCards
          user={user}
            data={exploreData}
            setSaveBookmark={setSaveBookmark}
            saveBookmark={saveBookmark}
          />
          <CustomPopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                        <div onClick={clearAllBookmarks}>
              <h4>Clear All</h4>
              <CancelIcon />
            </div>
            <ExploreCards
              setAnchorEl={setAnchorEl}
              data={saveBookmark}
              flag={flag}
              setFlag={setFlag}
              setSaveBookmark={setSaveBookmark}
              saveBookmark={saveBookmark}
            />
          </CustomPopOver>
        </>
      )}
    </div>
  );
}

export default Explore;
