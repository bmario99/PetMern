

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import PostCard from "./PostCard";

// const PostList = () => {
//     const [posts, setPosts] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const res = await axios.get("http://localhost:8000/api/posts");
//                 setPosts(res.data);
//             } catch (err) {
//                 console.error("Failed to fetch posts:", err);
//                 setError("Failed to fetch posts. Please try again later.");
//             }
//         };
//         fetchPosts();
//     }, []);

//     const handleDelete = (id) => {
//         setPosts(posts.filter(post => post._id !== id));
//     };

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div className="post-list">
//             {posts.map((post) => (
//                 <PostCard key={post._id} post={post} onDelete={handleDelete} />
//             ))}
//         </div>
//     );
// };

// export default PostList;


import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import { Box, Text } from "@chakra-ui/react";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to fetch posts. Please try again later.");
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post._id !== id));
  };

  if (error) {
    return (
      <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box className="post-list">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} onDelete={handleDelete} />
      ))}
    </Box>
  );
};

export default PostList;
