import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

function Dashboard() {
    const cards = [
        { title: 'Sessions Completed', value: 12 },
        { title: 'Current Score', value: '88%' },
        { title: 'Next Exam', value: 'Calculus II - Oct 20' }
    ];

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Grid container spacing={2}>
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">{card.title}</Typography>
                                <Typography variant="h4">{card.value}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Dashboard;
