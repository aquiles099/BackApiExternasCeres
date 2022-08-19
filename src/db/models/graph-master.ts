import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new Schema(
	{
		title: { type: String, required: true },
		descript: { type: String, required: true },
		active: { type: Boolean, required: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

schema.plugin(uniqueValidator, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro measure data.' });

export default schema;
