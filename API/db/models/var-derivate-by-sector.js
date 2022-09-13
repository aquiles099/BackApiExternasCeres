"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const schema = new mongoose_1.Schema({
    var_data_master: { type: mongoose_1.Schema.Types.ObjectId, ref: 'VarDerivateMaster', required: true },
    zone: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Farm', required: true },
    farm: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Zone', required: true },
    period: { type: String, required: false },
    date_init: { type: Date, required: false },
    status_clone: { type: Boolean, required: false, default: false },
    active: { type: Boolean, required: true },
    saturationZone: { type: String, required: false },
    stressZone: { type: String, required: false },
    id_measure: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Measure', required: false },
    measure: [
        {
            name: { type: String, required: false, default: null },
            unit: { type: String, required: false, default: null },
            lastData: { type: Number, required: false, default: null },
            lastDataDate: { type: Date, required: false, default: null },
            monitoringTime: { type: Number, required: false, default: null },
            sensorDepth: { type: String, required: false, default: null },
            depthUnit: { type: String, required: false, default: null },
            fieldCapacity: { type: Number, required: false, default: null },
            readilyAvailableMoisture: { type: Number, required: false, default: null },
            soilMostureSensorType: { type: String, required: false, default: null },
            sensorType: { type: String, required: false, default: null },
            node: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Node', required: false, default: null },
            farm: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Farm', required: false, default: null },
            zone: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Zone', required: false, default: null },
            id_wiseconn: { type: String, required: false, unique: true },
        }
    ],
}, {
    versionKey: false,
    timestamps: true,
});
schema.index({ var_data_master: 1, zone: 1, period: 1, date_init: 1, active: 1 }, { unique: true });
schema.plugin(mongoose_unique_validator_1.default, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro node.' });
exports.default = schema;
//# sourceMappingURL=var-derivate-by-sector.js.map