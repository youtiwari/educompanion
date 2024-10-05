import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Login() {
    const navigate=useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setAuthenticated } = useAuth();
    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Here you can handle the login logic or validation
        console.log('Login Attempt:', username, password);
        setAuthenticated(true);
        alert('Login successful!');
        navigate('/dashboard');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>
            <Button
                type="submit"
                variant="contained"
                sx={{ flex: 1, mr: 1 }}  // Use flex: 1 to allow each button to grow and fill space
            >
                Sign In
            </Button>
            <Button
                type="submit"
                variant="contained"
                sx={{ flex: 1 }}
            >
                Sign Up
            </Button>
        </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
