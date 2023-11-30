const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { name: req.body.name } });
        if (!user) {
            res.status(400).json({ message: 'No user account found!' });
            return;
        }

        const validPassword = user.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.json({ user, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// User logout
router.post('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;