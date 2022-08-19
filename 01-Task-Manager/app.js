const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use('/api/v1/tasks', tasks);
// app.get('/', )
const port = 5000;
const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Listening on Port ${port}...`))
    } catch (err) {
        console.log(err);
    }
}

start();