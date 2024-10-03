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
  title: {
    color: "text",
    fontSize: 24,
    fontFamily: "poppins_bold, poppins", // Fallback to 'poppins' and 'System'
  },
  title: {
    color: "text",
    fontSize: 20,
    fontFamily: "Poppins_700Bold, Padauk_400Regular",
    fontWeight: "700", // Fallback to Padauk
  },
  defaults: {
    color: "text",
    fontSize: 16,
    fontFamily: "Poppins_400Regular, Padauk_400Regular", // Fallback to Padauk_400Regular if Poppins is not available
  },
  
  textA: {
    fontSize: 19,
    // marginTop:8,
    color: "text",
    fontFamily: "Poppins_400Regular, Padauk_400Regular",
    fontWeight: "400", // Fallback to Padauk
    marginTop: "md",
    lineHeight: 22,
    opacity: 0.7,
  },

  link: {
    color: "success",
    fontFamily: "Poppins_700Bold, Padauk_400Regular",
    fontSize: 15,
    fontWeight: "500", // Fallback to Padauk
  },
};
