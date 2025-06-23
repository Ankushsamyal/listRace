import React from 'react';
import { Container, Avatar, Typography, IconButton, Stack, Paper } from '@mui/material';
import { LinkedIn, Twitter, GitHub } from '@mui/icons-material';

const neumorphismShadow = {
    boxShadow: `8px 8px 15px #bebebe, 
              -8px -8px 15px #ffffff`
};

const ProfilePage = () => {
   const username = localStorage.getItem('userName') || 'user'

    return (
        <Container maxWidth="sm" sx={{ mt: 5, marginTop: '150px', marginBottom: '100px' }}>
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    textAlign: 'center',
                    bgcolor: '#e0e0e0',
                    ...neumorphismShadow,
                }}
            >
                <Avatar
                    alt="Ankush"
                    src="https://mui.com/static/images/avatar/1.jpg"
                    sx={{
                        width: 120,
                        height: 120,
                        margin: '0 auto',
                        borderRadius: '50%',
                        ...neumorphismShadow,
                        bgcolor: '#e0e0e0',
                    }}
                />
                <Typography variant="h4" component="h1" mt={2} sx={{ color: '#333',textTransform:'capitalize' }}>
                    {username && username}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    mt={1}
                    mb={3}
                    sx={{ color: '#555' }}
                >
                    Full-stack developer passionate about building web apps and exploring new technologies.
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center">
                    {[{
                        icon: <LinkedIn />,
                        href: 'https://in.linkedin.com/in/ankush-samyal-71522921a',
                        label: 'LinkedIn',
                    }, {
                        icon: <Twitter />,
                        href: 'https://x.com/AnkushSamyal25',
                        label: 'Twitter',
                    }, {
                        icon: <GitHub />,
                        href: 'https://github.com/Ankushsamyal',
                        label: 'GitHub',
                    }].map(({ icon, href, label }) => (
                        <IconButton
                            key={label}
                            aria-label={label}
                            href={href}
                            target="_blank"
                            rel="noopener"
                            sx={{
                                bgcolor: '#e0e0e0',
                                ...neumorphismShadow,
                                color: '#555',
                                '&:hover': {
                                    bgcolor: '#d1d1d1',
                                    boxShadow: `inset 8px 8px 15px #bebebe, inset -8px -8px 15px #ffffff`,
                                },
                            }}
                        >
                            {icon}
                        </IconButton>
                    ))}
                </Stack>
            </Paper>
        </Container>
    );
};

export default ProfilePage;
