"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    formula: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
}, {
    versionKey: false,
    timestamps: true,
});
schema.index({ name: 1, description: 1, formula: 1 }, { unique: true });
schema.plugin(mongoose_unique_validator_1.default, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro node.' });
exports.default = schema;
//# sourceMappingURL=var-derivate-master.js.map