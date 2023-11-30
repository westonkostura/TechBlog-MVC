const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const cleanDatabase = async () => {
    try {
        await Comment.destroy({ where: {} });
        await Post.destroy({ where: {} });
        await User.destroy({ where: {} });

        console.log('Database cleaned.');
    } catch (err) {
        console.error('Failed to clean database', err);
    } finally {
        try {
            await sequelize.close();
            console.log('Sequelize connection closed.');
        } catch (err) {
            console.error('Failed to close Sequelize connection', err);
        }
    }
};

cleanDatabase();