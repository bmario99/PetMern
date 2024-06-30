// import React from "react";

// const AboutUs = () => {
//     return (
//         <div className="about-us">
//             <h1>About Us</h1>
//             <p>Welcome to MyApp! We are dedicated to providing...</p>
//             {/* Add more content as needed */}
//         </div>
//     );
// };

// export default AboutUs;

import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const AboutUs = () => {
    return (
        <Box className="about-us" p={4} bg="gray.100" borderRadius="md" boxShadow="md">
            <Heading as="h1" size="xl" mb={4}>
                About Us
            </Heading>
            <Text fontSize="lg">
                Welcome to PetMern, where we are dedicated to helping pets find loving homes. 
                Our mission is to connect pets in need with caring individuals and families who are 
                ready to provide a forever home. Whether you are looking to adopt a new furry friend 
                or you're here to find a loving owner for a pet in your care, PetMern is here to 
                facilitate this heartfelt journey.
            </Text>
            <Text fontSize="lg" mt={4}>
                At PetMern, we believe in the power of companionship and the joy that pets bring 
                to our lives. Every adoption story is unique, and we are committed to supporting 
                both pets and their new families every step of the way.
            </Text>
            {/* Add more content as needed */}
        </Box>
    );
};

export default AboutUs;

