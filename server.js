const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors=require('cors');


const app = express();
const upload = multer({ dest: 'uploads/' }); // Folder where files will be saved
app.use(cors())

// Handle file uploads for a specific course
app.post('/upload/:course', upload.array('files'), (req, res) => {
    console.log(req)
    const course = req.params.course;
    const folderPath = path.join(__dirname, 'uploads', course);

    // Create folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Move uploaded files to the course folder
    req.files.forEach(file => {
        const targetPath = path.join(folderPath, file.originalname);
        fs.renameSync(file.path, targetPath); // Move file to the folder
    });

    res.send({ message: 'Files uploaded successfully!' });
});

app.listen(5001, () => {
    console.log('Server running on port 5001');
});
