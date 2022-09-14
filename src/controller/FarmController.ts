import {
	Farm,
	Measure,
	Zone,
	PhysicalConnection
} from '../db/models';
import { Request, Response, NextFunction } from 'express';

const mongoose = require('mongoose');

const options = {
	_id: 1,
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
	_id: 1,
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

// obtain all farms
export const getFarms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		// query
		const farmData: any = await Farm.find(
			{},
			options
		).lean();
		// response
		const resp: any = farmData.filter((data:any) => {
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
		});
		const info: any = await Promise.all(resp);

		// response
		res.status(200).json(info);
	} catch (err) {
		// response error
		next(err);
	}
};

// obtain farm by idwiseconn
export const getFarmById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		// define vars
		const id_wiseconn = req.params.id;

		if (!id_wiseconn) throw { error: 400, message: 'El Id es requerido' };
		// query
		const info: any = await Farm.findOne(
			{ id_wiseconn },
			options
		).lean();

		res.status(200).json({
			id: info.id_wiseconn,
			name: info.name,
			description: info.description,
			latitude: info.latitude,
			longitude: info.longitude,
			postalAddress: info.postalAddress,
			account: info.account,
			timeZone: info.timeZone,
			timeZoneName: info.timeZoneName,
			webhook: info.webhook,
			metadata: info.metadata
		});
	} catch (err) {
		// response error
		next(err);
	}
};


// obtain zones by farm
export const getZonesByIdFarm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		// define vars
		const farmId = req.params.id;
		const farm: any = await Farm.findOne({ id_wiseconn: farmId }, {_id: 1}).lean();

		if (!farm) throw { error: 400, message: 'El farm no existe' };

		// query for get zones
		const zones: any[] = await Zone.find(
			{ farm: farm._id },
			optionsZone
		).lean();

		await Promise.all(
			zones.map(async (data: any) => {
				return {
					id: data.id_wiseconn,
					name: data.name,
					description: data.description,
					latitude: data.latitude,
					longitude: data.longitude,
					type: data.type,
					farm: farmId,
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
		).then((resp: any) => 
			res.status(200).json(resp)
		)
		.catch((err: any) => {
			res.status(400).json({ message: 'Error al obtener la data', error: 400 })
		});

	} catch (err) {
		// response error
		next(err);
	}
};

// obtain measures by farm
export const getMeasuresByFarm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		// define vars
		const idFarm = req.params.id;
		if (!idFarm) throw { message: 'El Id es requerido', error: 400 };

		// query
		const farmData: any = await Farm.findOne({ id_wiseconn: idFarm }, {_id: 1}).lean();
		if (!farmData) throw { message: 'El Id suministrado no existe', error: 400 };

		const ArrayData: any = await Measure.find(
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
		).lean();

		await Promise.all(
			ArrayData.map(async (data: any) => {
				const zoneId: any = await Zone.findOne({_id: data.zone},{id_wiseconn: 1, _id: 0}).lean();
				return {
					id: data.id_wiseconn,
					farmId: idFarm,
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
		).then((resp: any) => 
			res.status(200).json(resp)
		)
		.catch((err: any) => {
			res.status(400).json({ message: 'Error al obtener la data', error: 400 })
		});

	} catch (err) {
		// response error
		next(err);
	}
};
