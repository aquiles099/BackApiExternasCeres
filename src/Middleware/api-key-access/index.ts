// modules
import { Request, Response, NextFunction } from 'express';
import { KeyApiAccess } from '../../db/models';

/**
 * este middleware es para detectar si el key q llega por query es correcto
 */
export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {keyapiaccess}: any = req.headers;

		if (!keyapiaccess) {
			res.status(401).json({
				message: 'Access Unauthorized'
			});
			return false;
		}

		const today = new Date().toISOString();

		await KeyApiAccess.findOne(
			{
				keyAccess: keyapiaccess,
				dateExpire: {$gte: today}
			}
		).lean()
		.then((keyValid: any) => {
			if (keyValid) {
				next();
			} else {
				res.status(401).json({
					message: 'Access Unauthorized'
				});
				return false;
			}
		})
		.catch((err: any) => {
			res.status(401).json({
				message: 'Access Unauthorized'
			});
			return false;
		})
	} catch (err) {
		res.status(401).json({
			message: 'Access Unauthorized'
		});
		return false;
	}
};
