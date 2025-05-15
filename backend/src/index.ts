import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/db';
import authRoutes from './routes/auth';
import { setupSwagger } from './config/swagger';


console.log('authRoutes:', authRoutes);


dotenv.config();

const app = express();
export default app;
app.use(cors({
  origin: ['http://localhost:3000', 'http://frontend:3000']
}));
app.use(express.json());

app.use('/api', authRoutes);
setupSwagger(app);

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

