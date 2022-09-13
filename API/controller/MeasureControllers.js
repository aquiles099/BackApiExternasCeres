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
exports.getMeasureDatasByMeasure = void 0;
const moment_1 = __importDefault(require("moment"));
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
            throw { message: 'El id es requerido', error: 400 };
        else if (!initTime || !endTime)
            throw { message: 'Se requiere una fecha de inicio y una de fin', error: 400 };
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
        res.status(200).send(resps);
    }
    catch (err) {
        // response error
        next(err);
    }
});
exports.getMeasureDatasByMeasure = getMeasureDatasByMeasure;
//# sourceMappingURL=MeasureControllers.js.map