import React, { useEffect, useState } from 'react';
import ExploreCards from '../../component/ExplorePageCards';
import CustomPopOver from '../../component/PopOver';
import { Skeleton, Box, Stack, Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { fetchBookmarks, fetchExplore, PostBookmark } from '../../API/ApiService';
import DeleteIcon from '@mui/icons-material/Delete';
import { EXPORT_CONSTANT } from '../../constant/HeadingConstant';

function Explore() {
  const [exploreData, setExploreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setIsAlert] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [flag, setFlag] = useState(true);
  const user = sessionStorage.getItem('userId')
  const [saveBookmark, setSaveBookmark] = useState([]);

  //first api to run
  useEffect(() => {
    const fetchExploreData = async () => {
      try {
        setLoading(false);
        setIsAlert(null);
        const exploreData = await fetchExplore();
        setExploreData(exploreData);
      } catch (err) {
        setLoading(true);
        console.error('Error fetching explore data:', err);
      }
    };
    fetchExploreData()
  }, []);

  //then this will run
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const bookmarksData = await fetchBookmarks();
        const userBookmarks = bookmarksData.find(item => item.userId === user);
        console.log("user bookmark data", userBookmarks)
        if (userBookmarks.userId) {
          setSaveBookmark(userBookmarks.bookmarks);
        }
      } catch (err) {
        setLoading(true);
        console.error('Error fetching bookmarks:', err);
        setIsAlert(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // post bookmark mark
  useEffect(() => {
    if (user) {
      const syncBookmarks = async () => {
        try {
          const result = await PostBookmark(user, saveBookmark);
          console.log('Bookmarks synced:', result);
        } catch (err) {
          console.error('Error syncing bookmarks:', err);
        }
      };

      syncBookmarks();

    }
    else return;

  }, [saveBookmark, user]);





  // Clear all bookmarks
  const clearAllBookmarks = () => {
    setSaveBookmark([]);
    setAnchorEl(null);
  };

  // Show bookmark popover
  const showBookmarkData = (event) => {
    if (!user) {
      alert("Please login first");
      return
    }
    else if (saveBookmark.length === 0) {
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
          <Skeleton className="e-lable" variant="text" width="30%" height={40} sx={{ mb: 1 }} />
          <Skeleton className="e-header" variant="text" width="80%" height={24} />
        </Box>
      ) : (
        <div className="e-lable">
          <h2 className="e-header">{EXPORT_CONSTANT.MAIN_TITLE}</h2>
          <div className="htw-subheader">{EXPORT_CONSTANT.SECONDARY_TITLE}</div>
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
        <Button className="bookmark-icon"
          style={{ paddingLeft: '5%',fontWeight:'bolder' }}
          color='black'
          size='large'
          onClick={showBookmarkData}
          startIcon={<BookmarkIcon />}>
          Bookmark</Button>
      )}

      {/* Cards Skeleton */}
      {loading ? (
        <Stack spacing={3}>
          {[...Array(4)].map((_, index) => (
            <Box key={index} sx={{ width: '100%' }}>
              <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
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
            data={exploreData}
            setSaveBookmark={setSaveBookmark}
            saveBookmark={saveBookmark}
            user={user}
          />
          <CustomPopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
            <Button sx={{ margin: '20px' }} onClick={clearAllBookmarks} variant="outlined" startIcon={<DeleteIcon />}>
              Delete all
            </Button>
            <ExploreCards
              setAnchorEl={setAnchorEl}
              data={saveBookmark}
              flag={flag}
              setFlag={setFlag}
              saveBookmark={saveBookmark}
              setSaveBookmark={setSaveBookmark}
            />
          </CustomPopOver>
        </>
      )}
    </div>
  );
}

export default Explore;
