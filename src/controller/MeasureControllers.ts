import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import { TimeQuery } from '../db/interfaces';
import { MeasureData } from '../db/models';

// cron for
const date_valid = (init: string, end: string, i: number) => {
	const day: string = moment(init).add(i, 'day').format();
	const endDay: string = moment(end).format();

	return moment(day) <= moment(endDay);
};

/** getMeasureDatasByMeasure  */
export const getMeasureDatasByMeasure = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// define vars
		const { id } = req.params;
		const { initTime, endTime }: any = req.query;

		// error of vars
		if (!id) throw { message: 'El id es requerido', error: 400 };
		else if (!initTime || !endTime) throw { message: 'Se requiere una fecha de inicio y una de fin', error: 400 };

		// query
		const time: any = {
			$gte: new Date(initTime).toISOString(),
			$lt: new Date(endTime).toISOString(),
		};
		const resps: any = await MeasureData.find(
			{ $and: [{ id_wiseconn: id }, { time }] },
			{
				_id: 0,
				time: 1,
				value: 1
			}
		).lean();

		// response
		res.status(200).send(resps);
	} catch (err) {
		// response error
		next(err);
	}
};
