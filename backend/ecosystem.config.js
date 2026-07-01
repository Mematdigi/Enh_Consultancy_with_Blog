module.exports = {
  apps: [
    {
      name: 'enh-backend',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5001,
        MONGODB_URI: 'mongodb+srv://gdmematdigi_db_user:yWKjx0XNELTxoK7k@enh.xiff8j8.mongodb.net/blog-cms?retryWrites=true&w=majority',
      }
    }
  ]
}
