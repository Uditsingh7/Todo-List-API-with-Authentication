const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const dotenv = require('dotenv');

dotenv.config();

let mongoServer;

async function connectDb() {
    try {
        if (process.env.NODE_ENV === 'test') {
            mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose.connect(uri);
            console.log("Connected to test db");
        } else {
            const uri = process.env.MONGODB_URI;
            await mongoose.connect(uri);
            console.log("Connected to dev db")
        }
    }
    catch (error) {
        console.error("Connection to mongodb failed", error.message);
        process.exit(1); 
    }
}

async function closeDb() {
    try {
        if (process.env.NODE_ENV === 'test' && mongoServer) {
            await mongoose.connection.close();
            await mongoServer.stop();
        } else {
            mongoose.connection.close();
        }
    }
    catch (error) {
        console.error("Error closing mongodb connection", error.message);
        process.exit(1); 
    }
}

module.exports = { connectDb, closeDb };
