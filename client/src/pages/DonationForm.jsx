import React, { useState } from 'react';
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/client';
import { DONATE_MUTATION } from '../utils/mutations';
import { Box, Button } from "@chakra-ui/react";

const stripePromise = loadStripe('pk_test_51OC7lsKfkOVjB25dYlWzuOk0m0wUgJsmXZybD4ofPZCBJlrS7LZzFdLdVaoTFiQd0P4SyUrm1PBLjwPPGro9fRb000Hqxw4U1g');

const DonationForm = () => {
  const [loading, setLoading] = useState(false);

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

    setLoading(false);
  };

  const handleDonationOnServer = async (token) => {
    try {
      // Call the donate mutation with the necessary variables
      const { data } = await donate({
        variables: {
          amount: 1000, // Example: $10.00 (in cents)
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
    <Box>
      <Elements stripe={stripePromise}>
        <form onSubmit={(e) => handleSubmit(e, useElements(), useStripe())}>
          <CardElement />
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Donate'}
          </button>
        </form>
      </Elements>
    </Box>
  );
};

export default DonationForm;
