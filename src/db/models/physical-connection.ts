import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new Schema(
	{
		expansionPort: { type: Number, required: false },
		expansionBoard: { type: String, required: false },
		nodePort: { type: Number, required: false },
		measure: {
			type: Schema.Types.ObjectId,
			ref: 'Measure',
			required: false,
		},
		id_wiseconn: { type: String, required: true }, //,  max: 1, unique: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);
schema.plugin(uniqueValidator, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro PhysicalConnection.' });

export default schema;
