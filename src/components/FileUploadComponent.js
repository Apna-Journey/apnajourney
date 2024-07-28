import React from 'react';
import { handleFileUpload } from '../utils/storage';

const FileUploadComponent = () => {
  return (
    <div>
      <h2>Upload a File</h2>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploadComponent;
