import React from 'react';
import { Button, Typography, Box, Grid, Card, CardContent, Container } from '@mui/material';

function Home() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 8, textAlign: 'center' }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Unlock Your Learning Potential
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Personalized learning paths powered by AI to help you study smarter.
                </Typography>
                <Button variant="contained" color="primary" size="large">
                    Start Learning
                </Button>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Card raised sx={{ p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">Upload Your Materials</Typography>
                            <Typography variant="body2">
                                Use our OCR technology to convert your textbooks and notes into digital format.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card raised sx={{ p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">Get Personalized Insights</Typography>
                            <Typography variant="body2">
                                Receive tailored learning paths and content recommendations.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card raised sx={{ p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">Ask Anytime, Anywhere</Typography>
                            <Typography variant="body2">
                                Our AI chatbot is here to help answer your academic questions 24/7.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* <Box sx={{ my: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Trusted by Thousands of Students
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1" gutterBottom>
                            "EduCompanion has transformed how I approach studying for exams!"
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1" gutterBottom>
                            "I love how easy it is to get quick help with the chatbot when I'm stuck!"
                        </Typography>
                    </Grid>
                </Grid> */}
            {/* </Box> */}
        </Container>
    );
}

export default Home;
