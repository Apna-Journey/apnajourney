import { apiRequest } from './api';

export async function generateProfileDocument(profileId) {
  try {
    const response = await apiRequest(`/profiles/${profileId}/generate-document`, 'POST');
    return response.documentUrl;
  } catch (error) {
    console.error('Failed to generate document', error);
    throw error;
  }
}
