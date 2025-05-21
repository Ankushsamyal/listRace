// connect.cjs
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config.env' });

// Use a connection object to store both db and client
let connection = {
  client: null,
  db: null
};

// Add connection options for better performance and reliability
const connectionOptions = {
  maxPoolSize: 10, // Limit connection pool size
  connectTimeoutMS: 5000, // Timeout after 5 seconds
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

const connectToDb = async (callback) => {
  // Prefer ATLAS_URI over ATLAS_URL as it's more standard
  const connectionString = process.env.ATLAS_URI || process.env.ATLAS_URL;
  
  if (!connectionString) {
    const error = new Error('Missing MongoDB connection string in environment variables');
    if (callback) return callback(error);
    throw error;
  }

  try {
    // Close existing connection if it exists
    if (connection.client) {
      await connection.client.close();
    }

    const client = await MongoClient.connect(connectionString, connectionOptions);
    connection.client = client;
    connection.db = client.db('BlazBloom');
    
   console.log('✅ Successfully connected to MongoDB');

    const collections = await client.db('BlazBloom').listCollections().toArray();
console.log('📁 Available collections:', collections.map(c => c.name));


    // Add event listeners for connection issues
    client.on('serverClosed', (event) => {
      console.log('MongoDB connection closed:', event);
    });
    
    client.on('error', (err) => {
      console.error('MongoDB client error:', err);
    });

    if (callback) callback(null);
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

// Handle process termination
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});

module.exports = { 
  connectToDb, 
  getDb, 
  closeConnection 
};