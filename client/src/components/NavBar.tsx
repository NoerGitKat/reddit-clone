import React from "react";
import { Box, Flex, Link } from "@chakra-ui/core";
import NextLink from "next/link";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex bg="tomato" p={4}>
      <Box ml={"auto"}>
        <NextLink href="/login">
          <Link mr={4}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default NavBar;
