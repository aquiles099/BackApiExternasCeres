import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import { MeasureData } from '../db/models';
import logger from '../logger.js';

import createBackLog from '../Middleware/createBackLogs';

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
	// define vars
	const { id } = req.params;
	let { initTime, endTime }: any = req.query;

	if (!id) {
		createBackLog('/measures/:id/data', 400, 'WARNING status 400 result ID invalid in getMeasureDatasByMeasure', req);
		logger.warn('WARNING status 400 result ID invalid in getMeasureDatasByMeasure');
		res.status(400).json({
			message: 'El id es requerido o es inválido'
		});
		return;
	} else if (!initTime || !endTime) {
		createBackLog('/measures/:id/data', 400, 'WARNING status 400 result ID invalid in getMeasureDatasByMeasure', req);
		logger.warn('WARNING status 400 result ID invalid in getMeasureDatasByMeasure');
		res.status(400).json({
			message: 'Se requiere un período de fecha de inicio y fecha fin'
		});
		return;
	}
	
	if (initTime.length == 10 && endTime.length == 10) {
		initTime = initTime + 'T00:00:00';
		endTime = endTime + 'T23:59:00';
	}

	// query
	await MeasureData.find(
		{ $and: 
			[
				{ id_wiseconn: id },
				{
					time: {
						$gte: initTime + '.000Z',
						$lte: endTime + '.000Z'
					}
				}
			]
		},
		{
			_id: 0,
			time: 1,
			value: 1
		}
	).lean()
	.then(async (dataMeasure: any) => {
		if (dataMeasure && dataMeasure.length > 0) {
			createBackLog('/measures/:id/data', 200, 'INFO status 200 result OK in getMeasureDatasByMeasure', req);
			logger.info('INFO status 200 result OK in getMeasureDatasByMeasure');
			res.status(200).json(dataMeasure);
		} else {
			createBackLog('/measures/:id/data', 200, 'WARNING status 200 result no data in getMeasureDatasByMeasure', req);
			logger.warn('WARNING status 200 result no data in getMeasureDatasByMeasure');
			res.status(200).json([]);
		}

	})
	.catch((err: any) => {
		// error
		createBackLog('/measures/:id/data', 500, err, req);
		logger.error('ERROR in getMeasureDatasByMeasure ' + err);
		res.status(500).json({error: 500, message: 'Error in API getting data'});
	});
};
