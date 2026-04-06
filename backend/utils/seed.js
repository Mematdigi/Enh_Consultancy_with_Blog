require('dotenv').config();
const mongoose = require('mongoose');
const { User, Category, Tag, Author } = require('../models');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create admin user
    const existingUser = await User.findOne({ email: 'admin@blog.com' });
    if (!existingUser) {
      await User.create({ name: 'Admin', email: 'admin@blog.com', password: 'admin123456', role: 'admin' });
      console.log('✅ Admin user created: admin@blog.com / admin123456');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create sample categories
    const cats = ['Technology', 'Lifestyle', 'Business', 'Health', 'Travel'];
    for (const name of cats) {
      const slug = name.toLowerCase();
      const exists = await Category.findOne({ slug });
      if (!exists) {
        await Category.create({ name, slug, description: `Posts about ${name}` });
        console.log(`✅ Category: ${name}`);
      }
    }

    // Create sample tags
    const tagNames = ['JavaScript', 'React', 'Node.js', 'MongoDB', 'CSS', 'Web Dev', 'Tutorial', 'Tips'];
    for (const name of tagNames) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const exists = await Tag.findOne({ slug });
      if (!exists) {
        await Tag.create({ name, slug });
        console.log(`✅ Tag: ${name}`);
      }
    }

    // Create a sample author
    const existingAuthor = await Author.findOne({ name: 'John Doe' });
    if (!existingAuthor) {
      await Author.create({
        name: 'John Doe',
        bio: 'A passionate writer and developer who loves sharing knowledge.',
        socialLinks: { twitter: 'https://twitter.com', github: 'https://github.com' },
      });
      console.log('✅ Sample author created');
    }

    console.log('\n🎉 Seed complete!');
    console.log('📧 Login: admin@blog.com');
    console.log('🔐 Password: admin123456');
    console.log('🌐 Admin URL: http://localhost:3000/admin/login\n');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seed();
