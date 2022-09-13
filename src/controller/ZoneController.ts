import {
	Zone,
	Measure,
	PhysicalConnection,
	Farm
} from '../db/models';
import { Request, Response, NextFunction } from 'express';

const mongoose = require('mongoose');

// obtain measures for Zone by idwiseconn
export const getMeasuresByZone = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		// define vars
		const zoneId = req.params.id;

		// query
		const zoneData: any = await Zone.findOne({ id_wiseconn: zoneId }, {'_id': 1}).lean();
		if (!zoneData) throw { message: 'El id_wiseconn no existe', error: 400 };

		const ArrayData: any = await Measure.find({ zone: zoneData._id }).lean();

		const resp: Array<any> = ArrayData.filter(async (data: any) => {
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
				brand
			} = data;
			const physical_connection: any = await PhysicalConnection.findOne(
				{measure: data._id},
				{
					_id: 0,
					expansionPort: 1,
					expansionBoard: 1,
					nodePort: 1
				}
			).lean();

			const farmId: any = await Farm.findOne({_id: data.farm},{id_wiseconn: 1, _id: 0}).lean();

			return {
				id: id_wiseconn,
				farmId: farmId.id_wiseconn,
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

		});

		const info = await Promise.all(resp);

		// response
		res.status(200).json(info);
	} catch (err) {
		// response error
		next(err);
	}
};

