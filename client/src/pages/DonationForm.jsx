// import React, { useState } from 'react';
// import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useMutation } from '@apollo/client';
// import { DONATE_MUTATION } from '../utils/mutations';
// import { Box, Button } from "@chakra-ui/react";

// const stripePromise = loadStripe('pk_test_51OC7lsKfkOVjB25dYlWzuOk0m0wUgJsmXZybD4ofPZCBJlrS7LZzFdLdVaoTFiQd0P4SyUrm1PBLjwPPGro9fRb000Hqxw4U1g');

// const DonationForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [amount, setAmount] = useState(0);

//   // UseMutation for GraphQL
//   const [donate] = useMutation(DONATE_MUTATION);

//   const handleSubmit = async (event, elements, stripe) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setLoading(true);

//     const { token, error } = await stripe.createToken(elements.getElement(CardElement));

//     if (error) {
//       console.error(error);
//       setLoading(false);
//       return;
//     }

//     // Call your GraphQL mutation to handle the donation on the server side
//     await handleDonationOnServer(token);


//     setAmount(0);
//     setLoading(false);
//   };

//   const handleDonationOnServer = async (token) => {
//     try {
//       // Call the donate mutation with the necessary variables
//       const { data } = await donate({
//         variables: {
//           amount: amount * 100, // Example: $10.00 (in cents)
//           token: token.id,
//         },
//       });

//       if (data.donate.success) {
//         console.log('Donation successful!');
//         // Handle success on the client side if needed
//       } else {
//         console.error('Donation failed:', data.donate.errorMessage);
//         // Handle donation failure on the client side if needed
//       }
//     } catch (error) {
//       console.error('Error processing donation:', error.message);
//     }
//   };

//   return (
//     <Box>
//      <Elements stripe={stripePromise}>
//         <form onSubmit={(e) => handleSubmit(e, useElements(), useStripe())}>
//           <CardElement />
//           <div>
//             <label htmlFor="amount">Donation Amount ($): </label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" disabled={loading}>
//             {loading ? 'Processing...' : 'Donate'}
//           </button>
//         </form>
//       </Elements>
//     </Box>
//   );
// };

// export default DonationForm;

import React, { useState } from 'react';
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/client';
import { DONATE_MUTATION } from '../utils/mutations';
import { Box, Input, Button, Flex, Heading, Text } from "@chakra-ui/react";

const stripePromise = loadStripe('pk_test_51OC7lsKfkOVjB25dYlWzuOk0m0wUgJsmXZybD4ofPZCBJlrS7LZzFdLdVaoTFiQd0P4SyUrm1PBLjwPPGro9fRb000Hqxw4U1g');

const DonationForm = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  // UseMutation for GraphQL
  const [donate] = useMutation(DONATE_MUTATION);

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { token, error } = await stripe.createToken(elements.getElement(CardElement));

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    // Call your GraphQL mutation to handle the donation on the server side
    await handleDonationOnServer(token);

    setAmount(0);
    setLoading(false);
  };

  const handleDonationOnServer = async (token) => {
    try {
      // Call the donate mutation with the necessary variables
      const { data } = await donate({
        variables: {
          amount: amount * 100, // Example: $10.00 (in cents)
          token: token.id,
        },
      });

      if (data.donate.success) {
        console.log('Donation successful!');
        // Handle success on the client side if needed
      } else {
        console.error('Donation failed:', data.donate.errorMessage);
        // Handle donation failure on the client side if needed
      }
    } catch (error) {
      console.error('Error processing donation:', error.message);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="calc(100vh - 240px)"
      bg='brand.gray'
    >
      <Box w="full" maxW="lg" p={6}>
        <Box bg="brand.black" p={8} borderRadius="lg">
          <Heading as="h4" size="md" color="white" mb={4}>
            Donation Form - Thank You for Helping Maintain Appetyzer!
          </Heading>
          <Box>
            <form onSubmit={(e) => handleSubmit(e, useElements(), useStripe())}>
              <Elements stripe={stripePromise}>
                <CardElement />
              </Elements>
              <Input
                placeholder="Donation Amount ($)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                mb={4}
                color="white"
              />
              <Button
                colorScheme="green"
                size="lg"
                type="submit"
                w="full"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Donate'}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default DonationForm;

