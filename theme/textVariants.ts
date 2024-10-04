// textVariants.ts
export const textVariants = {
  default: {
    color: "text",
    fontSize: 16,
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

  titleA: {
    color: "text",
    fontSize: 26,
    fontFamily: "poppins",
    fontWeight: "600", // Fallback to Padauk
  },
  titleB: {
    color: "text",
    fontSize: 22,
    fontFamily: "poppins",
    fontWeight: "500", // Fallback to Padauk
  },
  defaults: {
    color: "text",
    fontSize: 16,
    fontFamily: "poppins",
  },

  textA: {
    fontSize: 18,
    color: "text",
    fontFamily: "poppins",
    fontWeight: "400",
    marginTop: "md",
    lineHeight: 22,
    opacity: 0.7,
  },
 
  link: {
    color: "success",
    fontFamily: "poppins",
    fontSize: 15,
    fontWeight: "500",
  },
};
