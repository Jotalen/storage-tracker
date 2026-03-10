import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute';
import itemRoute from './routes/itemRoute';
import dashboardRoute from './routes/dashboardRoute';
import listingRoute from './routes/listingRoute';
import reportRoute from './routes/reportRoute';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/items', itemRoute);
app.use('/dashboard', dashboardRoute);
app.use('/listings', listingRoute);
app.use('/reports', reportRoute);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'StorageTraker API is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
