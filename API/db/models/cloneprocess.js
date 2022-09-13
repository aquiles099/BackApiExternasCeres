"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { String, Number, ObjectId, Boolean, Date } = mongoose_1.Schema.Types;
const schema = new mongoose_1.Schema({
    id_type: { type: Number, required: false, default: null },
    type: { type: String, required: false, default: null },
    status: { type: Boolean, required: false, default: false },
    log: {
        id: { type: String, required: false, default: null },
        id_wiseconn: { type: String, required: false, default: null },
        name: { type: String, required: false, default: null },
        process: [
            {
                id: { type: String, required: false, default: null },
                id_wiseconn: { type: String, required: false, default: null },
                name: { type: String, required: false, default: null },
                processData: { type: Boolean, required: false, default: false },
                status: { type: Boolean, required: false, default: false },
                lastDataDate: { type: Date, required: false, default: null },
                required: false,
            },
        ],
        measureNotZone: [
            {
                id: { type: String, required: false, default: null },
                id_wiseconn: { type: String, required: false, default: null },
                name: { type: String, required: false, default: null },
                zone: { type: String, required: false, default: null },
                farm: { type: String, required: false, default: null },
                status: { type: Boolean, required: false, default: false },
                required: false,
            },
        ],
        required: false,
    }
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = schema;
//# sourceMappingURL=cloneprocess.js.map