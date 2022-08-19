import measures_data from './measures.routes';
import farms from './farms.routes';
import zones from './zone.routes';
//
const initRoutes: Function = (app: any) => {
	app.use(farms);
	app.use(measures_data);
	app.use(zones);
};
//
export default initRoutes;
