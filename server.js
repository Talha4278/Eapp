const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3003;

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String
});

const User = mongoose.model('User', userSchema);

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://carrent:talha0404@atlascluster.2xalv0p.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster', {
    useNewUrlParser: true,  // Optional, if using older drivers
    useUnifiedTopology: true // Optional, if using older drivers
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://127.0.0.1:5501','https://eapp-eight.vercel.app'], // Replace with the URL of your front-end
    methods: ['GET', 'POST'], // Allow specific methods
    credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));

// Route to retrieve all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all user documents from the MongoDB collection
        console.log('Fetched users:', users); // Log the fetched data
        res.status(200).json(users); // Send the data as JSON
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Error retrieving users');
    }
});

// Route to handle form submission
app.post('/submit-data', async (req, res) => {
    try {
        console.log('Received data:', req.body); // Log received data
        const newUser = new User({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address
        });
        await newUser.save();
        res.status(200).send('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
