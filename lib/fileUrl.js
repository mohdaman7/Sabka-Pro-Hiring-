/**
 * Utility to construct proper file URLs for backend uploads
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * Get full URL for an uploaded file
 * @param {string} fileUrl - The relative file URL from the API (e.g., "/uploads/filename.pdf")
 * @returns {string} - Full URL to the file (e.g., "http://localhost:4000/uploads/filename.pdf")
 */
export function getFileUrl(fileUrl) {
  if (!fileUrl) return null;
  
  // If it already has the full URL, return as is
  if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
    return fileUrl;
  }
  
  // If it's a relative path, prepend the API URL
  if (fileUrl.startsWith("/")) {
    return `${API_URL}${fileUrl}`;
  }
  
  // If it's just a filename, prepend the uploads path
  return `${API_URL}/uploads/${fileUrl}`;
}

/**
 * Get download URL for a file
 * @param {string} fileUrl - The relative file URL
 * @param {string} fileName - Optional filename for download
 * @returns {string} - Full URL for download
 */
export function getDownloadUrl(fileUrl, fileName) {
  const url = getFileUrl(fileUrl);
  // Add download parameter if needed
  return url;
}

export default {
  getFileUrl,
  getDownloadUrl,
};
