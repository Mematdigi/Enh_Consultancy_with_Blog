// services/bingService.js
const axios = require('axios');

/**
 * Notifies Bing about a URL change using the IndexNow protocol.
 * We do not use 'await' in the controller to keep the UI snappy.
 */
const submitUrlToBing = async (slug) => {
  const url = `${process.env.FRONTEND_URL}/posts/${slug}`;
  const endpoint = `https://www.bing.com/indexnow?url=${encodeURIComponent(url)}&key=${process.env.BING_API_KEY}`;

  try {
    await axios.post(endpoint);
    console.log(`[Bing Indexing] Successfully submitted: ${url}`);
  } catch (error) {
    // We log it but don't throw, so the user's post action succeeds even if Bing is down.
    console.error(`[Bing Indexing] Failed for ${url}:`, error.message);
  }
};

module.exports = { submitUrlToBing };