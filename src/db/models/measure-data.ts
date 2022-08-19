import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new Schema(
	{
		value: { type: Number, required: false, default: null },
		time: { type: Date, required: false, default: null },
		id_wiseconn: { type: String, required: false },
		measure: { type: Schema.Types.ObjectId, ref: 'Measure' },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

schema.index({ id_wiseconn: 1, time: -1, value: -1 }, { unique: true });

schema.plugin(uniqueValidator, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro measure data.' });

export default schema;
