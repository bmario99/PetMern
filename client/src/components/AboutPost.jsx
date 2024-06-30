// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Image,
//   Text,
//   Heading,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";

// const AboutPost = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [title, setTitle] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [content, setContent] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();
//   const toast = useToast();

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/api/posts/${postId}`);
//         setPost(res.data);
//         setTitle(res.data.title);
//         setImageUrl(res.data.imageUrl);
//         setContent(res.data.content);
//       } catch (err) {
//         console.error("Failed to fetch post details:", err);
//       }
//     };
//     fetchPost();
//   }, [postId]);

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`http://localhost:8000/api/posts/${postId}`, {
//         title,
//         imageUrl,
//         content,
//       });
//       toast({
//         title: "Post updated.",
//         description: "The post has been successfully updated.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//       setIsEditing(false);
//       navigate("/");
//     } catch (err) {
//       console.error("Failed to update post:", err);
//       toast({
//         title: "Failed to update post.",
//         description: "An error occurred while updating the post.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   if (!post) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <Box maxW="xl" mx="auto" p={4}>
//       {isEditing ? (
//         <VStack spacing={4}>
//           <FormControl>
//             <FormLabel>Title</FormLabel>
//             <Input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Image URL</FormLabel>
//             <Input
//               type="text"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)}
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Content</FormLabel>
//             <Textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//             />
//           </FormControl>
//           <Button colorScheme="teal" onClick={handleUpdate}>
//             Update Post
//           </Button>
//         </VStack>
//       ) : (
//         <Box>
//           <Image src={post.imageUrl} alt={post.title} />
//           <Heading as="h2" size="xl" mt={4}>
//             {post.title}
//           </Heading>
//           <Text mt={4}>{post.content}</Text>
//           <Button mt={4} colorScheme="teal" onClick={() => setIsEditing(true)}>
//             Edit Post
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default AboutPost;





import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import {
  Box,
  Image,
  Text,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";

const AboutPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts/${postId}`);
        setPost(res.data);
        setTitle(res.data.title);
        setImageUrl(res.data.imageUrl);
        setContent(res.data.content);
      } catch (err) {
        console.error("Failed to fetch post details:", err);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("chat message", (msg) => {
      setChatMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/posts/${postId}`, {
        title,
        imageUrl,
        content,
      });
      toast({
        title: "Post updated.",
        description: "The post has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsEditing(false);
      navigate("/");
    } catch (err) {
      console.error("Failed to update post:", err);
      toast({
        title: "Failed to update post.",
        description: "An error occurred while updating the post.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSendMessage = () => {
    const socket = io("http://localhost:8000");
    socket.emit("chat message", { message: chatMessage });
    setChatMessage("");
  };

  if (!post) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box maxW="xl" mx="auto" p={4}>
      {isEditing ? (
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleUpdate}>
            Update Post
          </Button>
        </VStack>
      ) : (
        <Box>
          <Image src={post.imageUrl} alt={post.title} />
          <Heading as="h2" size="xl" mt={4}>
            {post.title}
          </Heading>
          <Text mt={4}>{post.content}</Text>
          <Box mt={4}>
            <Textarea
              placeholder="Type your message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <Button mt={2} colorScheme="teal" onClick={handleSendMessage}>
              Send Message
            </Button>
          </Box>
          <Box mt={4}>
            <Heading as="h3" size="md">Chat Messages</Heading>
            {chatMessages.map((msg, index) => (
              <Text key={index} mt={2}>{msg.message}</Text>
            ))}
          </Box>
          <Button mt={4} colorScheme="teal" onClick={() => setIsEditing(true)}>
            Edit Post
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AboutPost;
