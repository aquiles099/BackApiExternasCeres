"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = __importDefault(require("./code"));
const index_1 = __importDefault(require("../../test/logs/index"));
const createBackLogs_1 = __importDefault(require("../../Middleware/createBackLogs"));
/**
 * este middleware se dedica a cashar y formatear los errores
 * @param err
 * @param req
 * @param res
 * @param next
 */
const Error = (err, req, res, next) => {
    if (!err)
        next();
    // define vars
    const code = err.code ? err.code : err.response ? err.response.status : 500;
    const message = '❌ ' + (err.response ? err.response : err.message ? err.message : err);
    const code_descript = code_1.default[code] ? code_1.default[code] : `code:${code}`;
    // create obj for response
    const obj = { status: false, message, code, code_descript, path: req.originalUrl, method: req.method };
    // to write response in the consol
    const length = obj.message.length + obj.code_descript.length + obj.path.length;
    if (length < 80)
        console.table([obj]);
    else
        console.log(obj);
    if (err.logger)
        index_1.default.log(obj);
    (0, createBackLogs_1.default)(req.originalUrl, code, message, req);
    // response
    res.status(code).json(obj);
};
exports.default = Error;
//# sourceMappingURL=index.js.map