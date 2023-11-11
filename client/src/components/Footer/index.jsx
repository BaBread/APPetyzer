import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  SimpleGrid,
  Stack,
  Heading,
  Divider,
  Button,
  Text,
  Image,
  HStack,
  Spacer,
  Link as ChakraLink,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" w="100%" mt="auto" bg="brand.green" p={4}>
      <HStack spacing={2} align="center" mb={{ base: 4, md: 0 }}>
        <Button
          colorScheme="red"
          variant="solid"
          ml={16}
          onClick={() => {
            /* Handle 'Refer a Friend' action */
          }}
        >
          Refer a Friend
        </Button>
        <Spacer />
        <Button
          colorScheme="red"
          variant="solid"
          mr={16}
          onClick={() => {
            /* Handle 'Donate' action */
          }}
        >
          Donate
        </Button>
      </HStack>
      <Heading as="h2" fontSize="xl" mt={3} align="center">
        Made with{" "}
        <span role="img" aria-label="heart" aria-hidden="false">
          ❤️
        </span>{" "}
        by the Appetyzer team.
      </Heading>
      <HStack
        spacing={2}
        align="center"
        justify="center"
        mb={{ base: 4, md: 0 }}
      >
        <Box
          as={Link}
          to="/:github${user}"
          _hover={{ color: "blue.500" }}
          fontSize="2xl"
          textDecoration="underline"
        >
          <Text m={1}>Charles Chavis</Text>
        </Box>
        <Box
          as={Link}
          to="/:github${user}"
          _hover={{ color: "blue.500" }}
          fontSize="2xl"
          textDecoration="underline"
        >
          <Text m={1}>Donald Leon</Text>
        </Box>
        <Box
          as={Link}
          to="/:github${user}"
          _hover={{ color: "blue.500" }}
          fontSize="2xl"
          textDecoration="underline"
        >
          <Text m={1}>Ricky Carter</Text>
        </Box>
        <Box
          as={Link}
          to="/:github${user}"
          _hover={{ color: "blue.500" }}
          fontSize="2xl"
          textDecoration="underline"
        >
          <Text m={1}>Robert Campbell Van Vliet II</Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default Footer;
