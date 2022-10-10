// Modules
import express, { Application } from 'express';
import { posRutes, preRoutes } from '../Middleware';

const app: Application = express();

//database
import '../db/';

// middleware preRoutes
preRoutes(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import Routes from '../routes';

Routes(app);

// meddleware posRutes
posRutes(app);

// Settings
app.set('port', process.env.PORT || 88);

export default app;
