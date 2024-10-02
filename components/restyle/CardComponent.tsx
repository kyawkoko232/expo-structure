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
      backgroundColor="background" // Use the background color from the theme
      borderRadius="md" // Use the responsive key for borderRadius
      padding="md" // Use the responsive key for padding
      marginVertical="sm" // Use the responsive key for margin
      shadowColor="black"
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={2} // For Android shadow
    >
      <TextStyled variant="title" style={{ color: theme.colors.text }}>
        {title}
      </TextStyled>
      <TextStyled variant="secondary" style={{ color: theme.colors.text }}>
        {content}
      </TextStyled>
      {footer && (
        <TextStyled variant="secondary" style={{ color: theme.colors.secondary }}>
          {footer}
        </TextStyled>
      )}
    </Box>
  );
};

export default Card;
