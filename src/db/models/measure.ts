import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new Schema(
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
		varDerived: {
			var_data_master: { type: Schema.Types.ObjectId, ref: 'VarDerivateMaster', required: false },
			period: { type: String, required: false },
			date_init: { type: Date, required: false },
			active: { type: Boolean, required: false },
		},
		id_wiseconn: { type: String, required: true, unique: true },
		sensorTypeSector: { type: String, required: false, default: null },
		active: { type: Boolean, required: false, default: true },
		brand: { type: String, required: false, default: null },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

schema.plugin(uniqueValidator, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro measure.' });

export default schema;
