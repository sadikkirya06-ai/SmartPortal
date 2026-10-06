import express from 'express';
import routes from './routes.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(express.json());
app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`SmartPortal API listening on http://localhost:${port}`);
});
