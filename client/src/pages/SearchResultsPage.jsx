import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Box, Image, Text, Heading, VStack, Divider, Stack, SimpleGrid, Card, CardBody, CardFooter, Button, Center, Link as ChakraLink } from '@chakra-ui/react';

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
<SimpleGrid columns={5} spacing={4} align='center'>
{searchResults.map((result) => (
<Box key={result.id} as='article'>
  <Card maxW='300px'mx='auto' mb={16} border='2px' borderColor='gray.300' borderRadius='lg' p={4}>
  <Link to={`/Recipe/${result.idMeal}`}>
  <Image
      src={result.strMealThumb} 
      alt={result.strMeal}
      borderRadius='lg'
    />
  </Link>
  <CardBody>
    <Stack mt='6' spacing='3'>
      <Text fontSize='3xl' align='center' color='gray.800' as="u">{result.strMeal}</Text>
      <Text color='green.600' fontSize='2xl' align='center'>
        {result.strCategory}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter display='flex' justifyContent='center' alignItems='center'>
      <ChakraLink
        href={result.strYoutube}
        target="_blank"
        rel="noopener noreferrer"
        textDecoration="underline"
        fontWeight="bold"
        color='blue'
        align='center'
      > 
      Video Instructions
      </ChakraLink>
  </CardFooter>
</Card>
</Box>
  ))}
</SimpleGrid>
  );
}

export default SearchResultsPage;