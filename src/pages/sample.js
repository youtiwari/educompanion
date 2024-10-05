import React, { useState } from 'react';
import { Checkbox, Box, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LevelDialog from './LevelDialog'; // Importing the new dialog component

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius, // Apply consistent border radius
}));

const chapters = [
  {
    chapterName: "Chapter 1: Setting Sail",
    levels: [
      { levelName: "Preparation and Departure" },
      { levelName: "Crew Introduction" },
      { levelName: "First Sight of the Sea" },
      { levelName: "Navigational Strategies" },
      { levelName: "Early Challenges" },
    ],
  },
  {
    chapterName: "Chapter 2: Into the Storm",
    levels: [
      { levelName: "Storm Approaches" },
      { levelName: "First Impact" },
      { levelName: "Maneuvering Through the Tempest" },
      { levelName: "Unity Under Duress" },
      { levelName: "The Eye of the Storm" },
    ],
  },
  {
    chapterName: "Chapter 3: Landfall and Reflection",
    levels: [
      { levelName: "Seeing Land" },
      { levelName: "Docking" },
      { levelName: "Reflections on Survival" },
      { levelName: "Celebrating Team Spirit" },
    ],
  },
];


function ChapterDetails() {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ chapterName: '', levelName: '' });

  const handleLevelClick = (chapterName, levelName) => {
    setDialogContent({ chapterName, levelName });
    setOpen(true); // Open the popup dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the popup dialog
  };

  return (
    <Box sx={{
      width: '100%',
      maxWidth: 720,
      bgcolor: 'background.paper',
      m: 'auto',
      mt: 4,
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {chapters.map((chapter, chapterIndex) => (
        <Paper key={chapterIndex} elevation={3} sx={{
          width: '100%',
          m: 'auto',
          p: 2,
          borderRadius: 8, // Rounded corners
          boxShadow: '0 3px 10px rgba(0,0,0,0.2)', // Subtle shadow for depth
          mt: 4
        }}>
          <Typography variant="h4" component="h2" sx={{
            textAlign: 'center',
            mb: 2,
            fontWeight: 'bold',
            color: 'primary.main' // Use theme's primary color
          }}>
            {chapter.chapterName}
          </Typography>
          <List>
            {chapter.levels.map((level, index) => (
              <StyledListItem key={index} onClick={() => handleLevelClick(chapter.chapterName, level.levelName)} sx={{ borderRadius: 8 }}>
                <ListItemIcon>
                  <Checkbox />
                </ListItemIcon>
                <ListItemText primary={level.levelName} />
              </StyledListItem>
            ))}
          </List>
        </Paper>
      ))}

      {/* Using LevelDialog component */}
      <LevelDialog 
        open={open} 
        dialogContent={dialogContent} 
        handleClose={handleClose} 
      />
    </Box>
  );
}

export default ChapterDetails;
