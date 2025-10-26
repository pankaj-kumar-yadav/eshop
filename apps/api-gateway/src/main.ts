/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import margon from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import proxy from 'express-http-proxy';
import axios from 'axios';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(margon("dev"));

app.use(express.json());
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req: any) => (req.user ? 1000 : 100),
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipKeyGenerator, // ✅ safe IPv4 + IPv6 handling
});

app.use(limiter);

app.get('/gateway-health', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

app.use("/", proxy("http://localhost:6001"))

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
