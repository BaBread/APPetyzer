import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react'

const Recipe = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
        <Grid
        h='200px'
        templateRows='repeat(4, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
        >
        <GridItem rowSpan={2} colSpan={2} bg='tomato'>
            <Image
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Green double couch with wooden legs'
            borderRadius='lg'
            />
        </GridItem>
        <GridItem rowSpan={2} colSpan={2} bg='papayawhip'>
            <UnorderedList>
                <ListItem>Ingredient 1 and measurement (needs to .map from fetch and create additional tags)</ListItem>
            </UnorderedList>
        </GridItem>
        <GridItem colSpan={4} bg='tomato'>
            <OrderedList>
                <ListItem>Recipe Step 1 (needs to .map from fetch and create additional tags)</ListItem>
            </OrderedList>
        </GridItem>
        </Grid>
    </main>
  );
};

export default Recipe;
