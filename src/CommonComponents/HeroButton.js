import { Button, styled } from '@mui/material';
import React from 'react';

function HeroButton({ children, handleClick, endIcon, Isdisabled, customMargin, customHeight }) {
    const NeomorphicButton = styled(Button)(({ theme }) => ({
        color: 'white',
        backgroundColor: '#f55f56',
        borderRadius: '15px',
        padding: '10px 24px',
        fontSize: '1rem',
        fontWeight: '500',
        textTransform: 'none',
        transition: 'all 0.2s ease',
        boxShadow: `
            4px 4px 8pxrgb(91, 85, 85),
            -4px -4px 8pxrgb(79, 73, 73)
        `,
        border: 'none',
        marginLeft: customMargin,
        height: customHeight || 'auto',
        '&:hover': {
            backgroundColor: '#f78881',
            boxShadow: `
                inset 5px 5px 10pxrgb(244, 41, 41),
                inset -5px -5px 10pxrgb(234, 80, 80)
            `,
        },
        '&:active': {
            boxShadow: `
                inset 5px 5px 10px #bebebe,
                inset -5px -5px 10px #ffffff
            `,
            transform: 'scale(0.98)',
        },
        '&:disabled': {
            color: '#a0a0a0',
            backgroundColor: '#e0e5ec',
            boxShadow: `
                4px 4px 8px #bebebe,
                -4px -4px 8px #ffffff
            `,
        },
        '& .MuiButton-endIcon': {
            marginLeft: '8px',
            color: 'inherit',
        }
    }));

    return (
        <NeomorphicButton
            disabled={Isdisabled}
            data-test-id="HeroButton-Button"
            onClick={handleClick}
            endIcon={endIcon}
        >
            {children}
        </NeomorphicButton>
    );
}

export default HeroButton;