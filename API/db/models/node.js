"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const schema = new mongoose_1.Schema({
    name: { type: String, required: false },
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
    node_type: { type: String, required: false },
    id_wiseconn: { type: String, required: false }, //,  max: 1, unique: true },
}, {
    versionKey: false,
    timestamps: true,
});
schema.plugin(mongoose_unique_validator_1.default, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro node.' });
exports.default = schema;
//# sourceMappingURL=node.js.map