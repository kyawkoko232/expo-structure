// textVariants.ts
export const textVariants = {
  default: {
    color: "text",
    fontSize: 16, // Default font size
    fontFamily: "poppins", // Define fallback fonts as a string
  },
  primary: {
    color: "primary",
    fontSize: 16,
    fontFamily: "poppins_bold, poppins", // Fallback to 'poppins' and 'System'
  },
  secondary: {
    color: "secondary",
    fontSize: 16,
    fontFamily: "padauk_regular", // Fallback to 'System'
  },

  title: {
    color: "text",
    fontSize: 28.8, // h1 size in px
    fontFamily: "poppins",
    fontWeight: "700", // Corresponds to CSS style
  },

  titleA: {
    color: "text",
    fontSize: 28.8, // Same as title
    fontFamily: "poppins",
    fontWeight: "700", // Corresponds to CSS style
  },

  titleB: {
    color: "text",
    fontSize: 22.72, // h3 size in px
    fontFamily: "poppins",
    fontWeight: "500", // Corresponds to CSS style
  },

  defaults: {
    color: "text",
    fontSize: 16,
    fontFamily: "poppins",
  },

  textA: {
    fontSize: 18, // A custom size
    color: "text",
    fontFamily: "poppins",
    fontWeight: "400",
    marginTop: "md",
    lineHeight: 22, // Keep as defined
    opacity: 0.7,
  },

  link: {
    color: "primary",
    fontFamily: "poppins",
    fontSize: 15, // A custom size
    fontWeight: "500",
  },

  // Additional text styles based on your CSS definitions
  h1: {
    fontSize: 28.8, // h1 size in px
    fontFamily: "poppins",
    fontWeight: "700",
    color: "text",
  },
  
  h2: {
    fontSize: 25.6, // h2 size in px
    fontFamily: "poppins",
    fontWeight: "700",
    color: "text",
  },

  h3: {
    fontSize: 22.72, // h3 size in px
    fontFamily: "poppins",
    fontWeight: "700",
    color: "text",
  },

  h4: {
    fontSize: 20.32, // h4 size in px
    fontFamily: "poppins",
    fontWeight: "700",
    color: "text",
  },

  h5: {
    fontSize: 18.08, // h5 size in px
    fontFamily: "poppins",
    fontWeight: "700",
    color: "text",
  },

  small: {
    fontSize: 14.24, // small size in px
    fontFamily: "poppins",
    fontWeight: "400",
    color: "text",
  },
};
