import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const { ObjectId, String, Boolean, Number } = Schema.Types;

const schema = new Schema(
	{
		id: { type: String, required: false, default: null },
		name: { type: String, required: false, default: null },
		description: { type: String, required: false, default: null },
		latitude: { type: Number, required: false, default: null },
		longitude: { type: Number, required: false, default: null },
		postalAddress: { type: String, required: false, default: null },
		timeZone: { type: String, required: false, default: null },
		timeZoneName: { type: String, required: false, default: null },
		id_wiseconn: { type: String, required: true, index: { unique: true } },
		webhook: { type: String, required: false },
		active_cloning: { type: Boolean, required: false, default: true },
		total_area: { type: String, required: false },
		amount_equipment_irrigation: { type: String, required: false },
		number_sectors_irrigation: { type: String, required: false },
		quantity_wells: { type: String, required: false },
		start_installation: { type: String, required: false },
		end_installation: { type: String, required: false },
		account: {
			id: { type: String, required: false, default: null },
			name: { type: String, required: false, default: null },
			active: { type: Boolean, required: false, default: true },
			emails: [{ type: String }],
		},
		correos: [
			{
				
				correo: { type: String, required: false },
				nombre: { type: String, required: false },
				telefono: { type: Number, required: false },
				required: false,
			},
		],
		active: { type: Boolean, required: false, default: true },
		id_account: { type: String, required: false, index: { unique: true }, default: null },
		amount_equipment: { type: String, required: false, default: null },
		number_sectors: { type: String, required: false, default: null },
		specimen: { type: String, required: false, default: null },
		surface: { type: String, required: false, default: null },
		cadeter_equipment: { type: String, required: false, default: null },
		monitoring_equipment: { type: String, required: false, default: null },
		equipment_control: { type: String, required: false, default: null },
		line_flow: { type: String, required: false, default: null },
		sensor_t_hr: { type: String, required: false, default: null },
		ema: { type: String, required: false, default: null },
		soil_moisture_sensore: { type: String, required: false, default: null },
		administrator: {
			name: { type: String, required: false, default: null },
			rut: { type: String, required: false, default: null },
			phone: { type: String, required: false, default: null },
			required: false,
		},
		consultant: {
			name: { type: String, required: false, default: null },
			rut: { type: String, required: false, default: null },
			phone: { type: String, required: false, default: null },
			required: false,
		},
		zone: { type: String, required: false, default: null },
		position: { type: String, required: false, default: null },
		id_user: { type: ObjectId, ref: 'User', required: false, default: null },
		metadata: { type: String, required: false, default: null },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);
schema.plugin(uniqueValidator, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro campo.' });

export default schema;
