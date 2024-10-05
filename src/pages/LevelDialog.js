import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import axios from 'axios';

function LevelDialog({ open, dialogContent, handleClose}) {
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      if (!open) return;

      try {
        const formData = new FormData();
        // formData.append('file', file); // Add the uploaded file
        formData.append('chapterName', dialogContent.chapterName); // Chapter name
        formData.append('levelName', dialogContent.levelName); // Level name

        // Make the API request
        const response = await axios.post('http://localhost:3001/process-text', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Set the response text in the answer state
        setAnswer(response.data.answer);
      } catch (error) {
        console.error('Error fetching summary:', error);
        setAnswer('Failed to generate content.');
      }
    };

    fetchSummary(); // Fetch the summary when dialog opens
  }, [open, dialogContent]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{dialogContent.chapterName} - {dialogContent.levelName}</DialogTitle>
      <DialogContent>
        <Typography>
          {answer ? answer : 'Loading...'} {/* Display the answer or loading */}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LevelDialog;
