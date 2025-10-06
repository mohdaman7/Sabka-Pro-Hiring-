import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env';
import { connectToDatabase } from './config/db';
import { errorHandler } from './middleware/error';
import authRoutes from './routes/auth';
import jobRoutes from './routes/jobs';
import applicationRoutes from './routes/applications';
import crmRoutes from './routes/crm';

async function bootstrap() {
  await connectToDatabase(env.mongoUri);

  const app = express();
  app.use(cors({ origin: env.corsOrigin || true }));
  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use('/api/auth', authRoutes);
  app.use('/api/jobs', jobRoutes);
  app.use('/api/applications', applicationRoutes);
  app.use('/api/crm', crmRoutes);

  app.use(errorHandler);

  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
