import express from 'express';
import { GoogleGenerativeAI} from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import dotenv from 'dotenv';
import multer from 'multer';  // For handling file uploads
import fs from 'fs';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();
const app = express();
const upload = multer({ dest: 'uploads/' });  // Storing files temporarily in 'uploads' directory
const port = 3001;
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file_access='/Users/kamleshtiwari/Downloads/educompanion/kehb102_merged.pdf'
// Initialize GoogleGenerativeAI and GoogleAIFileManager with your API_KEY
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const globalPath = path.join(__dirname, 'uploads');
var current_folder='';
var current_file='';
app.use(express.json());
function iterateFileAndAppendToString(filePath) {
    let fileContents = '';
  
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      fileContents = data;
    } catch (err) {
      console.error('Error reading file:', err);
    }
  
    return fileContents;
  }

// Endpoint to handle file uploads and questions
app.post('/process-file',  async (req, res) => {
    // if (!req.body.question) {
    //     return res.status(400).json({ error: 'File and question required.' });
    // }
    const {question} = req.query;
    // console.log(req.body)

    try {
        const filePath = file_access;
        const displayName = 'Gemini 1.5 PDF';
        const mimeType = 'application/pdf';

        // Upload the file to Google's FileManager
        const uploadResponse = await fileManager.uploadFile(filePath, { mimeType, displayName });
        console.log(`Uploaded file ${displayName} as: ${uploadResponse.file.uri}`);

        // Generate content using text and the uploaded file URI
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: mimeType,
                    fileUri: uploadResponse.file.uri,
                },
            },
            { text: question },
        ]);

        // Cleanup: Remove the uploaded file from the server


        // Send the generated content back to the client
        res.json({ answer: result.response.text() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to process the file and generate content.' });
    }
});

app.post('/book-file',  async (req, res) => {
    // if (!req.file || !req.body.question) {
    //     return res.status(400).json({ error: 'File and question required.' });
    // }
    const { folder, file } = req.query; // Extracting folder and file from query parameters
    console.log('Received folder:', folder);
    console.log('Received file:', file);
    current_folder=folder;
    current_file=file;
    const folderPath=path.join(__dirname, 'uploads', folder, file);
    
    try {
        const filePath = folderPath;
        const filePath1='sample.js'
        // const displayName = req.file.originalname;
        // const mimeType = req.file.mimetype;
        const displayName = "Gemini 1.5 PDF";
        const mimeType = "application/pdf";

        // Upload the file to Google's FileManager
        const uploadResponse = await fileManager.uploadFile(filePath, { mimeType, displayName });
        console.log(`Uploaded file ${displayName} as: ${uploadResponse.file.uri}`);

        // Generate content using text and the uploaded file URI
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: mimeType,
                    fileUri: uploadResponse.file.uri,
                },
            },
            { text: "generate the above pdf in form of"+iterateFileAndAppendToString(filePath1) + "give only code and that too without quotes no explanation needed" },
        ]);

        // Cleanup: Remove the uploaded file from the server
        // fs.unlinkSync(filePath);

        // Send the generated content back to the client
        console.log(result.response.text())
        const jsContent = result.response.text();
        const startIndex = jsContent.indexOf('import');
        const lastIndex = jsContent.lastIndexOf(';');
        const modified_js_saver = jsContent.substring(startIndex, lastIndex + 1);
        fs.writeFile(path.join(__dirname,'src','pages', 'ChapterDetails.js'), modified_js_saver, 'utf8', (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            } else {
                console.log('JavaScript content successfully saved to ChapterDetails.js');
            }
        });
        res.json({ answer: result.response.text() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to process the file and generate content.' });
    }
});

app.post('/process-text',  async (req, res) => {
    // if (!req.file || !req.body.question) {
    //     return res.status(400).json({ error: 'File and question required.' });
    // }
    // console.log(req)
    console.log(current_folder)
    console.log(current_file)
    try {
        const filePath = file_access;
        const displayName = "Gemini 1.5 PDF";
        const mimeType = "application/pdf";

        // Upload the file to Google's FileManager
        const uploadResponse = await fileManager.uploadFile(filePath, { mimeType, displayName });
        console.log(`Uploaded file ${displayName} as: ${uploadResponse.file.uri}`);

        // Generate content using text and the uploaded file URI
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: mimeType,
                    fileUri: uploadResponse.file.uri,
                },
            },
            { text: `generate a summary from the file above for ${req.chapterName} & ${req.levelName} `},
        ]);

        // Cleanup: Remove the uploaded file from the server
        // fs.unlinkSync(filePath);

        // Send the generated content back to the client
        res.json({ answer: result.response.text() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to process the file and generate content.' });
    }
});
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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/courses', (req, res) => {
    const folderPath = path.join(__dirname, 'uploads');
    
    fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read courses' });
        }

        const courses = files
            .filter(dirent => dirent.isDirectory())
            .map(dirent => ({
                name: dirent.name,
                files: fs.readdirSync(path.join(folderPath, dirent.name))
            }));

        res.json(courses);
    });
});