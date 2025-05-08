import React, { useEffect, useState } from 'react';
import HeroPageTextArea from './pages/HeroPageTextArea';
import Heroimage from '../../Images/images/welcome-hero/banner.jpg';
import HeroCards from './pages/HeroCards';
import 'animate.css';

const HeroMainBoxStyles = {
    height: '110vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `linear-gradient(to bottom, rgba(7, 7, 7, 0.6), rgba(46, 30, 110, 0.3)), url(${Heroimage})`,
    justifyItems: 'center',
    marginTop: '12vh',
    '@media (max-width: 768px)': {
        height: '80vh',
    },
};

const HeroTitleStyles = {
    animationDuration: '2s',
    textTransform: 'uppercase',
    color: 'whitesmoke',
    fontSize: '7vh',
    fontWeight: 'bolder',
    width: '118vh',
    textAlign: 'center',
    paddingTop: '100px',
    '@media (max-width: 768px)': {
        fontSize: '5vh',
    },
};

const HeroDescriptionStyles = {
    color: 'whitesmoke',
    fontSize: '3vh',
    fontWeight: 600,
    padding: '40px',
    '@media (max-width: 768px)': {
        fontSize: '2vh',
    },
};

function Home() {
    const [catagoriData, setcatagoriData] = useState([]);
    const [isAlert, setIsAlert] = useState(false);
    //Api calling
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsAlert(false);

                const categoriesResponse = await fetch(`http://localhost:5000/api/categories`);

                if (!categoriesResponse.ok) {
                    throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
                }

                const categoriesData = await categoriesResponse.json();


                // Validate data structure if needed
                if (!categoriesData) {
                    throw new Error('Received empty or invalid data');
                }


                setcatagoriData(categoriesData[0].categories);
            } catch (err) {
                setIsAlert(err instanceof Error ? err.message : 'An unknown error occurred');
                // Consider adding error logging here
                console.error('Fetch error:', err);
            } finally {
                
            }
        };

        // Add cleanup function to abort fetch if component unmounts
        const abortController = new AbortController();

        fetchData();

        return () => {
            abortController.abort();
        };
    }, []);
    return (
        <div style={{ height: '160vh', backgroundColor: 'whitesmoke' }}>
            <div className="Hero-Main-box" style={HeroMainBoxStyles}>
                <div className={`animate__fadeInDown`} style={HeroTitleStyles}>
                    Best place to find and explore that all you need
                </div>
                <div style={HeroDescriptionStyles}>
                    Find Best Place, Restaurant, Hotel, Real State and many more think in just One click
                </div>
                <React.Fragment>
                    <HeroPageTextArea catagoriData={catagoriData} isAlert={isAlert} setIsAlert={setIsAlert}  />
                    <HeroCards catagoriData={catagoriData}   />
                </React.Fragment>
            </div>
        </div>
    );
};

export default Home;