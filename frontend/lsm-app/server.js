const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for your React application's domain
app.use(cors({
  origin: 'http://localhost:3000' // Adjust this to match the URL and port of your React app
}));

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});