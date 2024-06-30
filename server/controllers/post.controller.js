// const Post = require('../models/post.model');

// module.exports.createPost = (req, res) => {
//     const {title, content, imageUrl} = req.body;
//     Post.create({title, content, imageUrl})
//     .then((post) => res.json(post))
//     .catch((err) => res.status(400).json(err));
// }

// module.exports.getAllPosts = (req, res) => {
//     Post.find()
//     .then((posts) => res.json(posts))
//     .catch((err) => res.status(400).json(err));
// }

// module.exports.getOnePost = (req, res) => {
//     Post.findOne({_id: req.params.id})
//     .then((post) => res.json(post))
//     .catch((err) => res.status(400).json(err));
// }

// module.exports.updatePost = (req, res) => {
//     Post.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
//     .then((post) => res.json(post))
//     .catch((err) => res.status(400).json(err));
// }

// module.exports.deletePost = (req, res) => {
//     Post.deleteOne({_id: req.params.id})
//     .then((post) => res.json(post))
//     .catch((err) => res.status(400).json(err));
// }

const Post = require('../models/post.model');

module.exports.createPost = async (req, res) => {
    const { title, content, imageUrl } = req.body;
    try {
        const post = await Post.create({ title, content, imageUrl });
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.getOnePost = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: 'Failed to fetch post details' });
    }
};
module.exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const updatedPost = await Post.findOneAndUpdate({ _id: postId }, req.body, { new: true, runValidators: true });
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const deletedPost = await Post.deleteOne({ _id: postId });
        if (!deletedPost.deletedCount) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(deletedPost);
    } catch (err) {
        res.status(400).json(err);
    }
};
