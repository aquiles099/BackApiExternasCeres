"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const schema = new mongoose_1.Schema({
    initTime: { type: Date, required: false, default: (0, moment_timezone_1.default)().tz('America/Santiago').subtract(1, 'days').format('YYYY-MM-DD') },
    endTime: { type: Date, Request: false, default: (0, moment_timezone_1.default)().tz('America/Santiago').format('YYYY-MM-DD') },
    zoneId: { type: String, required: false, default: null },
    status: { type: String, required: false, default: null },
    type: {
        id: { type: Number, required: false, default: null },
        description: { type: String, required: false, default: null },
    },
    volume: {
        value: { type: Number, required: false, default: null },
        unitName: { type: String, required: false, default: null },
        unitAbrev: { type: String, required: false, default: null },
    },
    precipitation: {
        value: { type: Number, required: false, default: null },
        unitName: { type: String, required: false, default: null },
        unitAbrev: { type: String, required: false, default: null },
    },
    flow: {
        value: { type: Number, required: false, default: null },
        unitName: { type: String, required: false, default: null },
        unitAbrev: { type: String, required: false, default: null },
    },
    instantaneousFlow: {
        value: { type: Number, required: false, default: null },
        unitName: { type: String, required: false, default: null },
        unitAbrev: { type: String, required: false, default: null },
    },
    instantaneousPressure: {
        value: { type: Number, required: false, default: null },
        unitName: { type: String, required: false, default: null },
        unitAbrev: { type: String, required: false, default: null },
    },
    hydraulics: [
        {
            id: { type: Number, required: false, default: null },
            type: { type: String, required: false, default: null },
        },
    ],
    stoppedByUser: {
        id: { type: Number, required: false, default: null },
        name: { type: String, required: false, default: null },
    },
    fertigations: [
        {
            id: { type: Number, required: false, default: null },
            initTime: { type: Date, required: false, default: null },
            endTime: { type: Date, required: false, default: null },
            dilution: { type: String, required: false, default: null },
            soluble: { type: Boolean, required: false, default: false },
            volume: {
                value: { type: Number, required: false, default: null },
                unitName: { type: String, required: false, default: null },
                unitAbrev: { type: String, required: false, default: null },
            },
            nutrients: [
                {
                    name: { type: Number, required: false, default: null },
                    percentage: { type: String, required: false, default: null },
                },
            ],
            proportion: { type: Number, required: false, default: null },
            fertilizer: {
                id: { type: Number, required: false, default: null },
                name: { type: Number, required: false, default: null },
                description: { type: Number, required: false, default: null },
            },
        },
    ],
    phControl: [
        {
            id: { type: Number, required: false, default: null },
            setPoint: { type: Number, required: false, default: null },
            preIrrigationSeconds: { type: Number, required: false, default: null },
            postIrrigationSeconds: 0,
            phAverage: 0,
            CEAverage: 0,
            pHInjectorId: 0,
        },
    ],
    id_wiseconn: { type: String, required: false },
    measure: {
        id: { type: String, required: false, default: null },
        sensorType: { type: String, required: false, default: null },
    },
}, {
    versionKey: false,
    timestamps: true,
});
schema.index({ id_wiseconn: 1 }, { unique: true });
schema.plugin(mongoose_unique_validator_1.default, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro measure data.' });
exports.default = schema;
//# sourceMappingURL=realIrrigations.js.map