"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = __importDefault(require("./code"));
const err404 = (req, res, next) => {
    // create obj of the response
    const code_descript = code_1.default[404];
    const message = 'Sorry the route no is valid  404';
    const obj = { status: false, message, code: 404, code_descript, path: req.originalUrl, method: req.method };
    // to write response in the consol
    if (obj.message.length + obj.code_descript + obj.path.length < 80)
        console.table([obj]);
    else
        console.log(obj);
    // response
    res.status(404).json(obj);
};
exports.default = err404;
//# sourceMappingURL=err_404.js.map