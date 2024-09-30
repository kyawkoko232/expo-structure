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
      primary: "#e1e4e8",
      secondary: "#6f42c1",
      accent: "#28a745",
      success: "#28a745",
      danger: "#dc3545",
      warning: "#ffc107",
      info: "#17a2b8",
    },
    dark: {
        background: "#f6f8fa",
        text: getContrastYIQ("#f6f8fa"), // Contrast based on light GitHub background
        primary: "#e1e4e8",
        secondary: "#6f42c1",
        accent: "#28a745",
        success: "#28a745",
        danger: "#dc3545",
        warning: "#ffc107",
        info: "#17a2b8",
      },
  };
  
  export default palette;
  