import React from 'react'
import HeroPageTextArea from './pages/HeroPageTextArea'
import Heroimage from '../../Images/images/welcome-hero/banner.jpg';
import { Box } from '@mui/material';
import HeroCards from './pages/HeroCards';
import 'animate.css';


function Home() {
    return (
        <div style={{height:'160vh'}}>
            <Box>
                <div
                    style={{
                        height: '110vh',
                        backgroundSize:'cover',
                        backgroundPosition:'center' ,
                        backgroundRepeat:'no-repeat',
                        backgroundImage: ` linear-gradient(to bottom, rgba(7, 7, 7, 0.6), rgba(46, 30, 110, 0.3)),url(${Heroimage})`,
                        justifyItems: 'center',
                        marginTop:'12vh'

                    }}>
                    <div
                    className={`animate__fadeInDown`} 
                        style={{
                            animationDuration:'2s',
                            textTransform: 'uppercase',
                            color: 'whitesmoke',
                            fontSize: '7vh',
                            fontWeight: 'bolder',
                            width: '118vh',
                            textAlign: 'center',
                            paddingTop: '100px',
                        }}>best place to find and explore that all you need
                    </div>
                    <div
                        style={{
                            color: 'whitesmoke',
                            fontSize: '3vh',
                            fontWeight: 600,
                            padding: '40px'
                        }}
                    >Find Best Place, Restaurant, Hotel, Real State and many more think in just One click
                    </div>
                    <HeroPageTextArea />
                    <HeroCards/>
                </div>
            </Box>
        </div>
    )
}

export default Home