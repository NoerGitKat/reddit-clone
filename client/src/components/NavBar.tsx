import React from "react";
import { Box, Flex, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useGetLoggedInUserQuery } from "./../generated/graphql";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useGetLoggedInUserQuery();

  let navBody = null;

  console.log("data", data);

  if (fetching) {
    navBody = null;
  } else if (!data?.getLoggedInUser) {
    navBody = (
      <>
        <NextLink href="/login">
          <Link mr={4}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    navBody = <>{data.getLoggedInUser.username}</>;
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box ml={"auto"}>{navBody} </Box>
    </Flex>
  );
};

export default NavBar;
