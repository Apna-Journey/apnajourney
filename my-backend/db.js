//'mongodb+srv://apnajourney02:EfjPXjCP6otshvuD@cluster1.sjd1qsm.mongodb.net/?ssl=true&replicaSet=atlas-7vxsdi-shard-0&authSource=admin&retryWrites=true&w=majority'

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://apnajourney02:EfjPXjCP6otshvuD@cluster1.sjd1qsm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

let db;

async function connectToMongoDB() {
    const client = new MongoClient(uri, {
        tlsAllowInvalidCertificates: true // For testing, remove in production
    });

    try {
        await client.connect();
        db = client.db('Apna Journey'); // Replace with your database name
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
}

module.exports = { connectToMongoDB, getDB };