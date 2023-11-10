import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import { SimpleGrid, Stack, Heading, Divider, Button, Text, Image, Card, CardBody, CardFooter, Link as ChakraLink } from '@chakra-ui/react'

const Home = () => {
  const [randomMeals, setRandomMeals] = useState([]);

  useEffect(() => {
    const fetchRandomMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v2/9973533/randomselection.php');
        const data = await response.json();

        console.log('API Response:', data);

        setRandomMeals(data.meals);
      } catch (error) {
        console.error('Error fetching random meals:', error);
      }
    };

    fetchRandomMeals();
  }, []);

  return (
    <main>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {randomMeals.slice(0,6).map((randomMeal) => (
      <Card key={randomMeal.idMeal} maxW='300px'mx='auto' mb={16} border='2px' borderColor='gray.300' borderRadius='lg' p={4}>
  <Link to={`/recipe/${randomMeal.idMeal}`}>
  <Image
      src={randomMeal.strMealThumb} 
      alt={randomMeal.strMeal}
      borderRadius='lg'
    />
  </Link>
  <CardBody>
    <Stack mt='6' spacing='3'>
      <Text fontSize='3xl' align='center' color='gray.800' as="u">{randomMeal.strMeal}</Text>
      <Text color='green.600' fontSize='2xl' align='center'>
        {randomMeal.strCategory}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter display='flex' justifyContent='center' alignItems='center'>
      <ChakraLink
        href={randomMeal.strYoutube}
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
        ))}
      </SimpleGrid>
    </main>
  );
};

export default Home;
