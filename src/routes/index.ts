import { Application } from 'express';
import AdminRoutes from './admin';
//
const initRoutes: Function = (app: Application) => {
	AdminRoutes(app);
};
//
export default initRoutes;
