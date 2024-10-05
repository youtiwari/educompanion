import React from 'react';
import { Button } from '@mui/material';

function UploadComponent() {
    const handleUpload = (event) => {
        const file = event.target.files[0];
        // Process file
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleUpload}
                hidden
                id="file-upload"
            />
            <label htmlFor="file-upload">
                <Button variant="contained" component="span">
                    Upload Material
                </Button>
            </label>
        </div>
    );
}

export default UploadComponent;
