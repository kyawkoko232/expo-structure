// Card.tsx
import React from "react";
import { createBox, createText, useTheme } from "@shopify/restyle";
import { Theme } from "@/theme/theme"; // Adjust the import based on your theme's path
import { textVariants } from "@/theme/textVariants"; // Import your text variants

const Box = createBox<Theme>();
const TextStyled = createText<Theme>();

interface CardProps {
  title: string;
  content: string;
  footer?: string;
}

const Card: React.FC<CardProps> = ({ title, content, footer }) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      backgroundColor="accent" // Use the background color from the theme
      borderRadius="md" // Use the responsive key for borderRadius
      padding="md" // Use the responsive key for padding
      marginVertical="sm" // Use the responsive key for margin
      shadowColor="text"
      shadowOpacity={0.1} // Increased shadow opacity for a more prominent shadow
      shadowRadius={10} // Increased shadow radius for a softer shadow
      elevation={5} // Increased elevation for Android shadow
    >
      <TextStyled variant="title" color="text">
        {title}
      </TextStyled>
      <TextStyled variant="secondary" color="text">
        {content}
      </TextStyled>
      {footer && (
        <TextStyled
          variant="secondary"
          color="text"
        >
          {footer}
        </TextStyled>
      )}
    </Box>
  );
};

export default Card;
