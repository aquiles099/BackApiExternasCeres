"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { String, Number, ObjectId, Boolean, Date } = mongoose_1.Schema.Types;
const schema = new mongoose_1.Schema({
    name: { type: String, required: false, default: null },
    business: { type: String, required: false, default: null },
    rut: { type: String, required: false, default: null },
    phone: { type: String, required: false, default: null },
    email: { type: String, lowercase: true, required: false, default: null },
    direction_invoice: { type: String, required: false, default: null },
    order: { type: String, required: false, default: null },
    id_wiseconn: { type: String, required: false, unique: true },
    agent: {
        name_agent: { type: String, required: false, default: null },
        rut_agent: { type: String, required: false, default: null },
        phone_agent: { type: String, required: false, default: null },
        required: false,
    },
    active: { type: Boolean, required: false, default: true },
    zone: { type: String, required: false, default: null },
    position: { type: String, required: false, default: null },
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = schema;
//# sourceMappingURL=accounts.js.map