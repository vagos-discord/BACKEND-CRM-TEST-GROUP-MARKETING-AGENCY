import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoint de prueba
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'CRM API Server funcionando correctamente' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Servidor corriendo en http://localhost:${port}`);
});