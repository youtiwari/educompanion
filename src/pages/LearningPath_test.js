import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardContent, Typography, Box, Modal, Button, TextField, List, ListItem } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import Folder from '@mui/icons-material/Folder';

function LearningPath_test() {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [folders, setFolders] = useState({});
    const [open, setOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState('');
    const [newCourse, setNewCourse] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [folderFiles, setFolderFiles] = useState([]);

    useEffect(() => {
        // Fetch the list of courses from the server
        fetch('http://localhost:3001/courses')
            .then(response => response.json())
            .then(data => {
                const courses = data.map((course, index) => ({
                    id: index + 1,
                    label: course.name,
                    path: `/component${index + 1}`,
                    color: 'linear-gradient(145deg, rgba(3, 169, 244, 0.7), rgba(0, 188, 212, 0.7))'
                }));
                setCards([...courses, { id: courses.length + 1, label: '+', path: '#', color: 'linear-gradient(145deg, rgba(3, 169, 244, 0.7), rgba(0, 188, 212, 0.7))' }]);
                setFolders(data.reduce((acc, course) => ({ ...acc, [course.name]: course.files }), {}));
            })
            .catch(err => console.error('Error fetching courses:', err));
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleUploadOpen = (folder) => {
        setSelectedFolder(folder);
        setUploadOpen(true);
    };

    const handleUploadClose = () => {
        setSelectedFiles([]);
        setUploadOpen(false);
    };

    const handleViewOpen = (folder) => {
        console.log(folder)
        setSelectedFolder(folder);
        setFolderFiles(folders[folder]);
        setViewOpen(true);
    };

    const handleViewClose = () => {
        setViewOpen(false);
    };

    const handleCardClick = (card) => {
        if (card.label === '+') {
            handleOpen(); // Open the add course modal
        } else {
            // Prompt user to either upload files or view the course
            const choice = window.confirm(`Do you want to upload files to ${card.label}`? `Click "Cancel" to view the course.`: `Click "OK" to upload files.`);
            if (choice) {
                handleUploadOpen(card.label); // Open the upload modal
            } else {
                handleViewOpen(card.label); // View the course files
            }
        }
    };

    const handleAddCourse = () => {
        if (newCourse.trim()) {
            const newCard = {
                id: cards.length + 1,
                label: newCourse,
                path: `/component${cards.length + 1}`,
                color: 'linear-gradient(145deg, rgba(0, 150, 136, 0.7), rgba(0, 121, 107, 0.7))'
            };
            setCards([...cards.slice(0, -1), newCard, cards[cards.length - 1]]);
            setFolders({ ...folders, [newCourse]: [] });
            setNewCourse('');
            handleClose();
        }
    };

    const handleFileSelect = (e) => {
        setSelectedFiles([...e.target.files]);
    };

    const handleFileClick = async (file) => {
        console.log("Selected folder:", selectedFolder);
        console.log("Selected file:", file);
    
        const encodedFolder = encodeURIComponent(selectedFolder);
        const encodedFile = encodeURIComponent(file);
        const url = `http://localhost:3001/book-file?folder=${encodedFolder}&file=${encodedFile}`;
    
        try {
            const response = await fetch(url, { method: 'POST' });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json(); // Assuming your server sends JSON
            console.log(result.answer); // Make sure 'answer' is the correct key
        } catch (error) {
            console.error('Failed to fetch file:', error);
        }
        navigate('/chapterdetails')
    };
    

    const handleUpload = async () => {
        if (selectedFiles.length > 0) {
            const formData = new FormData();
            selectedFiles.forEach(file => {
                formData.append('files', file);
            });

            try {
                const response = await fetch(`http://localhost:3001/upload/${selectedFolder}`, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result.message);
                    setFolders({
                        ...folders,
                        [selectedFolder]: [...folders[selectedFolder], ...selectedFiles.map(file => file.name)]
                    });
                } else {
                    console.error('File upload failed');
                }
            } catch (error) {
                console.error('Error uploading files:', error);
            }

            handleUploadClose();
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', width: '100%', padding: '30px' }}>
                <Box sx={{ flexGrow: 1, width: '85%', p: 3 }}>
                    <Grid container spacing={6}>
                        {cards.map((card) => (
                            <Grid item xs={12} sm={6} md={4} key={card.id}>
                                <Card sx={{ height: 250, background: card.color, borderRadius: '16px', color: '#fff', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                                    <CardActionArea onClick={() => handleCardClick(card)}>
                                        <CardContent>
                                            <Typography variant="h5" sx={{ textAlign: 'center' }}>{card.label}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h6">Created Folders and Files:</Typography>
                    <List>
                        {Object.keys(folders).map((folder, index) => (
                            <ListItem key={index}>
                                <strong>{folder}:</strong> {folders[folder].join(', ') || 'No files uploaded'}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>

            {/* Modal for adding a new course */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
                    <Typography variant="h6">Add New Course</Typography>
                    <TextField fullWidth label="Course Name" value={newCourse} onChange={(e) => setNewCourse(e.target.value)} sx={{ mt: 2 }} />
                    <Button fullWidth variant="contained" onClick={handleAddCourse} sx={{ mt: 2 }}>Add Course</Button>
                </Box>
            </Modal>

            {/* Modal for uploading files */}
            <Modal open={uploadOpen} onClose={handleUploadClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
                    <Typography variant="h6">Upload Files for {selectedFolder}</Typography>
                    <Button variant="outlined" component="label" startIcon={<CloudUpload />} sx={{ mt: 2, mb: 2 }}>Select Files
                        <input type="file" multiple hidden onChange={handleFileSelect} />
                    </Button>
                    <Button fullWidth variant="contained" onClick={handleUpload}>Upload</Button>
                </Box>
            </Modal>

            {/* Modal for viewing files */}
            <Modal open={viewOpen} onClose={handleViewClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
                    <Typography variant="h6">Files in {selectedFolder}</Typography>
                    <List>
    {folderFiles.map((file, index) => (
        <ListItem key={index}>
            <Button 
                variant="contained" 
                onClick={() => handleFileClick(file,folderFiles)} // Define this function to handle file click
                sx={{ width: '100%', justifyContent: 'flex-start' }}
            >
                {file}
            </Button>
        </ListItem>
    ))}
</List>

                    <Button fullWidth variant="contained" onClick={handleViewClose}>Close</Button>
                </Box>
            </Modal>
        </>
    );
}


export default LearningPath_test;
