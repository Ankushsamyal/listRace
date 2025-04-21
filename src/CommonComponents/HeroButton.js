import { Button, styled } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react'

function HeroButton({ children, handleClick, endIcon, Isdisabled, customMargin ,customHeight}) {
    const ColorButton = styled(Button)(() => ({
        color: 'white',
        size: 'large',
        backgroundColor: '#ff545a',
        '&:hover': {
            backgroundColor: red[700],
        },
        marginLeft: customMargin,
        height: "auto",

    }));
    return (
        <ColorButton
            disabled={Isdisabled}
            data_test_id="HeroButton-Button"
            variant="contained"
            onClick={handleClick}
            endIcon={endIcon}>
            {children}
        </ColorButton>
    )
}

export default HeroButton