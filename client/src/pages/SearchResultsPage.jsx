import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Box, Image, Text, Heading, VStack, HStack, Link as ChakraLink } from '@chakra-ui/react';

function RecipeInstructions({ instructions }) {
  const instructionSteps = instructions.split('\n').filter(step => step.trim() !== '');

  return (
    <VStack align="start" spacing={2}>
      <Heading as="h3" size="md">
        Written Instructions:
      </Heading>
      <VStack align="start" spacing={1}>
        {instructionSteps.map((step, index) => (
          <Text key={index}>{step}</Text>
        ))}
      </VStack>
    </VStack>
  );
}

function SearchResultsPage() {
  const location = useLocation();
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Perform the fetch request or any asynchronous operation to get search results
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.meals || []);
      })
      .catch((error) => {
        console.error('Error with fetch request:', error);
      });
  }, [searchTerm]);

  return (
    <Box>
      <Heading as="h2" mb={4}>
        Search Results for: {searchTerm}
      </Heading>
      <HStack spacing={4} flexWrap="wrap">
        {searchResults.map((result) => (
          <Box
            key={result.idMeal}
            className="result-box"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            m={2}
          >
            <Image src={result.strMealThumb} alt={result.strMeal} />
            <VStack align="start" p={6} spacing={2}>
              <Heading as="h2" size="lg" fontWeight="bold">
                {result.strMeal}
              </Heading>
              <Text>Category: {result.strCategory}</Text>
              <Text>Region of Origin: {result.strArea}</Text>
              <RecipeInstructions instructions={result.strInstructions} />
              <HStack>
                <Text>Visual Instructions:</Text>
                <ChakraLink
                  href={result.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  textDecoration="underline"
                  fontWeight="bold"
                >
                  {result.strYoutube}
                </ChakraLink>
              </HStack>
            </VStack>
          </Box>
        ))}
      </HStack>
    </Box>
  );
}

export default SearchResultsPage;

