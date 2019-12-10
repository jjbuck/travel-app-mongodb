let Post = require('../models/posts').Post;
let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
let authMiddleware = require('../middleware/auth');

router.get('/', async (req, resp) => {
    let posts = await Post.find();
    resp.send(posts);
})

router.get('/:id', async (req, resp) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    resp.send(post);
})

router.post('/', authMiddleware, async (req, resp) => {
    let reqBody = req.body;
    let imagePath;
    if (reqBody.imageUrl) {
        imagePath = reqBody.imageUrl;
    } else {
        let path = req.file.path;
        imagePath = path.substring(path.indexOf('/'), path.length);
    }

    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        description: reqBody.description,
        date: new Date(),
        text: reqBody.text,
        country: reqBody.country,
        imageUrl: imagePath
    })
    console.log(req.file)
    await newPost.save();
    resp.sendStatus(200);
})

router.delete('/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await Post.deleteOne({id: id});
    resp.send('Deleted.');
})

router.put('/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    resp.send('Updated.');
})

module.exports = router;