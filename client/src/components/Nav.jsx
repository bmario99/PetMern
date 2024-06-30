
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { UserButton } from '@clerk/clerk-react';

// const Nav = () => {
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//                 <Link className="navbar-brand" to="/">MyApp</Link>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/">Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/add">Add Post</Link>
//                         </li>
//                     </ul>
//                     <UserButton />
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Nav;

import React from "react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Box, Flex, HStack, IconButton, useDisclosure, Stack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box>
            <Link to="/">PetMern</Link>
          </Box>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Link to="/">All Posts</Link>
            <Link to="/add">Add Post</Link>
            <Link to="/about-us">About Us</Link> {/* Add About Us link */}
            <Link to="/contact-us">Contact Us</Link>
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <UserButton />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            <Link to="/" onClick={onClose}>
              Home
            </Link>
            <Link to="/add" onClick={onClose}>
              Add Post
            </Link>
            <Link to="/about-us" onClick={onClose}>
              About Us
            </Link> {/* Add About Us link */}
            <Link to="/contact-us" onClick={onClose}>
              Contact Us
            </Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Nav;

