// modules
import { Request, Response, NextFunction } from 'express';
import { KeyApiAccess } from '../../db/models';

/**
 * este middleware es para detectar si el key q llega por query es correcto
 */
export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const keyApiAccess = req.query.keyApiAccess;
		console.log(req.query)
		const today = new Date().toISOString();

		const keyValid: any = await KeyApiAccess.findOne(
			{
				keyAccess: keyApiAccess,
				dateExpire: {$gte: today}
			}
		);
		console.log(keyValid)
		if (keyValid) {
			next();
		} else throw { status: false, message: 'Acceso no permitido, ApiKey inválido', code: 401 };
	} catch (err) {
		next(err);
	}
};
