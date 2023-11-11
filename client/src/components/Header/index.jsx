import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Auth from "../../utils/auth";
import {
  Box,
  SimpleGrid,
  GridItem,
  Stack,
  HStack,
  Input,
  Heading,
  Divider,
  Button,
  Text,
  Image,
  Card,
  CardBody,
  CardFooter,
  Link as ChakraLink,
} from "@chakra-ui/react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      performFetchSearch(searchTerm);

    }
  };

  function performFetchSearch(term) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const results = data.meals;
        console.log(results);
        setSearchResults(results);


        window.location.href = `/search-results/${term}`;
      })
      .catch((error) => {
        console.error("Error with fetch request: ", error);
      });
  }

  return (
    <Box bg="brand.green" p={4}>
      <SimpleGrid spacing={1} templateColumns="repeat(3, 1fr)">
        <HStack>
          <Box>
            <Link>
              <Text
                ml={6}
                fontSize="5xl"
                as="b"
                fontFamily="Edu TAS Beginner, cursive"
                to="/"
              >
                Appetyzer
              </Text>
            </Link>
          </Box>
          <Box flex="1" pl={4}>
            <Text fontSize="2xl" as="i" fontFamily="Josefin Sans, sans-serif">
              ¡¡Bon Appetite!!
            </Text>
          </Box>
        </HStack>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Input
            type="text"
            size="lg"
            placeholder="Search for a meal..."
            _placeholder={{ color: "brand.black" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/search-results">

            <Button onClick={handleSearch} ml={2}>
              Search
            </Button>
          </Link>
        </Box>
        <Box display="flex" justifyContent="end" alignItems="center">
          <Text fontSize="2xl" as="em" color='brand.black'>
            {Auth.loggedIn() ? (
              <>
                <span>Hey there, {Auth.getProfile().data.username}!</span>
                <Button className="btn btn-lg btn-light m-2" ml={5} onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <HStack spacing={3}>
                  <Box
                    as={Link}
                    to="/login"
                    _hover={{ color: "blue.500" }}
                    fontSize="2xl"
                    textDecoration="underline"
                  >
                    Login
                  </Box>
                  <Box
                    as={Link}
                    to="/signup"
                    _hover={{ color: "blue.500" }}
                    fontSize="2xl"
                    textDecoration="underline"
                  >
                    Signup
                  </Box>
                </HStack>
              </>
            )}
          </Text>
        </Box>
        {searchResults.length > 0 && (
          <Box className="container">
            <Text fontSize="2xl">Search Results</Text>
            <ul>
              {searchResults.map((result) => (
                <li key={result.idMeal}>{result.strMeal}</li>
              ))}
            </ul>
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Header;
