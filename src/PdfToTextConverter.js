import React, { useState } from 'react';
import pdfParser from 'pdf-parse';

const PdfToTextConverter = () => {
  const [pdfText, setPdfText] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result;

        try {
          const data = new Uint8Array(arrayBuffer);
          const result = await pdfParser(data);
          setPdfText(result.text);
        } catch (error) {
          console.error('Error extracting text from PDF:', error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div>
        <h2>PDF Text:</h2>
        <pre>{pdfText}</pre>
      </div>
    </div>
  );
};

export default PdfToTextConverter;
