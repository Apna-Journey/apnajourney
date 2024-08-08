import { apiRequest } from './api';

export async function exportUserData() {
  const response = await apiRequest('/user/export', 'GET', null, false, true);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'user_data.csv';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}
