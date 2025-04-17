import express from 'express';
import imageRoutes from './routes/imageRoutes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/image', imageRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));