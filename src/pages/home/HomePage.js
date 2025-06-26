import React, { useEffect, useState } from 'react';
import Heroimage from '../../assets/images/welcome-hero/banners.jpg';
import HeroCards from './pages/HeroCard';
import 'animate.css';
import { fetchCategories } from '../../API/ApiService';
import HeroPageTextArea from './pages/HeroPageTextFields';
import { HOME_CONSTANT } from '../../constant/HeadingConstant';
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
       padding-top:20px;
       padding-bottom:20px
    }
`

const HeroDescriptionStyles = styled.div`
    color: whitesmoke;
    font-size: 3vh;
    text-transform:capitalize;
    font-weight: 600;
    text-align: center;
    padding: 20px;
     @media screen and (max-width: 768px) {
    font-weight: 400;
       
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
                console.error('API error:', err);
            }
        };

        fetchData();
    }, []);
    return (
        <div style={{ backgroundColor: 'whitesmoke' }}>
            <HeroMainBox className="Hero-Main-box">
                <HeroTitleStyles className={`animate__fadeInDown`}>
                   {HOME_CONSTANT.MAIN_TITLE}
                </HeroTitleStyles>
                <HeroDescriptionStyles>
                    {HOME_CONSTANT.SECONDARY_TITLE}
                </HeroDescriptionStyles>
                <HeroPageTextArea catagoriData={catagoriData} isAlert={isAlert} setIsAlert={setIsAlert} />
            </HeroMainBox>
            <HeroCards catagoriData={catagoriData} />
        </div>
    );
};

export default Home;