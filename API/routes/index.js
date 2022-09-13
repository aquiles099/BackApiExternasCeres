"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = __importDefault(require("./admin"));
//
const initRoutes = (app) => {
    (0, admin_1.default)(app);
};
//
exports.default = initRoutes;
//# sourceMappingURL=index.js.map