import { Schema } from 'mongoose';

const { String, Date } = Schema.Types;

const schema = new Schema(
	{
		keyAccess: { type: String, required: false },
        dateExpire: { type: Date, required: false },
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

export default schema;