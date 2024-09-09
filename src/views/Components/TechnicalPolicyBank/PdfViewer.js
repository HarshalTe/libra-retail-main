import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const PdfViewer = ({ pdfUrl }) => {
    return (
        <div style={{ 
            width: '100%', 
            height: 'auto', 
            maxWidth: '300px', 
            maxHeight: '400px', 
            border: '1px solid #ccc', 
            margin: 'auto'
        }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js`}>
                <Viewer fileUrl={pdfUrl} />
            </Worker>
        </div>
    );
};

export default PdfViewer;
