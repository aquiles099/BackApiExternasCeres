import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const { ObjectId } = Schema.Types;
const schema = new Schema(
	{
		title: { type: String, required: true },
		descript: { type: String, required: true },
		active: { type: Boolean, required: true },
		GraphMaster: { type: ObjectId, ref: 'GraficaMaestra', required: true },
		zone: { type: ObjectId, ref: 'Zone', required: true },
		measure: [
			{
				id: { type: ObjectId, ref: 'Zone', required: true },
				type: { type: String, required: true },
			},
		],
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

schema.plugin(uniqueValidator, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro measure data.' });

export default schema;
