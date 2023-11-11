import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
// import { APIKey } from '../utils/recipe';

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

let myRecipes = Auth.getProfile().data.favorites;
console.log(myRecipes);

< Text ><span>My Account</span>

    <span fontSize="2xl" as="em" color='brand.black'>
        My Username: {Auth.getProfile().data.username}!
    </span>
    <span fontSize="2xl" as="em" color='brand.black'>
        My Email: {Auth.getProfile().data.email}!
    </span>
    <span fontSize="2xl" as="em" color='brand.black'>
        My Username: {Auth.getProfile().data.username}!
    </span>

</Text >

const ProfilePage = () => {
    const [myMeals, setMyMeals] = useState([]);
    let myMealsArray = [];
    useEffect(() => {
        const fetchMyMeals = async () => {
            try {
                await Promise.all(
                    myRecipes.map(async (favId) => {
                        const recipeUrl = `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${favId}`;
                        const response = await fetch(recipeUrl);

                        if (response.ok) {
                            const data = await response.json();
                            myMealsArray.push(data);
                        }
                    }));
                setMyMeals(myMealsArray);
            } catch (error) {
                console.error("Error fetching meals:", error);
            }
        };

        fetchMyMeals();
    }, []);

    return (
        <Box bg="brand.gray" pt={12} pb={12}>
            <SimpleGrid columns={[1, 2, 4, 5]} spacing={4}>
                {myMeals.map((favMeal) => (
                    <Card
                        key={favMeal.idMeal}
                        maxW="300px"
                        mx="auto"
                        mb={1}
                        border="3px"
                        borderColor="gray.300"
                        borderRadius="lg"
                        p={2}
                        bg="brand.blue"
                    >
                        <Link to={`/recipe/${favMeal.idMeal}`}>
                            <Image
                                src={favMeal.strMealThumb}
                                alt={favMeal.strMeal}
                                borderRadius="lg"
                            />
                        </Link>
                        <CardBody>
                            <Stack mt="6" spacing="3">
                                <Text fontSize="3xl" align="center" color="brand.black" as="u">
                                    {favMeal.strMeal}
                                </Text>
                                <Text color="green.600" fontSize="2xl" align="center">
                                    {favMeal.strCategory}
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <ChakraLink
                                href={favMeal.strYoutube}
                                target="_blank"
                                rel="noopener noreferrer"
                                textDecoration="underline"
                                fontWeight="bold"
                                color="blue"
                                align="center"
                            >
                                Video Instructions
                            </ChakraLink>
                        </CardFooter>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default ProfilePage;
