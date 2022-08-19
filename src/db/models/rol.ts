import { Schema } from 'mongoose';

const schema = new Schema(
	{
		name: { type: String, required: true },
		descript: { type: String, required: false, default: null },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default schema;
