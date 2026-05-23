import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'bhuvanesh',
  password: process.env.DB_PASSWORD || 'password123',
  database: process.env.DB_NAME || 'myappdb',
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Home endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Express + TypeScript app',
    version: '1.0.0'
  });
});

// DB test endpoint - checks if postgres is connected
app.get('/db-test', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.status(200).json({
      status: 'db connected ✅',
      db_time: result.rows[0].current_time,
      db_host: process.env.DB_HOST
    });
  } catch (error) {
    res.status(500).json({
      status: 'db connection failed ❌',
      error: String(error)
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;