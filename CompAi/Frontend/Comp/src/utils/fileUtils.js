/**
 * Downloads generated code as a file
 * @param {string} code - The code content to download
 * @param {string} filename - The filename with extension
 */
export const downloadFile = (code, filename) => {
  if (!code || !filename) return;

  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

