const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Index.html'));
});

// Serve the anime page
app.get('/anime', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Anime.html'));
});

// Serve the anime list page
app.get('/anime-list', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'AnimeList.html'));
});

// Serve the search results page
app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'searchResult.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Sorry, page not found!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});