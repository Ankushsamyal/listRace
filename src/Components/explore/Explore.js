import React, { useEffect, useState } from 'react';
import './style.css';
import ExploreCards from '../../CommonComponents/CommanExploreCards';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CustomPopOver from '../../CommonComponents/CustomPopOver';
import CancelIcon from '@mui/icons-material/Cancel';
import { 
  Skeleton, 
  Box, 
  Stack 
} from '@mui/material';

function Explore() {
    const [exploreData, setExploreData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    // Filter duplicate data for local storage
    useEffect(() => {
        const filterDuplicateData = [...new Set(saveBookmark)];
        if (JSON.stringify(filterDuplicateData) !== JSON.stringify(saveBookmark)) {
            setSaveBookmark(filterDuplicateData);
            localStorage.setItem('saveBookmark', JSON.stringify(filterDuplicateData));
        }
    }, [saveBookmark]);

    // Api call
    useEffect(() => {
        const abortController = new AbortController();
        
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const exploreResponse = await fetch(`http://localhost:5000/api/explore`, {
                    signal: abortController.signal
                });
                
                if (!exploreResponse.ok) {
                    throw new Error(`HTTP error! status: ${exploreResponse.status}`);
                }
                
                const exploreData = await exploreResponse.json();
                
                if (!exploreData) {
                    throw new Error('Received empty or invalid data');
                }
                
                setExploreData(exploreData);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err instanceof Error ? err.message : 'An unknown error occurred');
                    console.error('Fetch error:', err);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        };
        
        fetchData();
        
        return () => {
            abortController.abort();
        };
    }, []);

    const clearAllBookmarks = () => {
        localStorage.removeItem('saveBookmark');
        setSaveBookmark([]);
        setAnchorEl(null);
    };

    const showBookmarkData = (event) => {
        if (saveBookmark.length === 0) {
            setAnchorEl(null);
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
                        data={exploreData}
                        setSaveBookmark={setSaveBookmark}
                        saveBookmark={saveBookmark}
                    />
                    <CustomPopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                        <div 
                            onClick={clearAllBookmarks} 
                            style={{ 
                                justifyContent: 'end', 
                                padding: '10px', 
                                display: 'flex', 
                                height: '20px', 
                                alignItems: 'center', 
                                gap: '5px' 
                            }}
                        >
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

export const saveBookmarkToApi = async (saveBookmark) => {
    return saveBookmark;
};

export default Explore;