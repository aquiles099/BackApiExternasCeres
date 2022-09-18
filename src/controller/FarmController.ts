import {
	Farm,
	Measure,
	Zone
} from '../db/models';
import { Request, Response, NextFunction } from 'express';

import logger from '../logger.js';

const options = {
	_id: 0,
	id_wiseconn: 1,
	name: 1,
	description: 1,
	latitude: 1,
	longitude: 1,
	postalAddress: 1,
	account: {
		id: 1,
		name: 1
	},
	timeZone: 1,
	timeZoneName: 1,
	webhook: 1,
	metadata: 1
};

const optionsZone = {
	_id: 0,
	id_wiseconn: 1,
	name: 1,
	description: 1,
	latitude: 1,
	longitude: 1,
	type: 1,
	farm: 1,
	pump_system: 1,
	kc: 1,
	theoreticalFlow: 1,
	unitTheoreticalFlow: 1,
	efficiency: 1,	
	humidity_retention: 1,
	max: 1,
	min: 1,
	critical_point1: 1,
	critical_point2: 1,
	BFPressureId: 1,
	AFPressureId: 1,
	onlyMonitoring: 1,
	area: 1,
	areaUnit: 1,
	metadata: 1,
	allowPumpSelection: 1,
	predefinedPumps: 1,
	polygon: {
		path: {
			lat: 1,
			lng: 1
		},
		bounds: 1
	}
};

// getting all farms
export const getFarms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	// query
	await Farm.find(
		{
			active_cloning: true,
			active: true
		},
		options
	).lean()
	.then(async (farmData: any) => {
		if (farmData && farmData.length > 0) {
			await Promise.all(
				farmData.map((data:any) => {
					return {
						id: data.id_wiseconn,
						name: data.name,
						description: data.description,
						latitude: data.latitude,
						longitude: data.longitude,
						postalAddress: data.postalAddress,
						account: data.account,
						timeZone: data.timeZone,
						timeZoneName: data.timeZoneName,
						webhook: data.webhook,
						metadata: data.metadata
					}
				})
			)
			.then((resp: any) => {
				logger.info('INFO status 200 result OK in getFarms');
				res.status(200).json(resp);
			})
			.catch((err: any) => {
				// error
				logger.error('ERROR in getFarms ' + err);
				res.status(500).json({error: 500, message: 'Error in API getting data'});
			});
		} else {
			logger.warn('WARNING status 200 result no data in getFarms');
			res.status(200).json([]);
		}

	})
	.catch((err: any) => {
		// error
		logger.error('ERROR in getFarms ' + err);
		res.status(500).json({error: 500, message: 'Error in API getting data'});
	});
};

// getting farm by idwiseconn
export const getFarmById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	// define vars
	const id_wiseconn = req.params.id;

	if (!id_wiseconn) {
		logger.warn('WARNING status 400 result ID invalid in getFarmById');
		res.status(400).json({
			message: 'ID del Farm es inválido'
		});
		return;
	};
	// query
	await Farm.findOne(
		{
			id_wiseconn,
			active_cloning: true,
			active: true
		},
		options
	
	).lean()
	.then(async (farmData: any) => {
		if (farmData) {
			logger.info('INFO status 200 result OK in getFarmById');
			res.status(200).json({
				id: farmData.id_wiseconn,
				name: farmData.name,
				description: farmData.description,
				latitude: farmData.latitude,
				longitude: farmData.longitude,
				postalAddress: farmData.postalAddress,
				account: farmData.account,
				timeZone: farmData.timeZone,
				timeZoneName: farmData.timeZoneName,
				webhook: farmData.webhook,
				metadata: farmData.metadata
			});
		} else {
			logger.warn('WARNING status 200 result no data in getFarmById');
			res.status(200).json({
				message: 'ID del Farm no existe o es inválido'
			});
		}

	})
	.catch((err: any) => {
		// error
		logger.error('ERROR in getFarmById ' + err);
		res.status(500).json({error: 500, message: 'Error in API getting data'});
	});
};


// getting zones by farm
export const getZonesByIdFarm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	// define vars
	const farmId = req.params.id;
	if (!farmId) {
		logger.warn('WARNING status 400 result ID invalid in getZonesByIdFarm');
		res.status(400).json({
			message: 'ID del Farm es inválido'
		});
		return;
	};
	await Farm.findOne(
		{
			id_wiseconn: farmId,
			active_cloning: true,
			active: true
		},
		{_id: 1}
	).lean()
	.then(async (farmData: any) => {
		if (farmData) {
			// query for get zones
			await Zone.find(
				{ farm: farmData._id },
				optionsZone
			).lean()
			.then(async (zonesData: any) => {
				if (zonesData && zonesData.length > 0) {
					await Promise.all(
						zonesData.map((data: any) => {
							return {
								id: data.id_wiseconn,
								name: data.name,
								description: data.description,
								latitude: data.latitude,
								longitude: data.longitude,
								type: data.type,
								farmId,
								pump_system: data.pump_system,
								kc: data.kc,
								theoreticalFlow: data.theoreticalFlow,
								unitTheoreticalFlow: data.unitTheoreticalFlow,
								efficiency: data.efficiency,	
								humidity_retention: data.humidity_retention,
								max: data.max,
								min: data.min,
								critical_point1: data.critical_point1,
								critical_point2: data.critical_point2,
								BFPressureId: data.BFPressureId,
								AFPressureId: data.AFPressureId,
								onlyMonitoring: data.onlyMonitoring,
								area: data.area,
								areaUnit: data.areaUnit,
								metadata: data.metadata,
								allowPumpSelection: data.allowPumpSelection,
								predefinedPumps: data.predefinedPumps,
								polygon: data.polygon
							}
						})
					).then((resp: any) => {
						logger.info('INFO status 200 result OK in getZonesByIdFarm');
						res.status(200).json(resp)
					})
					.catch((err: any) => {
						// error
						logger.error('ERROR in getZonesByIdFarm ' + err);
						res.status(500).json({error: 500, message: 'Error in API getting data'});
					});
				} else {
					logger.warn('WARNING status 200 result not exist zones in getZonesByIdFarm');
					res.status(200).json([]);
				}
			})
			.catch((err: any) => {
				// error
				logger.error('ERROR in getZonesByIdFarm ' + err);
				res.status(500).json({error: 500, message: 'Error in API getting data'});
			});
		} else {
			logger.warn('WARNING status 200 result invalid ID or not exist in getZonesByIdFarm');
			res.status(200).json({
				message: 'ID del Farm no existe o es inválido'
			});
		}
	})
	.catch((err: any) => {
		// error
		logger.error('ERROR in getZonesByIdFarm ' + err);
		res.status(500).json({error: 500, message: 'Error in API getting data'});
	});

};

// getting measures by farm
export const getMeasuresByFarm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	// define vars
	const farmId = req.params.id;
	if (!farmId) {
		logger.warn('WARNING status 400 result ID invalid in getMeasuresByFarm');
		res.status(400).json({
			message: 'ID del Farm es inválido'
		});
		return;
	};
	await Farm.findOne(
		{
			id_wiseconn: farmId,
			active_cloning: true,
			active: true
		},
		{_id: 1}
	).lean()
	.then(async (farmData: any) => {
		if (farmData) {
			// query for get measures
			await Measure.find(
				{ farm: farmData._id },
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
					zone: 1
				}
			).lean()
			.then(async (measureData: any) => {
				if (measureData && measureData.length > 0) {
					await Promise.all(
						measureData.map(async (data: any) => {
							const zoneId: any = await Zone.findOne({_id: data.zone},{id_wiseconn: 1, _id: 0})
							.lean()
							.catch((err: any) => {
								// error
								logger.error('ERROR in getting zone in getMeasuresByFarm ' + err);
							});
							return {
								id: data.id_wiseconn,
								farmId,
								zoneId: zoneId ? zoneId.id_wiseconn : '',
								name: data.name,
								unit: data.unit || '',
								lastData: data.lastData || '',
								lastDataDate: data.lastDataDate || '',
								monitoringTime: data.monitoringTime || '',
								sensorDepth: data.sensorDepth || '',
								depthUnit: data.depthUnit || '',
								fieldCapacity: data.field_capacity || '',
								readilyAvailableMoisture: data.readily_available_moisture || '',
								sensorType: data.sensorType || '',
								readType: '',
								soilMostureSensorType: data.soilMostureSensorType || '',
								createdAt: data.createdAt
							};
						})
					).then((resp: any) => {
						logger.info('INFO status 200 result OK in getMeasuresByFarm');
						res.status(200).json(resp)
					})
					.catch((err: any) => {
						// error
						logger.error('ERROR in getMeasuresByFarm ' + err);
						res.status(500).json({error: 500, message: 'Error in API getting data'});
					});
				} else {
					logger.warn('WARNING status 200 result not exist measures in getMeasuresByFarm');
					res.status(200).json([]);
				}
			})
			.catch((err: any) => {
				// error
				logger.error('ERROR in getMeasuresByFarm ' + err);
				res.status(500).json({error: 500, message: 'Error in API getting data'});
			});
		} else {
			logger.warn('WARNING status 200 result invalid ID or not exist in getMeasuresByFarm');
			res.status(200).json({
				message: 'ID del Farm no existe o es inválido'
			});
		}
	})
	.catch((err: any) => {
		// error
		logger.error('ERROR in getMeasuresByFarm ' + err);
		res.status(500).json({error: 500, message: 'Error in API getting data'});
	});

};
