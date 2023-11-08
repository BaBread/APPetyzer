import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import { SimpleGrid, Stack, Heading, Divider, Button, Text, Image, Card, CardBody, CardFooter } from '@chakra-ui/react'

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        <Card>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md' align='center'>Recipe Name</Heading>
              <Text color='green.600' fontSize='2xl'>
                Tags
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button>View here(Link to Youtube)</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md' align='center'>Recipe Name</Heading>
              <Text color='green.600' fontSize='2xl'>
                Tags
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button>View here(Link to Youtube)</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md' align='center'>Recipe Name</Heading>
              <Text color='green.600' fontSize='2xl'>
                Tags
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button>View here(Link to Youtube)</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md' align='center'>Recipe Name</Heading>
              <Text color='green.600' fontSize='2xl'>
                Tags
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button>View here(Link to Youtube)</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md' align='center'>Recipe Name</Heading>
              <Text color='green.600' fontSize='2xl'>
                Tags
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button>View here(Link to Youtube)</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md' align='center'>Recipe Name</Heading>
              <Text color='green.600' fontSize='2xl'>
                Tags
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button>View here(Link to Youtube)</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>

    </main>
  );
};

export default Home;
