import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new Schema(
	{
		var_data_master: { type: Schema.Types.ObjectId, ref: 'VarDerivateMaster', required: true },
		zone: { type: Schema.Types.ObjectId, ref: 'Farm', required: true },
		farm: { type: Schema.Types.ObjectId, ref: 'Zone', required: true },
		period: { type: String, required: false },
		date_init: { type: Date, required: false },
		status_clone: { type: Boolean, required: false, default: false },
		active: { type: Boolean, required: true },
		saturationZone: { type: String, required: false },
		stressZone: { type: String, required: false },
		id_measure: { type: Schema.Types.ObjectId, ref: 'Measure', required: false  },
		measure: [
			{
				name: { type: String, required: false, default: null },
				unit: { type: String, required: false, default: null },
				lastData: { type: Number, required: false, default: null },
				lastDataDate: { type: Date, required: false, default: null },
				monitoringTime: { type: Number, required: false, default: null },
				sensorDepth: { type: String, required: false, default: null },
				depthUnit: { type: String, required: false, default: null },
				fieldCapacity: { type: Number, required: false, default: null },
				readilyAvailableMoisture: { type: Number, required: false, default: null },
				soilMostureSensorType: { type: String, required: false, default: null },
				sensorType: { type: String, required: false, default: null },
				node: { type: Schema.Types.ObjectId, ref: 'Node', required: false, default: null },
				farm: { type: Schema.Types.ObjectId, ref: 'Farm', required: false, default: null },
				zone: { type: Schema.Types.ObjectId, ref: 'Zone', required: false, default: null },
				id_wiseconn: { type: String, required: false, unique: true },
			}
		],
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

schema.index({ var_data_master: 1, zone: 1, period: 1, date_init: 1, active: 1 }, { unique: true });

schema.plugin(uniqueValidator, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro node.' });

export default schema;
