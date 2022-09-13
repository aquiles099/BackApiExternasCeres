"use strict";
/**
 * este middleware proccesa los cors para
 * para limitar a que dominios tienen o no acceso
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const white_list = [''];
const origin = (origin, cb) => (white_list.includes(origin) ? cb(null, true) : cb(null, true));
const corsOptions = {
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin,
};
exports.default = (0, cors_1.default)(corsOptions);
//# sourceMappingURL=index.js.map