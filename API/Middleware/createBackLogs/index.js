"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../db/models");
const moment_1 = __importDefault(require("moment"));
const backLog = {
    api: '',
    logDate: '',
    request: {},
    response: {},
    app: 'externa',
    statusCode: ''
};
exports.default = (api, code, message, req) => __awaiter(void 0, void 0, void 0, function* () {
    const today = (0, moment_1.default)().tz('America/Santiago').format('YYYY-MM-DDTHH:mm:ss');
    backLog.api = api;
    backLog.logDate = new Date(today).toISOString();
    backLog.statusCode = code.toString();
    backLog.response = code == 500 ? message : { code, message };
    backLog.request = {
        query: req.query,
        params: req.params,
        body: req.body
    };
    yield models_1.BackLogExternos.create(backLog);
    return true;
});
//# sourceMappingURL=index.js.map