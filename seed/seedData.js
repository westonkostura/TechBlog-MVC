const fs = require('fs');
const path = require('path');
const { User, Post, Comment } = require('../models');

const seedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seedData.json'), 'utf8'));

const seedDatabase = async () => {
    console.log(seedData.comments)
    // await User.bulkCreate(seedData.users);
    // await Post.bulkCreate(seedData.posts);
    await Comment.bulkCreate(seedData.comments);
    console.log("Seeding complete!");
    process.exit(0);
};

seedDatabase();