const getContrastYIQ = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#07020d" : "#f7f2fd"; // Dark text for light backgrounds, light text for dark backgrounds
};

const palette = {
  light: {
    background: "#F6F2ED",
    text: getContrastYIQ("#F6F2ED"),
    textOpposite: "#FFFFFF",
    primary: "#8a2be2",
    secondary: "#4a1e9e",
    accent: "#a92be2",
    support: "#2D57E2",
    neutral: "#1F3D9E",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
    disable: "#8F8E8E",
    // Additional colors
    link: "#007bff", 
    border: "#d1d1d1",
    placeholder: "#b0b0b0", 
    muted: "#6c757d", 
    disable: "#c6c6c6",
  },
  dark: {
    background: "#090901",
    text: getContrastYIQ("#090901"),
    textOpposite: "#334155",
    primary: "#d9cf0d",
    secondary: "#2a7e07",
    accent: "#1dbc0b",
    support: "#005f6a",  // Darker blue tone
    neutral: "#3f4453",  // Mid-tone neutral
    success: "#28a745",
    danger: "#e74c3c",
    warning: "#f39c12",
    info: "#3498db",

    // Additional colors
    link: "#1e90ff", 
    border: "#444444", 
    placeholder: "#a8a8a8", 
    muted: "#9e9e9e", 
    disable: "#666666",  // Dark grey for disabled elements
  },
  coffee: {
    background: "#F6F2ED",
    text: "#272727",
    textOpposite: "#f1f5f9",
    primary: "#4E8D7C",
    secondary: "#4B2C20",
    accent: "#FFFFFF",
    support: "#B29D8B",  // Warm brown tone for support
    neutral: "#7D5A50",  // Muted neutral tone
    success: "#28a745",
    danger: "#e74c3c",
    warning: "#f39c12",
    info: "#3498db",
    // Additional colors
    link: "#C49A6C",   // Light brown for links
    border: "#a0978e", // Light coffee tone for borders
    placeholder: "#b3a39d",  // Subtle coffee tone for placeholders
    muted: "#84746B",  // Soft brownish grey for muted text
    disable: "#8F8E8E", // Grey for disabled elements
  },
};

export default palette;
