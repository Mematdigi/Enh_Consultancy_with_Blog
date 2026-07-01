require('dotenv').config();
const mongoose = require('mongoose');

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');
  console.log('🔄 Replacing localhost:5000 with:', process.env.BACKEND_URL);

  const db = mongoose.connection.db;

  const mediaResult = await db.collection('media').updateMany(
    { url: { $regex: 'localhost:5000' } },
    [{ $set: { url: { $replaceAll: { 
      input: '$url', 
      find: 'http://localhost:5000', 
      replacement: process.env.BACKEND_URL 
    }}}}]
  );
  console.log(`📸 Fixed ${mediaResult.modifiedCount} media records`);

  const authorResult = await db.collection('authors').updateMany(
    { avatar: { $regex: 'localhost:5000' } },
    [{ $set: { avatar: { $replaceAll: { 
      input: '$avatar', 
      find: 'http://localhost:5000', 
      replacement: process.env.BACKEND_URL 
    }}}}]
  );
  console.log(`👤 Fixed ${authorResult.modifiedCount} author records`);

  const postResult = await db.collection('posts').updateMany(
    { featuredImage: { $regex: 'localhost:5000' } },
    [{ $set: { featuredImage: { $replaceAll: { 
      input: '$featuredImage', 
      find: 'http://localhost:5000', 
      replacement: process.env.BACKEND_URL 
    }}}}]
  );
  console.log(`📝 Fixed ${postResult.modifiedCount} post records`);

  await mongoose.disconnect();
  console.log('🎉 All done! Restart your server now.');
}

fix().catch(console.error);