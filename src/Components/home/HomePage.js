import React, { useEffect, useState } from 'react';
import Heroimage from '../../images/images/welcome-hero/banners.jpg';
import HeroCards from './pages/HeroCard';
import 'animate.css';
import { fetchCategories } from '../../API/ApiService';
import HeroPageTextArea from './pages/HeroPageTextFields';
const HeroMainBoxStyles = {
    height: '110vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `linear-gradient(to bottom, rgba(7, 7, 7, 0.6), rgba(46, 30, 110, 0.3)), url(${Heroimage})`,
    justifyItems: 'center',
    marginTop: '12vh',
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
};

const HeroDescriptionStyles = {
    color: 'whitesmoke',
    fontSize: '3vh',
    fontWeight: 600,
    padding: '40px',
};

function Home() {
    const [catagoriData, setcatagoriData] = useState([]);
    const [isAlert, setIsAlert] = useState(false);
    //Api calling
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsAlert(false);
                const categories = await fetchCategories();
                setcatagoriData(categories);
            } catch (err) {
                setIsAlert(err);
                console.error('API error:', err);
            }
        };

        fetchData();
    }, []);
    return (
        <div style={{ backgroundColor: 'whitesmoke' }}>
            <div className="Hero-Main-box" style={HeroMainBoxStyles}>
                <div className={`animate__fadeInDown`} style={HeroTitleStyles}>
                    Best place to find and explore that all you need
                </div>
                <div style={HeroDescriptionStyles}>
                    Find Best Place, Restaurant, Hotel, Real State and many more think in just One click
                </div>
                <HeroPageTextArea catagoriData={catagoriData} isAlert={isAlert} setIsAlert={setIsAlert} />
            </div>
            <HeroCards catagoriData={catagoriData}/>
        </div>
    );
};

export default Home;