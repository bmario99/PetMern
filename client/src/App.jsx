// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { ChakraProvider } from '@chakra-ui/react';
// import { SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from '@clerk/clerk-react';

// import Nav from "./components/Nav";
// import PostList from "./components/PostList";
// import AddPost from "./components/AddPost";
// import EditPost from "./components/EditPost";
// import AboutPost from "./components/AboutPost";

// const App = () => {
//   return (
//     <ChakraProvider>
//       <Router>
//         <div>
//           <SignedIn>
//             <Nav /> {/* Render Nav component when user is signed in */}
//             <Routes>
//               <Route path="/" element={<PostList />} />
//               <Route path="/add" element={<AddPost />} />
//               <Route path="/profile/:postId" element={<EditPost />} />
//               <Route path="/post/:postId" element={<AboutPost />} />
//             </Routes>
//           </SignedIn>
//           <SignedOut>
//             <Routes>
//               <Route path="/" element={<RedirectToSignIn />} />
//               <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
//               <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
//             </Routes>
//           </SignedOut>
//         </div>
//       </Router>
//     </ChakraProvider>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

import Nav from "./components/Nav";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import AboutPost from "./components/AboutPost";
import AboutUs from "./components/AboutUs";
import ContactForm from "./components/ContactForm";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // You can log the error to a logging service here
  }

  render() {
    if (this.state.hasError) {
      return <div>Oops! Something went wrong. Please try again later.</div>;
    }

    return this.props.children;
  }
}

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <ErrorBoundary>
          <div>
            <SignedIn>
              <Nav /> {/* Render Nav component when user is signed in */}
              <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/add" element={<AddPost />} />
                <Route path="/profile/:postId" element={<EditPost />} />
                <Route path="/post/:postId" element={<AboutPost />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactForm />} />
              </Routes>
            </SignedIn>
            <SignedOut>
              <Routes>
                <Route path="/" element={<RedirectToSignIn />} />
                <Route
                  path="/sign-in/*"
                  element={<SignIn routing="path" path="/sign-in" />}
                />
                <Route
                  path="/sign-up/*"
                  element={<SignUp routing="path" path="/sign-up" />}
                />
              </Routes>
            </SignedOut>
          </div>
        </ErrorBoundary>
      </Router>
    </ChakraProvider>
  );
};

export default App;

