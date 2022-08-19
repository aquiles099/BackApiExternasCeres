import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		formula: { type: String, required: true },
		active: { type: Boolean, required: true, default: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

schema.index({ name: 1, description: 1, formula: 1 }, { unique: true });

schema.plugin(uniqueValidator, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro node.' });

export default schema;
