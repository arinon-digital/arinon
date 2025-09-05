// Utility function to convert client names to URL-friendly format
export const toUrlFriendly = (clientName: string): string => {
  return clientName.replace(/\s+/g, '-');
};

// Utility function to convert URL-friendly format back to original client name
export const fromUrlFriendly = (urlName: string): string => {
  return urlName.replace(/-/g, ' ');
};

// Utility function to convert blog titles to URL-friendly format
export const toBlogUrlFriendly = (title: string): string => {
  return title
    .replace(/\s+/g, '-')
    .replace(/[''""]/g, '') // Remove quotes
    .replace(/[^\w\-]/g, '') // Remove other special characters
    .toLowerCase(); // Make it lowercase for consistency
};

// Utility function to convert URL-friendly format back to original blog title
export const fromBlogUrlFriendly = (urlTitle: string): string => {
  // For now, we'll use a more direct approach by finding the exact match
  // This is more reliable than trying to reverse the transformation
  return urlTitle.replace(/-/g, ' ');
}; 

