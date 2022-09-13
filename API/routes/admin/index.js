"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const measures_routes_1 = __importDefault(require("./measures.routes"));
const farms_routes_1 = __importDefault(require("./farms.routes"));
const zone_routes_1 = __importDefault(require("./zone.routes"));
//
const initRoutes = (app) => {
    app.use(farms_routes_1.default);
    app.use(measures_routes_1.default);
    app.use(zone_routes_1.default);
};
//
exports.default = initRoutes;
//# sourceMappingURL=index.js.map