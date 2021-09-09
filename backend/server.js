//Get the package from node.js
const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const UserRoutes = require('./routes/UserRoutes');
dotenv.config();
connectDB();

//Create the object that calls express
const app = express();

app.get('/', (req, res) => {
    res.send("API is running..");
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.use('/api/users', UserRoutes);

const PORT = process.env.PORT || 3000;

//Web server
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));