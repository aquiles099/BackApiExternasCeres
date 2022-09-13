"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getMeasureDatasByMeasure = void 0;
const moment_1 = __importDefault(require("moment"));
const Msg = __importStar(require("../hooks/messages"));
const models_1 = require("../db/models");
// cron for
const date_valid = (init, end, i) => {
    const day = (0, moment_1.default)(init).add(i, 'day').format();
    const endDay = (0, moment_1.default)(end).format();
    return (0, moment_1.default)(day) <= (0, moment_1.default)(endDay);
};
/** getMeasureDatasByMeasure  */
const getMeasureDatasByMeasure = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // define vars
        const { id } = req.params;
        const { initTime, endTime } = req.query;
        // error of vars
        if (!id)
            throw { message: 'El id es requerido', code: 400 };
        else if (!initTime || !endTime)
            throw { message: 'se requiere una fecha de inicio y una de fin', code: 400 };
        // query
        const time = {
            $gte: new Date(initTime).toISOString(),
            $lt: new Date(endTime).toISOString(),
        };
        const resps = yield models_1.MeasureData.find({ $and: [{ id_wiseconn: id }, { time }] }, {
            _id: 0,
            time: 1,
            value: 1
        }).lean();
        // response
        res.status(200).send({ state: true, message: Msg.MeasureData(id, 'Measure').getBy, data: resps });
    }
    catch (err) {
        // response error
        next(err);
    }
});
exports.getMeasureDatasByMeasure = getMeasureDatasByMeasure;
//# sourceMappingURL=MeasureControllers.js.map