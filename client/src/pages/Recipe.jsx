import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import { Box, Image, Card, CardHeader, CardBody, CardFooter, Text, StackDivider, HStack, List, ListItem, ListIcon, Link as ChakraLink } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';


function Recipe() {
    const { idMeal } = useParams();
    const [recipeResult, setRecipeResult] = useState([]);
  
    useEffect(() => {
      // Perform the fetch request or any asynchronous operation to get search results
      const recipeUrl = `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${idMeal}`;
  
      fetch(recipeUrl)
        .then((response) => response.json())
        .then((data) => {
          setRecipeResult(data.meals ? data.meals[0] : null);
        })
        .catch((error) => {
          console.error('Error with fetch request:', error);
        });
    }, [idMeal]);

if (!recipeResult) {
    return <div>Loading...</div>;
}

const ingredients = [];
for (let i = 1; i <= 20; i++) {
    const ingredient = recipeResult[`strIngredient${i}`];
    const measurement = recipeResult[`strMeasure${i}`];

    if (!ingredient) {
        break;
    }

    ingredients.push(
        <li key={i}>
            {measurement} {ingredient}
        </li>
    )
}

  return (
    <Box bg='brand.gray'>
        <Card>
            <Text fontSize='4xl' fontWeight='bold' textDecoration='underline' align='center' color='green.600'>{recipeResult.strMeal}</Text>
            <CardHeader display='flex' justifyContent='center' alignItems='center' pb={8}>
                <Image
                src={recipeResult.strMealThumb} 
                alt={recipeResult.strMeal}
                borderRadius='lg'
                />
            </CardHeader>
            <CardBody pb={8}>
                <HStack divider={<StackDivider />} spacing='4'>
                <Box flex='1'>
                    <Text fontSize='2xl' fontWeight='bold' textDecoration='underline'  align='center' color='green.600'>
                            Directions
                        </Text>
                        <Text>
                            {recipeResult.strInstructions}
                        </Text>
                    </Box>
                    <Box flex='1' display='flex' flexDirection='column' alignItems='center'>
                    <Text fontSize='2xl' fontWeight='bold' textDecoration='underline' align='center' color='green.600'>
                            Ingredients
                        </Text>  
                        <List spacing={3}>
                            {ingredients.map((ingredient, index) => (
                                <ListItem key={index}>
                                    <HStack space={2}>
                                    <ListIcon as={CheckCircleIcon} color='green.500' />
                                    {ingredient}
                                    </HStack>
                                </ListItem>
                            ))}
                         </List>
                    </Box>
                </HStack>
            </CardBody>
            <CardFooter display='flex' justifyContent='center' alignItems='center'>
                <ChakraLink
                href={recipeResult.strYoutube}
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
  );
};

export default Recipe;
