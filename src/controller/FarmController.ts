import {
	Farm,
	Measure,
	Zone,
	PhysicalConnection
} from '../db/models';
import * as intf from '../db/interfaces';
import * as Msg from '../hooks/messages';
import { Request, Response, NextFunction } from 'express';

const options = {
	_id: 0,
	id: 1,
	name: 1,
	description: 1,
	latitude: 1,
	longitude: 1,
	id_wiseconn: 1,
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
	id: 1,
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
		path: 1,
		bounds: 1
	}
};

// obtain all farms
export const getFarms = async (req: Request<intf.params>, res: Response, next: NextFunction): Promise<void> => {
	try {
		// query
		const info: intf.Farm[] = await Farm.find(
			{},
			options
		).lean();
		// response
		res.status(200).json({ status: true, message: Msg.Farm().getAll, data: info });
	} catch (err) {
		// response error
		next(err);
	}
};

// obtain farm by idwiseconn
export const getFarmById = async (req: Request<intf.params>, res: Response, next: NextFunction): Promise<void> => {
	try {
		// define vars
		const id_wiseconn = req.params.id;
		// query
		const info: any = await Farm.findOne(
			{ id_wiseconn },
			options
		);
		// response
		res.status(200).json({ status: true, message: Msg.Farm(id_wiseconn).get, data: info });
	} catch (err) {
		// response error
		next(err);
	}
};


// obtain zones by farm
export const getZonesByIdFarm = async (req: Request<intf.params>, res: Response, next: NextFunction): Promise<void> => {
	try {
		// define vars
		const id_wiseconn = req.params.id;
		const farm = await Farm.findOne({ id_wiseconn });

		if (!farm) throw { code: 400, message: 'el farm no existe' };
		const { _id }: any = farm;

		// query for get zones
		const zones: any[] = await Zone.find(
			{ farm: _id },
			optionsZone
		).lean();

		res.status(200).json({ message: Msg.Zone(id_wiseconn, 'farm').getBy, data: zones });
	} catch (err) {
		// response error
		next(err);
	}
};

// obtain measures by farm
export const getMeasuresByFarm = async (req: Request<intf.params>, res: Response, next: NextFunction): Promise<void> => {
	try {
		// define vars
		const id_wiseconn = req.params.id;
		if (!id_wiseconn) throw { message: 'el id es requerido', code: 400 };

		// query
		const farmData = await Farm.findOne({ id_wiseconn }, '_id');
		if (!farmData) throw { message: 'el id suministrado noexiste en la db', code: 400 };

		const ArrayData = await Measure.find({ farm: farmData._id });

		const resp: Array<any> = ArrayData.map(async (data: any, i: number) => {
			const {
				node,
				lastData,
				lastDataDate,
				depthUnit,
				sensorDepth,
				sensorType,
				createdAt,
				soilMostureSensorType,
				monitoringTime,
				zone,
				name,
				unit,
			} = data;
			const physical_connection = await PhysicalConnection.findById(data.physical_connection);

			const obj = {
				id: data.id_wiseconn,
				farmId: id_wiseconn,
				zoneId: zone,
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
				nodeId: node,
				readType: '', // No existe en la DB
				soilMostureSensorType,
				createdAt,
				physicalConnection: physical_connection,
			};

			return obj;
		});

		const info = await Promise.all(resp);

		// response
		res.status(200).json({ status: true, message: Msg.Farm(id_wiseconn, 'Measures').getBy, data: info });
	} catch (err) {
		// console view errr
		// response error
		next(err);
	}
};

