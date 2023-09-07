
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf'; // Import from react-pdf
import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const [numPages, setNumPages] = useState(null);
  const [pdfText, setPdfText] = useState('');

  useEffect(() => {
    async function convertPdfToText() {
      const pdfUrl = '/sample.pdf';

      try {
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const totalNumPages = pdf.numPages;
        let extractedText = '';

        for (let pageNum = 1; pageNum <= totalNumPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const pageText = await page.getTextContent();

          pageText.items.forEach(item => {
            if ('str' in item) {
              extractedText += item.str + ' ';
            }
          });
        }

        setPdfText(extractedText);
        setNumPages(totalNumPages);
      } catch (error) {
        console.error('Error converting PDF to text:', error);
      }
    }

    convertPdfToText();
  }, []);

  return (
    <div className="App">
      <Document file="/sample.pdf" onLoadSuccess={() => {}}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
      <p>{pdfText}</p>
    </div>
  );
}

export default App;
