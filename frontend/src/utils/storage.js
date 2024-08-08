import { apiRequest } from '../services/api'; // Adjusted import path

async function uploadFile(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await apiRequest('/upload', 'POST', formData, true); // Assuming your endpoint is /upload

        console.log('File available at', response.data.url);
        return response.data.url;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadFile(file).catch(console.error);
  }
};

export { handleFileUpload };
