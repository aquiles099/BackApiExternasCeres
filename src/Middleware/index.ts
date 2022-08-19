import Cors from './secure';
import err from './err';
import err_404 from './err/err_404';
import { Application } from 'express';
import token from './token';
import apiKeyAccess from './api-key-access';

export const preRoutes = (app: Application) => {
	app.use(Cors);
	app.use(apiKeyAccess);
};

export const posRutes = (app: Application) => {
	app.use(err);
	app.use(err_404);
};
