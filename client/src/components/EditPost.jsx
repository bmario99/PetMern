// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const EditPost = () => {
//     const { id } = useParams();
//     const [title, setTitle] = useState("");
//     const [imageUrl, setImageUrl] = useState("");
//     const [content, setContent] = useState("");
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios
//             .get(`http://localhost:8000/api/posts/${id}`)
//             .then((res) => {
//                 setTitle(res.data.title);
//                 setImageUrl(res.data.imageUrl);
//                 setContent(res.data.content);
//             })
//             .catch((err) => console.log(err));
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:8000/api/posts/${id}`, {
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
//             <h1>Edit Post</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Title</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter title"
//                         onChange={(e) => setTitle(e.target.value)}
//                         value={title}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Image URL</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter image URL"
//                         onChange={(e) => setImageUrl(e.target.value)}
//                         value={imageUrl}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Content</label>
//                     <textarea
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter content"
//                         onChange={(e) => setContent(e.target.value)}
//                         value={content}
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                     Update
//                 </button>
//                 <Link to="/" className="btn btn-secondary">
//                     Go Back
//                 </Link>
//             </form>
//         </div>
//     );
// };

// export default EditPost;


import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setImageUrl(res.data.imageUrl);
        setContent(res.data.content);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/posts/${id}`, {
        title,
        imageUrl,
        content,
      });
      toast({
        title: "Post updated.",
        description: "Your post has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to update post.",
        description: "An error occurred while updating the post.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Edit Post
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
            Update
          </Button>
          <Button as={Link} to="/" colorScheme="gray" width="full">
            Go Back
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EditPost;
