const express = require('express');
const router = express.Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.user.id
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post.userId === req.session.user.id) {
            await post.destroy();
            res.status(204).end();
        } else {
            res.status(401).json({ message: 'You are not authorized to delete this post' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;