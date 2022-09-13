"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const schema = new mongoose_1.Schema({
    expansionPort: { type: Number, required: false },
    expansionBoard: { type: String, required: false },
    nodePort: { type: Number, required: false },
    measure: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Measure',
        required: false,
    },
    id_wiseconn: { type: String, required: true }, //,  max: 1, unique: true },
}, {
    versionKey: false,
    timestamps: true,
});
schema.plugin(mongoose_unique_validator_1.default, { message: 'El {PATH} "{VALUE}" ya ha sido registrado en otro PhysicalConnection.' });
exports.default = schema;
//# sourceMappingURL=physical-connection.js.map