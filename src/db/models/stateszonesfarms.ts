import { Schema } from 'mongoose';

const { String, Number, ObjectId, Boolean, Date } = Schema.Types;

const schema = new Schema(
	{
		farm: {
            id: { type: ObjectId, ref: 'Farm', required: false },
		    id_wiseconn: { type: String, required: false },
            name: { type: String, required: false, default: null },
            account: {
                id: { type: String, required: false, default: null },
                name: { type: String, required: false, default: null },
                required: false
            },
            correo: {
                correo: { type: String, required: false, default: null },
                nombre: { type: String, required: false, default: null },
                required: false
            },
            stateFarmProcess: { type: Boolean, required: false, default: false },
            required: false
        },
        zones: [
            {
                id: { type: ObjectId, ref: 'Zone', required: false },
                id_wiseconn: { type: String, required: false },
                name: { type: String, required: false, default: null },
                probe_type: { type: String, required: false, default: null },
                duty_manager_probe: { type: String, required: false, default: null },
                enabled: { type: Boolean, required: false, default: true },
                state: { type: Number, required: false, default: null },
                stateZone: { type: String, required: false, default: null },
                lastState: { type: Number, required: false, default: null },
                lastStateZone: { type: String, required: false, default: null },
                types: [{ type: String, required: false }],
                comments: {
                    date: { type: Date, required: false, default: null },
                    comment: { type: String, required: false, default: null},
                    required: false,
                },
                lastUpdate: { type: Date, required: false, default: null },
                measures: [
                    {
                        id: { type: Schema.Types.ObjectId, ref: 'Measure', required: false },
                        id_wiseconn: { type: String, required: false },
                        name: { type: String, required: false, default: null },
                        state: { type: Number, required: false, default: null },
                        stateMeasure: { type: String, required: false, default: null },
                        avgDays: { type: Number, required: false, default: null },
                        lastState: { type: Number, required: false, default: null },
                        lastStateMeasure: { type: String, required: false, default: null },
                        lastUpdateData: { type: Date, required: false, default: null },
                        comments: {
                            date: { type: Date, required: false, default: null },
                            comment: { type: String, required: false, default: null},
                            required: false,
                        },
                        enabled: { type: Boolean, required: false, default: true },
                        required:false
                    }
                ],
                required: false
            }
        ],
        active: { type: Boolean, required: false, default: true }
    },
	{
		versionKey: false,
		timestamps: true,
	},
);

export default schema;
