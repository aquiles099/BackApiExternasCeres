"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const schema = new mongoose_1.Schema({
    value: { type: Number, required: false, default: null },
    time: { type: Date, required: false, default: null },
    id_wiseconn: { type: String, required: false },
    measure: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Measure' },
}, {
    versionKey: false,
    timestamps: true,
});
schema.index({ id_wiseconn: 1, time: -1, value: -1 }, { unique: true });
schema.plugin(mongoose_unique_validator_1.default, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro measure data.' });
exports.default = schema;
//# sourceMappingURL=measure-data.js.map