const express = require('express');
const path = require('path');
const notesRoutes = require('./routes/notesRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/api/notes', notesRoutes);
// Root route
app.get('/', (req, res) => {
  res.send('📝 Markdown Note-taking API is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
