const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config.env' });

let connection = {
  client: null,
  db: null
};

const connectionOptions = {
  maxPoolSize: 10,
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
};

const connectToDb = async (callback) => {
  const connectionString = process.env.ATLAS_URI;
  
  if (!connectionString) {
    const error = new Error('Missing MongoDB connection string in environment variables');
    if (callback) return callback(error);
    throw error;
  }

  try {
    if (connection.client) {
      await connection.client.close();
    }

    const client = await MongoClient.connect(connectionString, connectionOptions);
    connection.client = client;
    connection.db = client.db('BlazBloom');
    
    console.log('✅ Successfully connected to MongoDB');

    const collections = await client.db('BlazBloom').listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));

    client.on('serverClosed', (event) => {
      console.log('MongoDB connection closed:', event);
    });
    
    client.on('error', (err) => {
      console.error('MongoDB client error:', err);
    });

    if (callback) callback();
    return connection;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    if (callback) callback(err);
    throw err;
  }
};

const getDb = () => {
  if (!connection.db) {
    throw new Error('Database not connected. Call connectToDb first.');
  }
  return connection.db;
};

const closeConnection = async () => {
  if (connection.client) {
    await connection.client.close();
    connection.client = null;
    connection.db = null;
    console.log('MongoDB connection closed');
  }
};

process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});

module.exports = { 
  connectToDb, 
  getDb, 
  closeConnection 
};
