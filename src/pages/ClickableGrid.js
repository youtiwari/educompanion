import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import WelcomeText from './WelcomeText';

function ClickableGrid() {
    const navigate = useNavigate();
    const cards = [
        { id: 1, label: 'My Learning Path', path: '/mylearningpath', color: 'linear-gradient(145deg, #03A9F4, #00BCD4)' },
        { id: 2, label: 'Exam Simulator', path: '/mytest_bot', color: 'linear-gradient(145deg, #03A9F4, #00BCD4)' },
        { id: 3, label: 'Ask EduBot', path: '/mybot', color: 'linear-gradient(145deg, #03A9F4, #00BCD4)' },
        { id: 4, label: 'Upload Content', path: '/component4', color: 'linear-gradient(145deg, #03A9F4, #00BCD4)' },
        { id: 5, label: 'Fun Review', path: '/myidiom', color: 'linear-gradient(145deg, #03A9F4, #00BCD4)' },
        { id: 6, label: 'Learning Insights', path: '/component6', color: 'linear-gradient(145deg, #03A9F4, #00BCD4)' }
    ];

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100%',
                backgroundColor: '#f5f5f5',
                color: '#333',
            }}>
                <WelcomeText />
                <Box sx={{ flexGrow: 1, width: '85%', p: 3 }}>
                    <Grid container spacing={6} rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {cards.map((card) => (
                            <Grid item xs={12} sm={6} md={4} key={card.id}>
                                <Card sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 250,
                                    background: card.color,  // Gradient background
                                    borderRadius: '16px',
                                    color: '#ffffff',  // White text for better readability
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 0 30px 10px rgba(0,0,0,0.3)',
                                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
                                    },
                                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
                                }}>
                                    <CardActionArea onClick={() => navigate(card.path)} sx={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 3
                                    }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div" sx={{
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }}>
                                                {card.label}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default ClickableGrid;
