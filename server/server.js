const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectToDb } = require('./connect.cjs'); 
const authRoutes = require('./routes/authRoutes'); 
const apiRoutes = require('./routes/apiRoutes'); 

const app = express();
const port = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(express.json());

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests
});

// Database connection
connectToDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }

  console.log('Database connection established');
  
  // CORS configuration
  app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true
  }));

  // Routes
  app.use('/auth', authLimiter, authRoutes); // Protected with rate limiting
  app.use('/api', apiRoutes);

  // Health check
  app.get('/', (req, res) => {
    res.send('BlazeBloom API is running');
  });

  // Error handling
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });

  // Start server
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});