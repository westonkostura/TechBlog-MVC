const router = require('express').Router();
const { Post, User, Comment } = require('../models/index');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', { 
            posts, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        console.log(postData);
        const post = postData.get({ plain: true });

        res.render('post', { 
            post, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/dashboard', async (req, res) => {
    try {
        if (req.session.logged_in) {
            const posts = await Post.findAll({
                where: {
                    userId: req.session.user_id,
                },
            });

            res.render('dashboard', {
                posts,
                logged_in: true
            });
        } else {
            res.render('dashboard', {
                logged_in: false
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;