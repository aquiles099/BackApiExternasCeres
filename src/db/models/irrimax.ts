import { Schema } from 'mongoose';

const { String, ObjectId, Date } = Schema.Types;

const schema = new Schema(
	{
		pond: { type: String, require: false },
		currentStateHumidity: { type: String, require: false },
		saturationZone: { type: String, require: false },
		stressZone: { type: String, require: false },
		fecha: { type: Date, require: false },
		zone: { type: ObjectId, ref: 'Zone', required: false },
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

export default schema;
