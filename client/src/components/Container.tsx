import React from "react";
import { Box } from "@chakra-ui/core";

interface ContainerProps {
  children: React.ReactChild;
  variant?: "small" | "regular";
}

const Container: React.FC<ContainerProps> = ({ children, variant }) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default Container;
