import {
	Zone,
	Measure,
	PhysicalConnection,
} from '../db/models';
import * as intf from '../db/interfaces';
import * as Msg from '../hooks/messages';
import { Request, Response, NextFunction } from 'express';

// obtain measures for Zone by idwiseconn
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
				brand
			} = data;
			const physical_connection = await PhysicalConnection.findById(
				data.physical_connection,
				{
					_id: 0,
					expansionPort: 1,
					expansionBoard: 1,
					nodePort: 1
				}
			);

			const obj: any = {
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
				readType: 'direct',
				soilMostureSensorType,
				brand,
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
