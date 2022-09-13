"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { String, ObjectId, Date } = mongoose_1.Schema.Types;
const schema = new mongoose_1.Schema({
    pond: { type: String, require: false },
    currentStateHumidity: { type: String, require: false },
    saturationZone: { type: String, require: false },
    stressZone: { type: String, require: false },
    fecha: { type: Date, require: false },
    zone: { type: ObjectId, ref: 'Zone', required: false },
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = schema;
//# sourceMappingURL=irrimax.js.map