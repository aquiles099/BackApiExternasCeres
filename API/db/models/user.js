"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const { ObjectId, String, Boolean } = mongoose_1.Schema.Types;
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    business: { type: String, required: true },
    office: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    id_role: { type: ObjectId, ref: 'Rol', required: true },
    active: { type: Boolean, required: false, default: false },
    // new_msj_notification: { type: String, required: false },
    // new_alert_notification: { type: String, required: false },
    // new_zone_notification: { type: String, required: false },
    // remember_token: { type: String, required: false },
    farms: [{ _id: { type: ObjectId, ref: 'Farm', required: false } }],
}, {
    versionKey: false,
    timestamps: true,
});
schema.plugin(mongoose_unique_validator_1.default, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro node.' });
exports.default = schema;
//# sourceMappingURL=user.js.map