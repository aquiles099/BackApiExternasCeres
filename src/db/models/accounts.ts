import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { String, Number, ObjectId, Boolean, Date } = Schema.Types;

const schema = new Schema(
	{
		name: { type: String, required: false, default: null },
		business: { type: String, required: false, default: null },
		rut: { type: String, required: false, default: null },
		phone: { type: String, required: false, default: null },
		email: { type: String, lowercase: true, required: false, default: null },
		direction_invoice: { type: String, required: false, default: null },
		order: { type: String, required: false, default: null },
		id_wiseconn: { type: String, required: false, unique: true },
		agent: {
			name_agent: { type: String, required: false, default: null },
			rut_agent: { type: String, required: false, default: null },
			phone_agent: { type: String, required: false, default: null },
			required: false,
		},
		active: { type: Boolean, required: false, default: true },
		zone: { type: String, required: false, default: null },
		position: { type: String, required: false, default: null },
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

export default schema;
