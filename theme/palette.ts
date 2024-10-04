const getContrastYIQ = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#07020d" : "#f7f2fd"; // Dark text for light backgrounds, light text for dark backgrounds
};

const palette = {
  light: {
    background: "#f6f8fa",
    text: getContrastYIQ("#f6f8fa"), // Contrast based on light GitHub background
    primary: "#B8B3E9",
    secondary: "#6f42c1",
    accent: "#90E0F3",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
    // Additional colors
    link: "#007bff", // Link color
    border: "#d1d1d1", // Border color
    placeholder: "#b0b0b0", // Placeholder color
    muted: "#6c757d", // Muted text color
  },
  dark: {
    background: "#1e1e1e", // Darker background for dark mode
    text: getContrastYIQ("#1e1e1e"), // Adjusted text contrast for dark background
    primary: "#2d2d2d", // Darker primary color
    secondary: "#9b59b6", // A more vibrant purple for better contrast
    accent: "#1abc9c", // A slightly brighter green for accent
    success: "#28a745", // Same green for success
    danger: "#e74c3c", // A brighter red for danger
    warning: "#f39c12", // Slightly muted yellow for warning
    info: "#3498db", // Brighter blue for info
    // Additional colors
    link: "#1e90ff", // Link color in dark mode
    border: "#444444", // Darker border color
    placeholder: "#a8a8a8", // Placeholder color in dark mode
    muted: "#9e9e9e", // Muted text color in dark mode
  },

  coffee: {
    background: "#F6F2ED", // Darker background for dark mode
    text: "#272727", // Adjusted text contrast for dark background
    primary: "#4E8D7C", // Darker primary color
    secondary: "#4B2C20", // A more vibrant purple for better contrast
    accent: "#FFFFFF", // A slightly brighter green for accent
    success: "#28a745", // Same green for success
    danger: "#e74c3c", // A brighter red for danger
    warning: "#f39c12", // Slightly muted yellow for warning
    info: "#3498db",
    disable: "#8F8E8E",
  },
};

export default palette;
