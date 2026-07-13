const axios = require('axios');

const submitUrlToBing = async (slug) => {
  const url = `${process.env.FRONTEND_URL}/posts/${slug}`;
  const endpoint = `https://api.indexnow.org/indexnow`; // Use the official API endpoint

  const payload = {
    host: new URL(process.env.FRONTEND_URL).hostname,
    key: process.env.BING_API_KEY,
    urlList: [url]
  };

  try {
    await axios.post(endpoint, payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
    console.log(`[Bing Indexing] Successfully submitted: ${url}`);
  } catch (error) {
    // The error object provides more detail about why the 415/400 occurred
    console.error(`[Bing Indexing] Failed for ${url}:`, error.response?.data || error.message);
  }
};

module.exports = { submitUrlToBing };