import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import { Box, Image, Card, CardHeader, CardBody, CardFooter, Text, StackDivider, HStack, VStack, List, ListItem, ListIcon, Link as ChakraLink } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { FaHeart } from 'react-icons/fa';


function Recipe() {
    const { idMeal } = useParams();
    const [recipeResult, setRecipeResult] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
  
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
};

const handleLikeToggle = () => {
    setIsLiked(!isLiked);
};

  return (
    <Box bg='brand.gray'>
        <Card bg='brand.gray'>
            <Box display='flex' flexDirection='column' alignItems='center'>
            <HStack alignItems='center'>
            <Text fontSize='6xl' fontWeight='bold' textDecoration='underline' align='center' color='green.600' fontFamily='Josefin Sans, sans-serif' pb={8}>{recipeResult.strMeal}</Text>
            <div style={{ fontSize: '2rem' }}>
            <FaHeart color={isLiked ? 'red' : 'black'} onClick={handleLikeToggle} />
            </div>
            </HStack>
            </Box>
            <CardHeader display='flex' justifyContent='center' alignItems='center' pb={8}>
                <Box>
                <Image
                src={recipeResult.strMealThumb} 
                alt={recipeResult.strMeal}
                borderRadius='lg'
                pl={4}
                />
                </Box>
                    <Box flex='1' display='flex' flexDirection='column' alignItems='center'>
                    <VStack>
                        <Text fontSize='xl' fontWeight='bold' textDecoration='underline' align='center' color='blue.800'>
                                Category: {recipeResult.strCategory}
                        </Text>
                        <Text fontSize='xl' fontWeight='bold' textDecoration='underline' align='center' color='white.800' mb={8}>
                                Origin:  {recipeResult.strArea}
                        </Text>
                    </VStack>
                    <Text fontSize='3xl' fontWeight='bold' textDecoration='underline' align='center' color='green.600' fontFamily='Josefin Sans, sans-serif'>
                            Ingredients
                        </Text>  
                        <List spacing={3} fontFamily='Edu Tas Beginner, cursive'>
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
            </CardHeader>
            <CardBody pb={8}>
                <HStack divider={<StackDivider />} spacing='4'>
                <Box flex='1'>
                    <Text fontSize='3xl' fontWeight='bold' textDecoration='underline'  align='center' color='green.600' fontFamily='Josefin Sans, sans-serif'>
                            Directions
                        </Text>
                        <Text fontSize='xl'>
                            {recipeResult.strInstructions}
                        </Text>
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
                fontSize='xl'
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
