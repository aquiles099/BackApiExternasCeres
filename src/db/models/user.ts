import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const { ObjectId, String, Boolean } = Schema.Types;

const schema = new Schema(
	{
		name: { type: String, required: true },
		last_name: { type: String, required: true },
		business: { type: String, required: true },
		office: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, unique: true, lowercase: true, required: true },
		region: { type: String, required: true },
		city: { type: String, required: true },
		phone: { type: String, required: true },
		id_role: { type: ObjectId, ref: 'Rol', required: true },
		active: { type: Boolean, required: false, default: false },
		// new_msj_notification: { type: String, required: false },
		// new_alert_notification: { type: String, required: false },
		// new_zone_notification: { type: String, required: false },
		// remember_token: { type: String, required: false },
		farms: [{ _id: { type: ObjectId, ref: 'Farm', required: false } }],
	},
	{
		versionKey: false,
		timestamps: true,
	}
);
schema.plugin(uniqueValidator, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro node.' });

export default schema;
