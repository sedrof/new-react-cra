import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const PDFViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  console.log(url, 'urlss')
  const blobUrl = URL.createObjectURL(url)
  console.log(blobUrl, 'blobbb urrrrl')
  return (
    <div>
      <Document file={blobUrl} >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
};

export default PDFViewer;
