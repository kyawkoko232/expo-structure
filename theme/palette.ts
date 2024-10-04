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
    text: getContrastYIQ("#f6f8fa"),
    primary: "#4B2C20",
    secondary: "#D5BBA2",
    accent: "#A67C52",
    success: "#4E8D7C",
    black:"#272727",
    white:"#F6F2ED",
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
    background: "#08020d",
    text: getContrastYIQ("#08020d"),
    primary: "#332920", // Simplified single color
    secondary: "#1E1410", // Simplified single color
    accent: "#8C6A4F", // Simplified single color
    success: "#3C7266",
    black:"#2E2A27",
    white:"#989898",
    danger: "#f44336",
    warning: "#ffeb3b",
    info: "#2196f3",
    // Additional colors
    link: "#1e90ff", // Link color in dark mode
    border: "#444444", // Darker border color
    placeholder: "#a8a8a8", // Placeholder color in dark mode
    muted: "#9e9e9e", // Muted text color in dark mode
  },

  coffee : {
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
  }
};

export default palette;
