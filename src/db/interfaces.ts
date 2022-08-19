export interface db {
	_id?: string;
	createdAt?: string | Date;
	updatedAt?: string | Date;
}

export interface api_resp {
	status: boolean;
	message: string;
	data?: any | any[];
}

export interface params {
	id?: string | number;
	id_zone?: string | number;
	id0?: string | number;
	id1?: string | number;
	types?: string | any;
	imgName?: string | any;
}

export interface DateRangE {
	$gte?: string | Date;
	$gt?: string | Date;
	$lt?: string | Date;
}

export interface DateRang {
	$gt: string | Date;
	$lt?: string | Date;
}

export interface GetIrrimax {
	data: string;
	_id: string;
}

export interface Alerta extends db {
	emails: string;
	out_range: string;
	last_mail_send_date?: Date;
	min_value: string;
	max_value: string;
	hour: string;
	enabled: string;
	main: string;
	id_measure: string;
}

export interface VarDerivateMaster extends db {
	name: string;
	description: string;
	formula: string;
}
//
export interface MeasureVarDer extends db {
	zone: string;
	varDerived: VarDerivateSector;
	id_wiseconn?: String;
}
//
export interface VarDerivateSector extends db {
	var_data_master: string;
	zone: string;
	period: String;
	date_init: Date;
	active: Boolean;
	status_clone: Boolean;
	measure: Measure;
}
//
export interface VarDerivateSectorUpdate extends db {
	var_data_master?: string;
	zone?: string;
	period?: String;
	date_init?: Date;
	active?: Boolean;
}
//
export interface Zone extends db {
	pdf_informe_riego?: { date_create?: Date; path?: String; initTime?: Date; endTime?: Date }[];
	pp_equipo?: number;
	path?: any[];
	name?: string;
	description?: string;
	latitude?: string;
	longitude?: string;
	kc?: string;
	theoreticalFlow?: number;
	unitTheoreticalFlow?: string;
	efficiency?: string;
	humidity_retention?: string;
	max?: number;
	min?: number;
	critical_point1?: string;
	critical_point2?: string;
	crops?: string;
	metadata?: string;
	allowPumpSelection?: string;
	types?: string[];
	polygon?: {
		path?: Array<{
			lng: number;
			lat: number;
		}>;
		bounds?: {
			southWest?: {
				lng: number;
				lat: number;
			};
			northEast?: {
				lng: number;
				lat: number;
			};
		};
		placemarkers: Array<{
			description: { type: String, required: false, default: null },
			lng: { type: Number, required: false },
			lat: { type: Number, required: false },
			required: false,
		}>;
	};
	pump_system?: string;
	farm?: string;
	id_wiseconn?: string;
	plantation_select_year?: String;
	variety?: String;
	species?: String;
	surface: string;
	emitter_flow: string;
	distance_between_emitters: string;
	plantation_frame: string;
	probe_type: string;
	graph1_url?: String;
	graph2_url?: String;
	title_second_graph?: String;
	installation_date?: String;
	number_roots?: String;
	plant?: String;
	probe_plant_distance?: String;
	sprinkler_probe_distance?: String;
	installation_typeorigen_instalation?: String;
	initTime_instalation?: String;
	endTime_instalation?: String;
	progresssoil_type?: String;
	imgs?: string[];
	alertas: Alerta[];
	active?: boolean;
	image_url_irrimax?: string;
	type_probe: string;
	duty_manager_probe: string;
	enabled: boolean;
	comments: Comments[];
}
//
export interface Farm extends db {
	name?: string;
	description?: string;
	latitude?: number;
	longitude?: number;
	postal_address?: string;
	webhook?: string;
	active_cloning?: boolean;
	total_area?: string;
	amount_equipment_irrigation?: string;
	number_sectors_irrigation?: string;
	quantity_wells?: string;
	start_installation?: string;
	end_installation?: string;
	time_zone?: string;
	time_zone_name?: string;
	account?: object;
	id_wiseconn?: string;
	id_account?: string;
	amount_equipment?: string;
	number_sectors?: string;
	specimen?: string;
	surface?: string;
	cadeter_equipment?: string;
	monitoring_equipment?: string;
	equipment_control?: string;
	line_flow?: string;
	sensor_t_hr?: string;
	ema?: string;
	soil_moisture_sensore?: string;
	administrator?: object;
	consultant?: object;
	zone?: string;
	position?: string;
	id_user?: any;
}
//
export interface Measure extends db {
	name?: String;
	unit?: String;
	lastData?: Number;
	lastDataDate?: Date;
	monitoringTime?: Number;
	sensorDepth?: String;
	depthUnit?: String;
	fieldCapacity?: Number;
	readilyAvailableMoisture?: Number;
	soilMostureSensorType?: String;
	sensorType?: String;
	node?: String;
	farm?: String;
	zone?: String;
	id_wiseconn?: String;
	varDerived?: VarDerivateSector;
}
//
export interface GraphMaster extends db {
	title: string;
	descript: string;
	active: boolean;
}
//
export interface GraphZone extends db {
	title: string;
	descript: string;
	active: boolean;
	id_graficas_maestra: string;
	id_zone: string;
	measure: Array<{ id_measure: string; type: string }>;
}
//
export interface MeasureData extends db {
	id_wiseconn: string;
	time: string | Date;
	value: number;
}
//
export interface User extends db {
	name?: string;
	last_name?: string;
	business?: string;
	office?: string;
	password: string;
	email: string;
	email_verified_at?: boolean;
	region?: string;
	city?: string;
	phone?: string;
	id_role: { id: number; name: string };
	active?: boolean;
	farms?: any;
	rol?: any;
	changePassword?: boolean;
}
//
export interface TimeQuery {
	initTime?: string | number | Date;
	endTime?: string | number | Date;
}
//
export interface Rol extends db {
	name: string;
	descript?: string;
}
//
export interface AccountSettings extends db {
	api_key: string;
	name: string;
	password: string;
	id_account: string;
	account?: any;
	id_user: string;
	api: string;
}

export interface Accounts extends db {
	name?: string;
	business?: string;
	rut?: string;
	phone?: string;
	email?: string;
	direction_invoice?: string;
	order?: string;
	id_wiseconn?: string;
	agent?: object;
}

export interface CloneProcessStatus extends db {
	_id?: string;
	id_type?: number;
	type?: string;
	status?: boolean;
	log: {
		id?: string;
		id_wiseconn?: number;
		name?: string;
		process: Array<{
				id?: string;
				id_wiseconn?: number;
				name?: string;
				processData?: boolean;
				status?: boolean;
				lastDataDate?: Date;
			}>;
		measureNotZone: Array<{
			id?: string;
			id_wiseconn?: number;
			name?: string;
			zone?: string;
			farm?: string;
			lastDataDate?: Date;
			}>;
	};
}

export interface Comments extends db {
	date: Date;
	comment: string;
}

export interface StatesZonesFarms extends db {
	farm: {
		id?: string;
		id_wiseconn?: string;
		name?: string;
		account: {
			id?: string;
			name?: string;
		};
		correo: {
			correo?: string;
			nombre?: string;
		};
	};
	zones: Array<
		{
			id?: string;
			id_wiseconn?: string;
			name?: string;
			probe_type?: string;
			duty_manager_probe?: string;
			types?: string[];
			enabled?: boolean;
			state?: number;
			stateZone?: string;
			lastState?: number;
			lastStateZone?: string;
			comments: {
				date?: Date;
				comment?: string;
			};
			lastUpdate?: Date;
			measures?: Array<
				{
					id?: string;
					id_wiseconn?: string;
					name?: string;
					state?: number;
					stateZone?: string;
					lastState?: number;
					lastStateZone?: string;
					lastUpdateData?: Date;
					comments: {
						date?: Date;
						comment?: string;
					};
				}
			>,
		}
	>;
	active?: boolean;
}