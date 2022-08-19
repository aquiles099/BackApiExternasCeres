import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const { String, ObjectId } = Schema.Types;

const schema = new Schema(
	{
		api_key: { type: String, required: false, default: null },
		name: { type: String, required: false, default: null },
		password: { type: String, required: false, default: null },
		id_account: { type: String, required: false, default: null },
		id_user: { type: String, required: true },
		api: { type: String, required: false, default: null },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);
schema.plugin(uniqueValidator, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otra cuenta.' });

export default schema;
