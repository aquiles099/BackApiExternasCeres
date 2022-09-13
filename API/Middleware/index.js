"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.posRutes = exports.preRoutes = void 0;
const secure_1 = __importDefault(require("./secure"));
const err_1 = __importDefault(require("./err"));
const err_404_1 = __importDefault(require("./err/err_404"));
const api_key_access_1 = __importDefault(require("./api-key-access"));
const preRoutes = (app) => {
    app.use(secure_1.default);
    app.use(api_key_access_1.default);
};
exports.preRoutes = preRoutes;
const posRutes = (app) => {
    app.use(err_1.default);
    app.use(err_404_1.default);
};
exports.posRutes = posRutes;
//# sourceMappingURL=index.js.map