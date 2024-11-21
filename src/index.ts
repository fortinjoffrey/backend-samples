import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import {Pool} from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

const query = async (text: string, params: any[] = []) => {
  return await pool.query(text, params);
};

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await query('SELECT * FROM users');
  res.json(users.rows);
});

app.post('/users', async (req, res) => {
  const user = await query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [
    req.body.name,
    req.body.email,
  ]);
  res.json(user.rows[0]);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
