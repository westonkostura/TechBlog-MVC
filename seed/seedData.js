const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const seedData = require('./seedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(seedData.users, {
        individualHooks: true,
        returning: true,
    });

    const posts = await Post.bulkCreate(seedData.posts.map(post => ({
        ...post,
        user_id: users.find(user => user.id === post.user_id).id,
    })), {
        returning: true,
    });

    for (const comment of seedData.comments) {
        await Comment.create({
            ...comment,
            user_id: users.find(user => user.id === comment.user_id).id,
            post_id: posts.find(post => post.id === comment.post_id).id,
        });
    }
    console.log('Database seeded!')
    process.exit(0);
};

seedDatabase();