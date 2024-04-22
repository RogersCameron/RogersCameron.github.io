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

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`Request Received: ${req.method} ${req.url}`);
    next();
});

// Multer configuration for secure file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: './public/images/',
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
            cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
        }
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// MongoDB connection
mongoose.connect('mongodb+srv://your_user:your_password@your_cluster/?retryWrites=true&w=majority')
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => {
        console.error('Could not connect to MongoDB:', err);
        process.exit(1);
    });

// Mongoose schema and model for Game
const gameSchema = new mongoose.Schema({
    title: String,
    description: String,
    platforms: [String],
    cover: String,
});
const Game = mongoose.model('Game', gameSchema);

// Routes for serving HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page5.html'));
});

// CRUD API for games
app.get('/api/videogames', async (req, res) => {
    try {
        const games = await Game.find();
        res.send(games);
    } catch (err) {
        console.error('Failed to retrieve games:', err);
        res.status(500).send('Failed to retrieve games');
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
        console.error('Failed to save game:', err);
        res.status(500).send('Failed to save game');
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
        console.error('Error updating game:', err);
        res.status(500).send('Server error: ' + err.message);
    }
});

app.delete('/api/videogames/:id', async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) return res.status(404).send('Game not found');
        res.send({ message: 'Game deleted successfully', game });
    } catch (err) {
        console.error('Error deleting game:', err);
        res.status(500).send('Server error');
    }
});

// Joi validation for game data
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
