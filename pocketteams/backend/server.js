//Get the package from node.js
const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const UserRoutes = require('./routes/UserRoutes');
const { NotFound, ErrorHandler } = require('./middlewares/ErrorMiddleware');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use('/api/users', UserRoutes);
app.use(NotFound);
app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;

//Web server
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));