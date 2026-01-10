const axios = require('axios');

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:4000/api';
const TOKEN = process.env.AUTH_TOKEN; // You'll need to set this with your auth token

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers if available
if (TOKEN) {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${TOKEN}`;
    return config;
  });
}

async function updateAllBlogAuthors() {
  try {
    console.log('Fetching all blogs...');

    // Get all blogs
    const blogsResponse = await api.get('/blogs');
    const blogs = blogsResponse.data.data || blogsResponse.data;

    if (!blogs || blogs.length === 0) {
      console.log('No blogs found.');
      return;
    }

    console.log(`Found ${blogs.length} blogs. Updating authors...`);

    // Update each blog's author
    for (const blog of blogs) {
      try {
        console.log(`Updating blog "${blog.title}" (ID: ${blog._id})`);

        await api.put(`/blogs/${blog._id}`, {
          ...blog,
          author: 'team databiz'
        });

        console.log(`✓ Updated blog "${blog.title}"`);
      } catch (error) {
        console.error(`✗ Failed to update blog "${blog.title}":`, error.response?.data || error.message);
      }
    }

    console.log('\nAll blogs have been processed!');
  } catch (error) {
    console.error('Error updating blogs:', error.response?.data || error.message);
  }
}

// Run the script
updateAllBlogAuthors();