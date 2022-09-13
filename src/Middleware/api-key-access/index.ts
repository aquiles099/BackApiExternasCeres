// modules
import { Request, Response, NextFunction } from 'express';
import { KeyApiAccess } from '../../db/models';

/**
 * este middleware es para detectar si el key q llega por query es correcto
 */
export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {keyapiaccess}: any = req.headers;

		if (!keyapiaccess) throw { message: 'Acceso no permitido, ApiKey inválido', error: 401 };

		const today = new Date().toISOString();

		const keyValid: any = await KeyApiAccess.findOne(
			{
				keyAccess: keyapiaccess,
				dateExpire: {$gte: today}
			}
		);
		if (keyValid) {
			next();
		} else throw { message: 'Acceso no permitido, ApiKey inválido', error: 401 };
	} catch (err) {
		next({ message: 'Acceso no permitido, ApiKey inválido', error: 401 });
	}
};
