import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { checkConnection } from './config/database.js';
import { errorHandler, notFoundHandler } from './shared/middleware/error-handler.middleware.js';
import { incidentRouter } from './modules/incidents/incident.routes.js';
import { webhookRouter } from './webhooks/webhook.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());

  // Webhook routes are mounted before the global JSON body parser: they need
  // the raw request body bytes to verify the HMAC signature.
  app.use('/api/webhooks', webhookRouter);

  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.get('/api/health', async (_req, res) => {
    const dbOk = await checkConnection();
    res.status(dbOk ? 200 : 503).json({
      status: dbOk ? 'ok' : 'degraded',
      db: dbOk ? 'connected' : 'unreachable',
    });
  });

  app.use('/api/incidents', incidentRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
