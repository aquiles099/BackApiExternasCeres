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
exports.getMeasuresByZone = void 0;
const models_1 = require("../db/models");
const logger_js_1 = __importDefault(require("../logger.js"));
// obtain measures for Zone by idwiseconn
const getMeasuresByZone = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // define vars
    const zoneId = req.params.id;
    if (!zoneId) {
        logger_js_1.default.warn('WARNING status 400 result ID invalid in getMeasuresByZone');
        res.status(400).json({
            message: 'ID del zone es inválido'
        });
        return;
    }
    ;
    yield models_1.Zone.findOne({ id_wiseconn: zoneId }, { '_id': 1 }).lean()
        .then((zoneData) => __awaiter(void 0, void 0, void 0, function* () {
        if (zoneData) {
            // query for get measures
            yield models_1.Measure.find({ zone: zoneData._id }, {
                _id: 0,
                id_wiseconn: 1,
                lastData: 1,
                lastDataDate: 1,
                depthUnit: 1,
                sensorDepth: 1,
                sensorType: 1,
                createdAt: 1,
                soilMostureSensorType: 1,
                monitoringTime: 1,
                name: 1,
                unit: 1,
                readily_available_moisture: 1,
                field_capacity: 1,
                zone: 1,
                farm: 1
            }).lean()
                .then((measureData) => __awaiter(void 0, void 0, void 0, function* () {
                if (measureData && measureData.length > 0) {
                    yield Promise.all(measureData.map((data) => __awaiter(void 0, void 0, void 0, function* () {
                        const { id_wiseconn, lastData, lastDataDate, depthUnit, sensorDepth, sensorType, createdAt, soilMostureSensorType, monitoringTime, name, unit, brand, farm } = data;
                        const physical_connection = yield models_1.PhysicalConnection.findOne({ measure: data._id }, {
                            _id: 0,
                            expansionPort: 1,
                            expansionBoard: 1,
                            nodePort: 1
                        }).lean()
                            .catch((err) => {
                            // error
                            logger_js_1.default.error('ERROR in getting PhysicalConnection in getMeasuresByZone ' + err);
                        });
                        const farmId = yield models_1.Farm.findOne({ _id: farm }, { id_wiseconn: 1, _id: 0 }).lean()
                            .catch((err) => {
                            // error
                            logger_js_1.default.error('ERROR in getting Farm in getMeasuresByZone ' + err);
                        });
                        return {
                            id: id_wiseconn,
                            farmId: farmId ? farmId.id_wiseconn : '',
                            zoneId: zoneId,
                            name,
                            unit,
                            lastData,
                            lastDataDate,
                            monitoringTime,
                            sensorDepth,
                            depthUnit,
                            fieldCapacity: data.field_capacity,
                            readilyAvailableMoisture: data.readily_available_moisture,
                            sensorType,
                            readType: 'direct',
                            soilMostureSensorType,
                            brand,
                            createdAt,
                            physicalConnection: physical_connection
                        };
                    }))).then((resp) => {
                        logger_js_1.default.info('INFO status 200 result OK in getMeasuresByZone');
                        res.status(200).json(resp);
                    })
                        .catch((err) => {
                        // error
                        logger_js_1.default.error('ERROR in getMeasuresByZone ' + err);
                        res.status(500).json({ error: 500, message: 'Error in API getting data' });
                    });
                }
                else {
                    logger_js_1.default.warn('WARNING status 200 result not exist measures in getMeasuresByZone');
                    res.status(200).json([]);
                }
            }))
                .catch((err) => {
                // error
                logger_js_1.default.error('ERROR in getMeasuresByZone ' + err);
                res.status(500).json({ error: 500, message: 'Error in API getting data' });
            });
        }
        else {
            logger_js_1.default.warn('WARNING status 200 result invalid ID or not exist in getMeasuresByZone');
            res.status(200).json({
                message: 'ID del Farm no existe o es inválido'
            });
        }
    }))
        .catch((err) => {
        // error
        logger_js_1.default.error('ERROR in getMeasuresByZone ' + err);
        res.status(500).json({ error: 500, message: 'Error in API getting data' });
    });
});
exports.getMeasuresByZone = getMeasuresByZone;
//# sourceMappingURL=ZoneController.js.map