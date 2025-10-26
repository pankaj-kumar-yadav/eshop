import express from 'express';
import cors from 'cors';
import { errorMiddleware } from '@packages/error-handler/error-middleware';
import cookieParser from 'cookie-parser';
import router from './routes/auth.router';
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("./swagger-output.json");

const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send({ message: 'Smash the subscribe button' });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/docs-json", (req, res) => {
  res.json(swaggerDocument);
});

// Routes
app.use("/api", router);

app.use(errorMiddleware);

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 6001;

const server = app.listen(port, () => {
  console.log(`Auth service listening at http://${host}:${port}/`);
  console.log(`Swagger Docs available at http://${host}:${port}/api-docs`)
});

server.on('error', (err) => {
  console.error("Server Error: ", err);
});