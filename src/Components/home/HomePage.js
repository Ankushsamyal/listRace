import React, { useEffect, useState } from 'react';
import Heroimage from '../../images/images/welcome-hero/banners.jpg';
import HeroCards from './pages/HeroCard';
import 'animate.css';
import { fetchCategories } from '../../API/ApiService';
import HeroPageTextArea from './pages/HeroPageTextFields';
import styled from 'styled-components';
const HeroMainBox = styled.div`
    height: 110vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: red;
    background-image: 
        linear-gradient(to bottom, rgba(7, 7, 7, 0.6), rgba(46, 30, 110, 0.3)),
        url(${Heroimage});
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5vh;
      @media screen and (max-width: 768px) {
       
    }
`;

const HeroTitleStyles = styled.div`
    padding:10px;
    animation-duration: 2s;
    text-transform: uppercase;
    color: whitesmoke;
    font-size: 7vh;
    font-weight: bolder;
    width: auto;
    max-width:163vh;
    text-align: center;
    padding-top: 50px;
     @media screen and (max-width: 768px) {
       font-size:4vh;
       width:auto;
    }
`

const HeroDescriptionStyles = styled.div`
    color: whitesmoke;
    fontSize: 3vh;
    fontWeight: 600;
    padding: 20px;
     @media screen and (max-width: 768px) {
       font-size:2vh;
    }
`

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
            <HeroMainBox className="Hero-Main-box">
                <HeroTitleStyles className={`animate__fadeInDown`}>
                    Best place to find and explore that all you need
                </HeroTitleStyles>
                <HeroDescriptionStyles>
                    Find Best Place, Restaurant, Hotel, Real State and many more think in just One click
                </HeroDescriptionStyles>
                <HeroPageTextArea catagoriData={catagoriData} isAlert={isAlert} setIsAlert={setIsAlert} />
            </HeroMainBox>
            <HeroCards catagoriData={catagoriData} />
        </div>
    );
};

export default Home;