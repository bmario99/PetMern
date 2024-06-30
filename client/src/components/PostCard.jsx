
// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const PostCard = ({ post, onDelete }) => {
//     const handleDelete = async () => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this post?");
//         if (!confirmDelete) return;

//         try {
//             await axios.delete(`http://localhost:8000/api/posts/${post._id}`);
//             onDelete(post._id);  // Notify parent component about the deletion
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <div className="post">
//             <div className="img">
//                 <Link to={`/post/${post._id}`}>
//                     <img src={post.imageUrl} alt={post.title} />
//                 </Link>
//             </div>
//             <div className="content">
//                 <Link to={`/post/${post._id}`}>
//                     <h2>{post.title}</h2>
//                 </Link>
//                 <p>{post.content}</p>
//                 <button onClick={handleDelete} className="btn btn-danger">
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PostCard;

import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";

const PostCard = ({ post, onDelete }) => {
  const toast = useToast();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/posts/${post._id}`);
      onDelete(post._id); // Notify parent component about the deletion
      toast({
        title: "Post deleted",
        description: "Your post has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "An error occurred",
        description: "Failed to delete the post.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex p={4} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
      <Box flex="1">
        <Flex alignItems="center">
          <Box mr={4}>
            <Link to={`/post/${post._id}`}>
              <Image src={post.imageUrl} alt={post.title} boxSize="100px" />
            </Link>
          </Box>
          <Box>
            <Link to={`/post/${post._id}`}>
              <Heading as="h2" size="md" mb={2}>
                {post.title}
              </Heading>
            </Link>
            <Text>{post.content}</Text>
          </Box>
        </Flex>
      </Box>
      <Box>
        <Button colorScheme="red" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
    </Flex>
  );
};

export default PostCard;
