
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import { Box, Image, Text } from '@chakra-ui/react'

function SearchResultsPage() {
  const location = useLocation();
  const { searchResults } = location.state || { searchResults: [] };
  const { searchTerm } = useParams(); // Get the dynamic search term from the URL

 
//   const filteredResults = searchResults.filter((result) =>
//     result.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
//     );
  

//   return (
//     <div>
//       <h2>Search Results for: {searchTerm}</h2>
//       {/* <Box display="flex" flexWrap="wrap">
//         {searchResults.map((result) => (
//             <Box
//             key={result.idMeal}
//             className="result-box"
//             maxW="sm"
//             borderWidth="1px"
//             borderRadius="lg"
//             overflow="hidden"
//             m="2"
//           >
//             <Image src={result.strMealThumb} alt={result.strMeal} />
//             <Box p="6">
//               <Text fontSize="xl" fontWeight="bold">
//                 {result.strMeal}
//               </Text>
//               <Text>Category: {result.strCategory}</Text>
//               <Text>Area: {result.strArea}</Text>
//               <Text>Instructions: {result.strInstructions}</Text>
//               <Text>Video: {result.strYoutube}</Text>
//             </Box>
//           </Box> */}
//           <p>
//             searchResults.map((result) => (
        
//           </p>

//         ))}
//       </Box>
//     </div>
//   );

return (
    <div>
      <h2>Search Results for: {searchTerm}</h2>
      {searchResults.map((result) => (
        <p key={result.idMeal}>
          Meal Name: {result.strMeal}
          <br />
          Category: {result.strCategory}
          <br />
          Area: {result.strArea}
          <br />
          Instructions: {result.strInstructions}
          <br />
          Video: {result.strYoutube}
        </p>
      ))}
    </div>
  );
}

export default SearchResultsPage;

