import {
	Zone,
	Measure,
	PhysicalConnection,
	Farm
} from '../db/models';
import { Request, Response, NextFunction } from 'express';

import logger from '../logger.js';

import createBackLog from '../Middleware/createBackLogs';

// obtain measures for Zone by idwiseconn
export const getMeasuresByZone = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	// define vars
	const zoneId = req.params.id;
	if (!zoneId) {
		createBackLog('/zones/:id/measures', 400, 'WARNING status 400 result ID invalid in getMeasuresByZone', req);
		logger.warn('WARNING status 400 result ID invalid in getMeasuresByZone');
		res.status(400).json({
			message: 'ID del zone es inválido'
		});
		return;
	};
	await Zone.findOne(
		{ id_wiseconn: zoneId },
		{'_id': 1}
	).lean()
	.then(async (zoneData: any) => {
		if (zoneData) {
			// query for get measures
			await Measure.find(
				{ zone: zoneData._id },
				{
					_id: 0,
					id_wiseconn: 1,
					lastData: 1,
					lastDataDate: 1,
					depthUnit: 1,
					sensorDepth: 1,
					sensorType: 1,
					createdAt: 1,
					soilMostureSensorType: 1,
					monitoringTime: 1,
					name: 1,
					unit: 1,
					readily_available_moisture: 1,
					field_capacity: 1,
					zone: 1,
					farm: 1
				}
			).lean()
			.then(async (measureData: any) => {
				if (measureData && measureData.length > 0) {
					await Promise.all(
						measureData.map(async (data: any) => {
							const {
								id_wiseconn,
								lastData,
								lastDataDate,
								depthUnit,
								sensorDepth,
								sensorType,
								createdAt,
								soilMostureSensorType,
								monitoringTime,
								name,
								unit,
								brand,
								farm
							} = data;
							const physical_connection: any = await PhysicalConnection.findOne(
								{measure: data._id},
								{
									_id: 0,
									expansionPort: 1,
									expansionBoard: 1,
									nodePort: 1
								}
							).lean()
							.catch((err: any) => {
								// error
								createBackLog('/zones/:id/measures', 500, err, req);
								logger.error('ERROR in getting PhysicalConnection in getMeasuresByZone ' + err);
							});
				
							const farmId: any = await Farm.findOne({_id: farm},{id_wiseconn: 1, _id: 0}).lean()
							.catch((err: any) => {
								// error
								createBackLog('/zones/:id/measures', 500, err, req);
								logger.error('ERROR in getting Farm in getMeasuresByZone ' + err);
							});
				
							return {
								id: id_wiseconn,
								farmId: farmId ? farmId.id_wiseconn : '',
								zoneId: zoneId,
								name,
								unit,
								lastData,
								lastDataDate,
								monitoringTime,
								sensorDepth,
								depthUnit,
								fieldCapacity: data.field_capacity,
								readilyAvailableMoisture: data.readily_available_moisture,
								sensorType,
								readType: 'direct',
								soilMostureSensorType,
								brand,
								createdAt,
								physicalConnection: physical_connection
							};
				
						})
					).then((resp: any) => {
						createBackLog('/zones/:id/measures', 200, 'INFO status 200 result OK in getMeasuresByZone', req);
						logger.info('INFO status 200 result OK in getMeasuresByZone');
						res.status(200).json(resp)
					})
					.catch((err: any) => {
						// error
						createBackLog('/zones/:id/measures', 500, err, req);
						logger.error('ERROR in getMeasuresByZone ' + err);
						res.status(500).json({error: 500, message: 'Error in API getting data'});
					});
				} else {
					createBackLog('/zones/:id/measures', 200, 'WARNING status 200 result not exist measures in getMeasuresByZone', req);
					logger.warn('WARNING status 200 result not exist measures in getMeasuresByZone');
					res.status(200).json([]);
				}
			})
			.catch((err: any) => {
				// error
				createBackLog('/zones/:id/measures', 500, err, req);
				logger.error('ERROR in getMeasuresByZone ' + err);
				res.status(500).json({error: 500, message: 'Error in API getting data'});
			});
		} else {
			createBackLog('/zones/:id/measures', 200, 'WARNING status 200 result invalid ID or not exist in getMeasuresByZone', req);
			logger.warn('WARNING status 200 result invalid ID or not exist in getMeasuresByZone');
			res.status(200).json({
				message: 'ID del Farm no existe o es inválido'
			});
		}
	})
	.catch((err: any) => {
		// error
		createBackLog('/zones/:id/measures', 500, err, req);
		logger.error('ERROR in getMeasuresByZone ' + err);
		res.status(500).json({error: 500, message: 'Error in API getting data'});
	});
};

