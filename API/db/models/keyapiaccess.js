"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { String, Date } = mongoose_1.Schema.Types;
const schema = new mongoose_1.Schema({
    keyAccess: { type: String, required: false },
    dateExpire: { type: Date, required: false },
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = schema;
//# sourceMappingURL=keyapiaccess.js.map