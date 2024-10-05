```javascript
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjsLib } from "react-pdf";
import "./styles.css";

// Import PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const CivicsPdf = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    // Fetch the PDF file (replace with your actual PDF file)
    fetch("path/to/your/civics.pdf")
      .then((res) => res.arrayBuffer())
      .then((data) => {
        // Load the PDF document
        pdfjsLib.getDocument({ data }).promise.then((pdf) => {
          setNumPages(pdf.numPages);
        });
      });
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePageChange = (event) => {
    setPageNumber(parseInt(event.target.value));
  };

  return (
    <div className="container">
      <Document
        file="path/to/your/civics.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>

      <div className="page-navigation">
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber >= numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CivicsPdf;
```

**Explanation:**

1. **Import necessary libraries:**
   - `react`: For React functionality.
   - `useState`: To manage the state of the number of pages and the current page.
   - `useEffect`: To fetch the PDF file and load it.
   - `Document`, `Page`, `pdfjsLib`: Components from the `react-pdf` library for PDF rendering and interaction.

2. **Import PDF.js worker:**
   - `pdfjsLib.GlobalWorkerOptions.workerSrc`: Specifies the URL of the PDF.js worker script.

3. **Create the `CivicsPdf` component:**
   - **`numPages` state:** Stores the total number of pages in the PDF.
   - **`pageNumber` state:** Stores the currently displayed page number.

4. **`useEffect` hook:**
   - Fetch the PDF file using `fetch`.
   - Convert the response to an `ArrayBuffer`.
   - Use `pdfjsLib.getDocument` to load the PDF document.
   - Set the `numPages` state to the number of pages in the document.

5. **`onDocumentLoadSuccess` handler:**
   - Called when the PDF document is successfully loaded.
   - Updates the `numPages` state.

6. **`handlePageChange` handler:**
   - Called when the user selects a different page number.
   - Updates the `pageNumber` state.

7. **Render the PDF and navigation controls:**
   - The `Document` component renders the PDF document.
   - The `Page` component renders the current page.
   - The `page-navigation` div contains buttons for navigating between pages.

**To use this code:**

1. **Install the necessary packages:**
   ```bash
   npm install react-pdf
   ```

2. **Replace `path/to/your/civics.pdf` with the actual path to your PDF file.**

3. **Import and render the `CivicsPdf` component in your React application.**

**Note:** This code assumes you have a PDF file named "civics.pdf". You will need to adjust the file path accordingly if your PDF has a different name or location.
