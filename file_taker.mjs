import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { GoogleAIFileManager } = require("@google/generative-ai/server");
import fs from 'fs';
// require('dotenv').config()
import dotenv from 'dotenv';

dotenv.config();
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

// Usage example:
const filePath = 'sample.js';


// Initialize GoogleGenerativeAI with your API_KEY.
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// Initialize GoogleAIFileManager with your API_KEY.
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  // Choose a Gemini model.
  model: "gemini-1.5-flash",
});

// Upload the file and specify a display name.
// const uploadResponse = await fileManager.uploadFile("/Users/nishitpoddar/Downloads/educompanion-frontend/books/civics/kehb102_merged.pdf", {
//   mimeType: "application/pdf",
//   displayName: "civics pdf",
// });

// const uploadResponse1 = await fileManager.uploadFile("/Users/nishitpoddar/Downloads/educompanion-frontend/sample.js", {
//   mimeType: "application/js",
//   displayName: "Book js",
// });

// const model = genAI.getGenerativeModel({
//   // Choose a Gemini model.
//   model: "gemini-1.5-flash",
// });'


// Upload the file and specify a display name.
const uploadResponse = await fileManager.uploadFile("/Users/nishitpoddar/Downloads/educompanion-frontend/books/civics/kehb102_merged.pdf", {
  mimeType: "application/pdf",
  displayName: "Gemini 1.5 PDF",
});

// View the response.
console.log(
  `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`,
);

// Generate content using text and the URI reference for the uploaded file.
const result = await model.generateContent([
  {
    fileData: {
      mimeType: uploadResponse.file.mimeType,
      fileUri: uploadResponse.file.uri,
    },
  },

  { text: "generate the above pdf in form of"+iterateFileAndAppendToString(filePath) },
]);

// Generate content using text and the URI reference for the uploaded file.
// const result = await model.generateContent([
//   {
//     fileData: {
//       mimeType: uploadResponse.file.mimeType,
//       fileUri: uploadResponse.file.uri,
//     },
//   },
//   { text: "Suppose i am a kid i want to learn about this book i wanted to split this book into chapters and then learn each chapter by using react page can you make a react code and transalte the book into a menu of react pages and the respective react pages so that i could give a route in app.js and it works pls only output react code" },
// ]);
fs.writeFileSync(uploadResponse.file.displayName+".js", result.response.text());
// Output the generated text to the console
console.log(result.response.text());

