const router = require('express').Router();

// const apiRoutes = require('./apiRoutes');
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postroutes');

// router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;