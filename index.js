const express = require("express");
const router = require('./src/routes/index');
const cors = require("cors");
const mongoose = require('mongoose');
const { connectDb } = require("./db");
const swaggerDocs = require('./swagger');



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.disable('x-powered-by'); // less hackers know about our stack

// Middleware for error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// define route for our routers
app.use('/api/v1', router);



// listen to the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb();
    swaggerDocs(app, PORT)

});


// health check up route
app.get("/", (req, res) => {
    res.end("<h1>Welcome to the Task Wand APIs</h1><p>This is a simple NodeJS RESTful API using Express and MongoDB.</p>")
})

// Handle graceful shutdown
const gracefulShutdown = () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection is closed due to application termination');
        process.exit(0);
    });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Export the server instance
module.exports = server;  
