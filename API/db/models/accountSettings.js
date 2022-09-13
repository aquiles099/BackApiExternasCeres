"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const { String, ObjectId } = mongoose_1.Schema.Types;
const schema = new mongoose_1.Schema({
    api_key: { type: String, required: false, default: null },
    name: { type: String, required: false, default: null },
    password: { type: String, required: false, default: null },
    id_account: { type: String, required: false, default: null },
    id_user: { type: String, required: true },
    api: { type: String, required: false, default: null },
}, {
    versionKey: false,
    timestamps: true,
});
schema.plugin(mongoose_unique_validator_1.default, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otra cuenta.' });
exports.default = schema;
//# sourceMappingURL=accountSettings.js.map