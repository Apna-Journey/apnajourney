import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; 

async function uploadFile(file) {
    try {
        const storageRef = ref(storage, `files/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        console.log('File available at', url);
        return url; 
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

