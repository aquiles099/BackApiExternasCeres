import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new Schema(
	{
		name: { type: String, required: false },
		lat: { type: Number, required: false },
		lng: { type: Number, required: false },
		node_type: { type: String, required: false },
		id_wiseconn: { type: String, required: false }, //,  max: 1, unique: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);
schema.plugin(uniqueValidator, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro node.' });

export default schema;
