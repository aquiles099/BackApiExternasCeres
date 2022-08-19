import {
	Zone,
	Measure,
	PhysicalConnection,
} from '../db/models';
import * as intf from '../db/interfaces';
import * as Msg from '../hooks/messages';
import { Request, Response, NextFunction } from 'express';

// this function is for get a Zone for ID
export const getZoneByIdWise = async (req: Request<intf.params>, res: Response, next: NextFunction): Promise<void> => {
	try {
		// define vars
		const id_wiseconn = req.params.id;
		if (!id_wiseconn) throw { message: 'el id es requerido', code: 400 };

		// query
		const zone: any = await Zone.findOne({ id_wiseconn });
		const measures: intf.Measure[] = await Measure.find({ zone: zone._id });
		// response
		const dataZone = zone._doc;
		res.status(200).json({
			status: true,
			message: Msg.Zone(id_wiseconn).get,
			data: { ...zone._doc, measures, graphEscaleSensor: dataZone.graph },
		});
	} catch (err) {
		// response error
		next(err);
	}
};

// this function is for get a Zone for ID
export const getZoneById = async (req: Request<intf.params>, res: Response, next: NextFunction): Promise<void> => {
	try {
		// define vars
		const id = req.params.id;
		if (!id) throw { message: 'el id es requerido', code: 400 };

		// query
		const zone: any = await Zone.findById({ '_id': id });
		// response
		const dataZone = zone._doc;
		res.status(200).json({
			status: true,
			message: Msg.Zone(id).get,
			data: { ...zone._doc },
		});
	} catch (err) {
		// response error
		next(err);
	}
};



// this function is for get a Zone for ID
export const getAllZone = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		// query
		const info: any = await Zone.find();
		// response
		res.status(200).json({ status: true, message: Msg.Zone().getAll, data: info });
	} catch (err) {
		// response error
		next(err);
	}
};

// getter measures for Zone
export const getMeasuresByZone = async (
	req: Request<intf.params>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		// define vars
		const id = req.params.id;

		// query
		const zoneData = await Zone.findOne({ 'id_wiseconn': id }, {'_id': 1, 'id_wiseconn': 1});
		if (!zoneData) throw { message: 'El id suministrado no existe en la DB', code: 400 };

		const ArrayData = await Measure.find({ zone: zoneData._id });

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
				farm,
				name,
				unit,
			} = data;
			const physical_connection = await PhysicalConnection.findById(data.physical_connection);

			const obj: any = {
				_id: data._id,
				id: data.id_wiseconn,
				farmId: farm,
				zoneId: zoneData._id,
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
		res.status(200).json({
			status: true,
			message: Msg.Farm(zoneData._id, 'Measures').getBy,
			data: info,
		});
	} catch (err) {
		// console view errr
		console.log('error');
		// response error
		next(err);
	}
};

// getter measures for Zone by id
export const getMeasuresByZoneById = async (
	req: Request<intf.params>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		// define vars
		const id = req.params.id;

		// query
		const zoneData = await Zone.findOne({ '_id': id }, {'_id': 1, 'id_wiseconn': 1});
		if (!zoneData) throw { message: 'El id suministrado no existe en la DB', code: 400 };

		const ArrayData = await Measure.find({ zone: zoneData._id });

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
				farm,
				name,
				unit,
			} = data;
			const physical_connection = await PhysicalConnection.findById(data.physical_connection);

			const obj: any = {
				_id: data._id,
				id: data.id_wiseconn,
				farmId: farm,
				zoneId: zoneData._id,
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
		res.status(200).json({
			status: true,
			message: Msg.Farm(zoneData._id, 'Measures').getBy,
			data: info,
		});
	} catch (err) {
		// console view errr
		console.log('error');
		// response error
		next(err);
	}
};
