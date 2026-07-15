import express, { Router } from 'express';
import { captureRawBody, verifyWebhookSignature } from './verify-signature.middleware.js';
import { webhookController } from './webhook.controller.js';

export const webhookRouter = Router();

webhookRouter.use(express.json({ verify: captureRawBody }));
webhookRouter.post('/incidents', verifyWebhookSignature, webhookController.handleIncidentWebhook);
