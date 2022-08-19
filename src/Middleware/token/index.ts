// modules
import { Request, Response, NextFunction } from 'express';
import list from './list';
import jwt from 'jsonwebtoken';
const key = '_secreto';
/**
 * este middleware es para detectar que la ruta requiere un token valido
 * y lo procesa
 */
export default (req: Request, res: Response, next: NextFunction) => {
	try {
		// define and valid route
		const route = req.path.split('/');

		const result = (() => {
			if (list.includes(route[1])) return true;
			else if (req.path === '/auth/newPassword' && req.method === 'PATCH') return true;
			else return false;
		})();

		if (result) {
			// valid token
			if (req.headers.token) {
				const token_route: any = req.headers.token;
				const token: any = jwt.verify(token_route, key);

				req.headers.token = token;

				next();
				//
			} else throw { status: false, message: 'El JWT es requerido para esta ruta', code: 401 };
		} else {
			//

			next();
		}
	} catch (err) {
		next(err);
	}
};
