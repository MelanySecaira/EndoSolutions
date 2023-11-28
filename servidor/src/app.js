import express from 'express';
import cors from 'cors';

import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(express.json());
const whiteList = [
    "http://localhost:4200",
    "https://localhost:4200",
];

  app.use(
    cors({
      credentials: true,
      origin: whiteList,
    })
  );

app.use(indexRoutes);

export default app;