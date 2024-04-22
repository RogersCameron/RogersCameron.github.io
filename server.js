const express = require('express');
const Joi = require('joi');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware to handle JSON, static files, and CORS
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Multer configuration for handling file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: './public/images/',
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    })
});

// Mongoose connection to MongoDB
mongoose.connect('mongodb+srv://cameronr129:Cowbutt23@games.wia1g2t.mongodb.net/?retryWrites=true&w=majority&appName=Games')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Mongoose schema and model for Game
const gameSchema = new mongoose.Schema({
    title: String,
    description: String,
    platforms: [String],
    cover: String,
});
const Game = mongoose.model('Game', gameSchema);

// Routes to serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/page2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page2.html'));
});
app.get('/page3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page3.html'));
});
app.get('/page4', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page4.html'));
});
app.get('/page5', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page5.html'));
});

// API endpoints for CRUD operations
app.get('/api/videogames', async (req, res) => {
    try {
        const games = await Game.find();
        res.send(games);
    } catch (error) {
        res.status(500).send("Error retrieving games: " + error.message);
    }
});

app.post('/api/videogames', upload.single('gameArtwork'), async (req, res) => {
    const { error } = validateGame(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const game = new Game({
        title: req.body.title,
        description: req.body.description,
        platforms: req.body.platforms.split(','),
        cover: req.file ? `/images/${req.file.filename}` : 'default-cover.jpg'
    });

    try {
        await game.save();
        res.send(game);
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

app.put('/api/videogames/:id', upload.single('cover'), async (req, res) => {
    const { error } = validateGame(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!game) return res.status(404).send('The game with the given ID was not found.');
        res.send(game);
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

app.delete('/api/videogames/:id', async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) return res.status(404).send('Game not found');
        res.send({ message: 'Game deleted successfully', game });
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

// Validation function using Joi
function validateGame(game) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().min(5).required(),
        platforms: Joi.string().required(),
        cover: Joi.allow()
    });
    return schema.validate(game);
}

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
