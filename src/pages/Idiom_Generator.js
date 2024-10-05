import React, { useState } from 'react';
import { Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Input } from '@mui/material';
import ReactMarkdown from 'react-markdown';
function Idiom_Generator() {
    const [file, setFile] = useState(null);
    // const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [open, setOpen] = useState(false);

    // const handleFileChange = (event) => {
    //     setFile(event.target.files[0]);
    // };

    // const handleQuestionChange = (event) => {
    //     setQuestion(event);
    // };

    const handleSubmit = async () => {
        // if (!file || !question.trim()) {
        //     alert('Both file and question are required.');
        //     return;
        // }

        const formData = new FormData();
        const question ='Generate an Idiom to help me revise some sentence of the given file';
        // formData.append('file', file);
        formData.append('question', question);
        const encodedQuestion = encodeURIComponent(question);
        // const encodedFile = encodeURIComponent(file);
        const url = `http://localhost:3001/process-file?question=${encodedQuestion}`;
        try {
            const response = await fetch(url, {
                method: 'POST',  // FormData will set the correct content-type header
            });
            const data = await response.json();
            console.log(data);
            setAnswer(data.answer);
            setOpen(true);
        } catch (error) {
            console.error('Error when fetching:', error);
            setAnswer('Failed to fetch answer.');
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 8
        }}>
            {/* <Input
                type="file"
                onChange={handleFileChange}
                sx={{ marginBottom: 2 }}
            /> */}
            {/* <TextField
                variant="outlined"
                fullWidth
                value={question}
                onChange={handleQuestionChange}
                sx={{ marginBottom: 2, maxWidth: 500 }}
            /> */}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Fun Revision
            </Button>
            <Dialog open={open} onClose={handleClose}>
                {/* <DialogTitle>Response from EduBot</DialogTitle> */}
                <DialogContent>
                    <DialogContentText>
                        <ReactMarkdown>{answer}</ReactMarkdown>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Idiom_Generator;
