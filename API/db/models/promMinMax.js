"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { ObjectId, String, Number } = mongoose_1.Schema.Types;
const schema = new mongoose_1.Schema({
    zone: { type: ObjectId, ref: 'Zone', required: true },
    name: { type: String, required: false, default: '' },
    measures: [
        {
            _id: { type: ObjectId, ref: 'Zone', required: true },
            name: { type: String, required: false, default: '' },
            prom: { type: Number, required: true },
            min: { type: Number, required: true },
            max: { type: Number, required: true },
        },
    ],
    date: { type: Date, default: Date.now, required: true },
    //date: { type: Date, required: false, default: null },
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = schema;
//# sourceMappingURL=promMinMax.js.map