import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dontenv';

import { db } from './models/index.js';

dotenv.config();
const { ADDRESS, PORT } = process.env;

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `${ADDRESS}:${PORT}`,
  })
);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(PORT || 8081, () => {});
