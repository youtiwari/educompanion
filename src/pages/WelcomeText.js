import React from 'react';
import { Typography, Box } from '@mui/material';
import '../styles/Welcome.css'; // Assuming you have imported the CSS styles as shown above

function WelcomeText() {
    return (
        <Box style={{ paddingTop: '30px', textAlign: 'center' }}>
            <div className="typewriter">
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome Nishit!
                </Typography>
            </div>
            <Typography variant="h6" sx={{ mb: 3 }} align='center'>
                Unlock Your Learning Potential
            </Typography>
        </Box>
    );
}

export default WelcomeText;
