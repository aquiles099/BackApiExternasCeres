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
const logger_js_1 = __importDefault(require("../logger.js"));
const createBackLogs_1 = __importDefault(require("../Middleware/createBackLogs"));
// cron for
const date_valid = (init, end, i) => {
    const day = (0, moment_1.default)(init).add(i, 'day').format();
    const endDay = (0, moment_1.default)(end).format();
    return (0, moment_1.default)(day) <= (0, moment_1.default)(endDay);
};
/** getMeasureDatasByMeasure  */
const getMeasureDatasByMeasure = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // define vars
    const { id } = req.params;
    let { initTime, endTime } = req.query;
    if (!id) {
        (0, createBackLogs_1.default)('/measures/:id/data', 400, 'WARNING status 400 result ID invalid in getMeasureDatasByMeasure', req);
        logger_js_1.default.warn('WARNING status 400 result ID invalid in getMeasureDatasByMeasure');
        res.status(400).json({
            message: 'El id es requerido o es inválido'
        });
        return;
    }
    else if (!initTime || !endTime) {
        (0, createBackLogs_1.default)('/measures/:id/data', 400, 'WARNING status 400 result ID invalid in getMeasureDatasByMeasure', req);
        logger_js_1.default.warn('WARNING status 400 result ID invalid in getMeasureDatasByMeasure');
        res.status(400).json({
            message: 'Se requiere un período de fecha de inicio y fecha fin'
        });
        return;
    }
    if (initTime.length == 10 && endTime.length == 10) {
        initTime = initTime + 'T00:00:00';
        endTime = endTime + 'T23:59:00';
    }
    // query
    yield models_1.MeasureData.find({ $and: [
            { id_wiseconn: id },
            {
                time: {
                    $gte: initTime + '.000Z',
                    $lte: endTime + '.000Z'
                }
            }
        ]
    }, {
        _id: 0,
        time: 1,
        value: 1
    }).lean()
        .then((dataMeasure) => __awaiter(void 0, void 0, void 0, function* () {
        if (dataMeasure && dataMeasure.length > 0) {
            (0, createBackLogs_1.default)('/measures/:id/data', 200, 'INFO status 200 result OK in getMeasureDatasByMeasure', req);
            logger_js_1.default.info('INFO status 200 result OK in getMeasureDatasByMeasure');
            res.status(200).json(dataMeasure);
        }
        else {
            (0, createBackLogs_1.default)('/measures/:id/data', 200, 'WARNING status 200 result no data in getMeasureDatasByMeasure', req);
            logger_js_1.default.warn('WARNING status 200 result no data in getMeasureDatasByMeasure');
            res.status(200).json([]);
        }
    }))
        .catch((err) => {
        // error
        (0, createBackLogs_1.default)('/measures/:id/data', 500, err, req);
        logger_js_1.default.error('ERROR in getMeasureDatasByMeasure ' + err);
        res.status(500).json({ error: 500, message: 'Error in API getting data' });
    });
});
exports.getMeasureDatasByMeasure = getMeasureDatasByMeasure;
//# sourceMappingURL=MeasureControllers.js.map