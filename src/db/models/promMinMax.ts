import { Schema } from 'mongoose';

const { ObjectId, String, Number } = Schema.Types;

const schema = new Schema(
	{
		zone: { type: ObjectId, ref: 'Zone', required: true },
		name: { type: String, required: false, default: '' },
		measures: [
			{
				_id: { type: ObjectId, ref: 'Zone', required: true },
				name: { type: String, required: false, default: '' },
				prom: { type: Number, required: true },
				min: { type: Number, required: true },
				max: { type: Number, required: true },
			},
		],

		date: { type: Date, default: Date.now, required: true },
		//date: { type: Date, required: false, default: null },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default schema;
