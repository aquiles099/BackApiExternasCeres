import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { String, Number, ObjectId, Boolean, Date } = Schema.Types;

const schema = new Schema(
	{
		name: { type: String, required: false, default: null },
		description: { type: String, required: false, default: null },
		latitude: { type: Number, required: false, default: null },
		longitude: { type: Number, required: false, default: null },
		kc: { type: String, required: false, default: null },
		theoreticalFlow: { type: Number, required: false, default: null },
		unitTheoreticalFlow: { type: String, required: false, default: null },
		efficiency: { type: String, required: false, default: null },
		humidity_retention: { type: String, required: false, default: null },
		max: { type: Number, required: false, default: null },
		min: { type: Number, required: false, default: null },
		critical_point1: { type: Number, required: false, default: null },
		critical_point2: { type: Number, required: false, default: null },
		crops: { type: String, required: false, default: null },
		metadata: { type: String, required: false, default: null },
		allowPumpSelection: { type: Boolean, required: false, default: true },
		types: [{ type: String, required: false }],
		image_url_irrimax: { type: String, required: false },
		alertas: [
			{
				emails: [{ type: String }],
				out_range: { type: String, enum: ['15 Minutos', '30 Minutos', '45minutos', '1 hora, '] },
				last_mail_send_date: { type: Date, required: false, default: '' },
				enabled: { type: String, enum: ['0', '1'] },
				hour:{ type:String , required: false, default: null},
				min_value: { type: Number, required: false, default: null },
				max_value:{ type: Number, required: false, default: null },
				id_measure: { type: Schema.Types.ObjectId, ref: 'Measure', required: false  },
				required: false,
				main: { type: String, enum: ['0', '1'] },
			},
		],
		polygon: {
			path: [
				{
					lng: { type: Number, required: false },
					lat: { type: Number, required: false },
					required: false,
				},
			],
			bounds: {
				southWest: {
					lng: { type: Number, required: false },
					lat: { type: Number, required: false },
					required: false,
				},
				northEast: {
					lng: { type: Number, required: false },
					lat: { type: Number, required: false },
					required: false,
				},
				required: false,
			},
			placemarkers: [
				{
					description: { type: String, required: false, default: null },
					lng: { type: Number, required: false },
					lat: { type: Number, required: false },
					required: false,
				}
			],
			required: false,
			default: {},
		},
		pump_system: { type: ObjectId, ref: 'PumpSystem', required: false },
		farm: { type: ObjectId, ref: 'Farm', required: false },
		id_wiseconn: { type: String, required: false, unique: true },
		plantation_select_year: { type: String, required: false, default: null },
		variety: { type: String, required: false, default: null },
		species: { type: String, required: false, default: null },
		surface: { type: String, required: false, default: null },
		emitter_flow: { type: String, required: false, default: null },
		distance_between_emitters: { type: String, required: false, default: null },
		plantation_frame: { type: String, required: false, default: null },
		probe_type: { type: String, required: false, default: null },
		graph_url: { type: String, required: false, default: null },
		graph1_url: { type: String, required: false, default: null },
		graph2_url: { type: String, required: false, default: null },

		title_second_graph: { type: String, required: false, default: null },
		installation_date: { type: String, required: false, default: null },
		number_roots: { type: String, required: false, default: null },
		plant: { type: String, required: false, default: null },
		probe_plant_distance: { type: String, required: false, default: null },
		sprinkler_probe_distance: { type: String, required: false, default: null },
		installation_type: { type: String, required: false, default: null },
		origen_instalation: { type: String, required: false, default: null },
		initTime_instalation: { type: String, required: false, default: null },
		endTime_instalation: { type: String, required: false, default: null },
		progresssoil_type: { type: String, required: false, default: null },
		weather: { type: String, required: false, default: null },
		soil_type: { type: String, required: false, default: null },
		type_irrigation: { type: String, required: false, default: null },
		imgs: [{ type: String, required: false }],

		// atributo graficos
		graph: [
			{
				// titulo de la grafica
				title: { type: String, required: false, default: 'graph' },

				// descriccion de la grafica
				description: { type: String, required: false, default: 'graph' },

				// stad de activacion de la grafica
				active: { type: Boolean, required: false, default: true },

				// measures de dicha grafica
				measure_graphs: [
					{
						// tipo de medidor
						graph_type: { type: String, required: false, default: 'line' },

						// id del measure
						id_measure: { type: ObjectId, ref: 'Measure', required: false, default: null },
					},
				],
				escale_graphs: [
					{				
						title: { type: String, required: false, default: null },
						// id del measure
						measure: [{ 
									id_measure: { type: ObjectId, ref: 'Measure', required: false, default: null },
									name: { type: String, required: false, default: null },
									color: { type: String, required: false, default: null },
								}],
					},
				],

				required: false,
			},
		],

		calicatas: [
			{
				date: { type: Date, required: false },
				comments: { type: String, required: false },
				raices: { type: String, required: false },
				raicesLateral: { type: String, required: false },
				posicion: { type: String, required: false },
				clase: { type: String, required: false },
				url_imagen: { type: String, required: false },
				event_time: { type: String, required: false },
				required: false,
			},
		],
		mensajes: [
			{
				date: { type: Date, required: false },
				comments: { type: String, required: false },
				correo: { type: String, required: false },
				url_imagen: { type: String, required: false },
				event_date: { type: String, required: false },
				event_time: { type: String, required: false },
				required: false,
			},
		],

		active: { type: Boolean, required: false, default: true },

		pp_equipo: { type: Number, required: false, default: null },

		variedades: { type: String, required: false, default: null },

		cultivo: { type: String, required: false, default: null },

		pdf_informe_riego: [
			{
				date_create: { type: Date, required: false },
				link: { type: String, required: false },
				path: { type: String, required: false },
				initTime: { type: Date, required: false },
				endTime: { type: Date, required: false },
				name: { type: String, required: false },
				required: false,
			},
		],
		duty_manager_probe: { type: String, required: false, default: null },
		enabled: { type: Boolean, required: false, default: true },
		comments: [
			{
				date: { type: Date, required: false },
				comment: { type: String, required: false },
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
