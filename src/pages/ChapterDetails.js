import React, { useState } from 'react';
import { Checkbox, Box, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LevelDialog from './LevelDialog';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
}));

const chapters = [
  {
    chapterName: "Chapter 1: Introduction",
    levels: [
      { levelName: "Level 1: What is Politics?" },
      { levelName: "Level 2: Why Study Political Science?" },
      { levelName: "Level 3: Nature of Political Science" },
      { levelName: "Level 4: Scope of Political Science" },
      { levelName: "Level 5: Methods of Political Science" },
    ],
  },
  {
    chapterName: "Chapter 2: Political Theory",
    levels: [
      { levelName: "Level 1: What is Political Theory?" },
      { levelName: "Level 2: Classical Political Philosophy" },
      { levelName: "Level 3: Modern Political Philosophy" },
      { levelName: "Level 4: Contemporary Political Theory" },
    ],
  },
  {
    chapterName: "Chapter 3: Indian Government and Politics",
    levels: [
      { levelName: "Level 1: Introduction to Indian Government and Politics" },
      { levelName: "Level 2: Historical Background" },
      { levelName: "Level 3: The Constitution of India" },
      { levelName: "Level 4: The Indian Political System" },
      { levelName: "Level 5: Indian Democracy" },
    ],
  },
  {
    chapterName: "Chapter 4: International Relations",
    levels: [
      { levelName: "Level 1: What is International Relations?" },
      { levelName: "Level 2: Key Concepts in International Relations" },
      { levelName: "Level 3: Theories of International Relations" },
      { levelName: "Level 4: Contemporary Issues in International Relations" },
    ],
  },
];

function ChapterDetails() {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ chapterName: '', levelName: '' });

  const handleLevelClick = (chapterName, levelName) => {
    setDialogContent({ chapterName, levelName });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          borderRadius: 8,
          boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
          mt: 4
        }}>
          <Typography variant="h4" component="h2" sx={{
            textAlign: 'center',
            mb: 2,
            fontWeight: 'bold',
            color: 'primary.main'
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

      <LevelDialog 
        open={open} 
        dialogContent={dialogContent} 
        handleClose={handleClose} 
      />
    </Box>
  );
}

export default ChapterDetails;