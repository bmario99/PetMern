// const PostController = require('../controllers/post.controller');

// module.exports = (app) => {
//     app.get('/api/posts', PostController.getAllPosts);
//     app.get('/api/posts/:id', PostController.getOnePost);
//     app.put('/api/posts/:id', PostController.updatePost);
//     app.post('/api/posts', PostController.createPost);
//     app.delete('/api/posts/:id', PostController.deletePost);
// }

const PostController = require('../controllers/post.controller');

module.exports = (app) => {
    app.get('/api/posts', PostController.getAllPosts);
    app.get('/api/posts/:id', PostController.getOnePost);
    app.put('/api/posts/:id', PostController.updatePost);
    app.post('/api/posts', PostController.createPost);
    app.delete('/api/posts/:id', PostController.deletePost);
};
