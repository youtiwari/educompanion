import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the import path as necessary

function Header() {
    const { isAuthenticated } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar style={{ justifyContent: isAuthenticated ? 'center' : 'space-between' }}>
                <Typography variant="h6" align="center" component="div" style={{ flex: isAuthenticated ? 1 : undefined }}>
                    EduCompanion
                </Typography>
                {!isAuthenticated && (
                    <Button color="inherit" component={Link} to="/login">
                        Login/Signup
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
