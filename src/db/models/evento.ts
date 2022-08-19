import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { String, Number, ObjectId, Boolean, Date } = Schema.Types;

const schema = new Schema(
	{
		date: { type: Date, required: false },
		comments: { type: String, required: false },
		tipo: { type: String, required: false },
		raices: { type: String, required: false },
		raicesLateral: { type: String, required: false },
		posicion: { type: String, required: false },
		clase: { type: String, required: false },
		url_imagen: { type: String, required: false },
		event_time: { type: String, required: false },
		correo: { type: String, required: false },
		event_date: { type: String, required: false },
		zone: { type: ObjectId, ref: 'Zone', required: false },
		user: { type: ObjectId, ref: 'User', required: false },
		coments: [
			{
				name: { type: String, required: false  },
				last_name: { type: String, required: false  },
				content: { type: String, required: false  },
				date: { type: Date, required: false },
				user: { type: ObjectId, ref: 'User', required: false },
				required: false,
			},
		],
	},
	{
		versionKey: false,
		timestamps: true,    
	},
);

export default schema;
