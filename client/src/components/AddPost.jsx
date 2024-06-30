// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddPost = () => {
//     const [title, setTitle] = useState("");
//     const [imageUrl, setImageUrl] = useState("");
//     const [content, setContent] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("http://localhost:8000/api/posts", {
//                 title,
//                 imageUrl,
//                 content,
//             });
//             navigate("/");
//         } catch (err) {
//             console.log(err);
//         }
//     };
//     return (
//         <div className="create">
//             <h1>Add New Post</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Title</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter title"
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Image URL</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter image url"
//                         onChange={(e) => setImageUrl(e.target.value)}
//                     />  
//                 </div>
//                 <div className="form-group">
//                     <label>Content</label>
//                     <textarea
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter content"
//                         onChange={(e) => setContent(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddPost;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/posts", {
        title,
        imageUrl,
        content,
      });
      toast({
        title: "Post created.",
        description: "Your post has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to create post.",
        description: "An error occurred while creating the post.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Add New Post
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="text"
              placeholder="Enter image URL"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <Textarea
              placeholder="Enter content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddPost;
