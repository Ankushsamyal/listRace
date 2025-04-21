import React, { useEffect, useState } from 'react';
import './style.css';
import ExploreCards from './ExploreCards';
import data from './data.json';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CustomPopOver from '../../CommonComponents/CustomPopOver';
import CancelIcon from '@mui/icons-material/Cancel';

function Explore() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [flag, setFlag] = useState(true);
  const [saveBookmark, setSaveBookmark] = useState(() => {
    const savedRating = localStorage.getItem('saveBookmark');
    try {
      return savedRating ? JSON.parse(savedRating) : [];
    } catch (e) {
      return [];
    }
  });
  useEffect(() => {
    const filterDublicateData = [...new Set(saveBookmark)];
    if (JSON.stringify(filterDublicateData) !== JSON.stringify(saveBookmark)) {
      setSaveBookmark(filterDublicateData);
      localStorage.setItem('saveBookmark', JSON.stringify(filterDublicateData));
    }
  }, [saveBookmark]);
  const clearAllBookmarks = () => {
    localStorage.clear();
    setSaveBookmark([]);
    setAnchorEl(null);
  };

  const showBookmarkData = (event) => {
    if (saveBookmark.length === 0) {
      setAnchorEl(null);
      alert("No saved data found");
    }
    else
      setAnchorEl(event.currentTarget);
  };

  return (
    <div className="E-Main-Box">
      <div className="e-lable">
        <h2 className="e-header">explore</h2>
        <div className="htw-subheader">
          Explore New place, food, culture around the world and many more
        </div>
      </div><div onClick={showBookmarkData} className="bookmark-icon" style={{ justifyContent: "end", paddingRight: '40px', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <BookmarkIcon />
        <h3>Bookmark</h3>
      </div>
      <ExploreCards
        data={data}
        setSaveBookmark={setSaveBookmark}
        saveBookmark={saveBookmark}
      />
      {/* This is ExploreCards is reused */}
      <CustomPopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        <div onClick={clearAllBookmarks} style={{ justifyContent: 'end', padding: '10px', display: 'flex', height: '20px', alignItems: 'center', gap: '5px' }}>
          <h4>Clear All</h4>
          <CancelIcon></CancelIcon>
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
    </div>
  );
}

export default Explore;