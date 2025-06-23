const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectToDb } = require('./connect.cjs');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

connectToDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }

  console.log('Database connection established');
  
  app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true
  }));

  app.use('/auth', authLimiter, authRoutes);
  app.use('/api', apiRoutes);
  app.use('/api/bookmark', bookmarkRoutes);

  app.get('/', (req, res) => {
    res.send('BlazeBloom API is running');
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });

  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});
