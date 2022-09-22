"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = __importDefault(require("express"));
const Middleware_1 = require("../Middleware");
const app = (0, express_1.default)();
//database
require("../db/");
// middleware preRoutes
(0, Middleware_1.preRoutes)(app);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
const routes_1 = __importDefault(require("../routes"));
(0, routes_1.default)(app);
// meddleware posRutes
(0, Middleware_1.posRutes)(app);
// Settings
app.set('port', process.env.PORT || 82);
exports.default = app;
//# sourceMappingURL=API.js.map