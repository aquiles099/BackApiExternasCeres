"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { String, Number, ObjectId, Boolean, Date, Mixed } = mongoose_1.Schema.Types;
const schema = new mongoose_1.Schema({
    api: { type: String, required: false, default: '' },
    logDate: { type: Date, required: false, default: null },
    request: { type: Mixed, required: false, default: {} },
    response: { type: Mixed, required: false, default: {} },
    app: { type: String, required: false, default: 'externa' },
    statusCode: { type: String, required: false, default: '' },
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = schema;
//# sourceMappingURL=backlogsexternos.js.map