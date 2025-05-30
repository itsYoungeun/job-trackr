import express from 'express';
import cors from 'cors';
import imageRoute from './routes/imageRoute.ts';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/image', imageRoute);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

const PORT = process.env['PORT'] || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));