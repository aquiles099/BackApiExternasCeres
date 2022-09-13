"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const { ObjectId } = mongoose_1.Schema.Types;
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    descript: { type: String, required: true },
    active: { type: Boolean, required: true },
    GraphMaster: { type: ObjectId, ref: 'GraficaMaestra', required: true },
    zone: { type: ObjectId, ref: 'Zone', required: true },
    measure: [
        {
            id: { type: ObjectId, ref: 'Zone', required: true },
            type: { type: String, required: true },
        },
    ],
}, {
    versionKey: false,
    timestamps: true,
});
schema.plugin(mongoose_unique_validator_1.default, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro measure data.' });
exports.default = schema;
//# sourceMappingURL=graph-zone.js.map