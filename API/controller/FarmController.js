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
exports.getMeasuresByFarm = exports.getZonesByIdFarm = exports.getFarmById = exports.getFarms = void 0;
const models_1 = require("../db/models");
const logger_js_1 = __importDefault(require("../logger.js"));
const createBackLogs_1 = __importDefault(require("../Middleware/createBackLogs"));
const options = {
    _id: 0,
    id_wiseconn: 1,
    name: 1,
    description: 1,
    latitude: 1,
    longitude: 1,
    postalAddress: 1,
    account: {
        id: 1,
        name: 1
    },
    timeZone: 1,
    timeZoneName: 1,
    webhook: 1,
    metadata: 1
};
const optionsZone = {
    _id: 0,
    id_wiseconn: 1,
    name: 1,
    description: 1,
    latitude: 1,
    longitude: 1,
    type: 1,
    farm: 1,
    pump_system: 1,
    kc: 1,
    theoreticalFlow: 1,
    unitTheoreticalFlow: 1,
    efficiency: 1,
    humidity_retention: 1,
    max: 1,
    min: 1,
    critical_point1: 1,
    critical_point2: 1,
    BFPressureId: 1,
    AFPressureId: 1,
    onlyMonitoring: 1,
    area: 1,
    areaUnit: 1,
    metadata: 1,
    allowPumpSelection: 1,
    predefinedPumps: 1,
    polygon: {
        path: {
            lat: 1,
            lng: 1
        },
        bounds: 1
    }
};
// getting all farms
const getFarms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // query
    yield models_1.Farm.find({
        active_cloning: true,
        active: true
    }, options).lean()
        .then((farmData) => __awaiter(void 0, void 0, void 0, function* () {
        if (farmData && farmData.length > 0) {
            yield Promise.all(farmData.map((data) => {
                return {
                    id: data.id_wiseconn,
                    name: data.name,
                    description: data.description,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    postalAddress: data.postalAddress,
                    account: data.account,
                    timeZone: data.timeZone,
                    timeZoneName: data.timeZoneName,
                    webhook: data.webhook,
                    metadata: data.metadata
                };
            }))
                .then((resp) => __awaiter(void 0, void 0, void 0, function* () {
                (0, createBackLogs_1.default)('/farms', 200, 'INFO status 200 result OK in getFarms', req);
                logger_js_1.default.info('INFO status 200 result OK in getFarms');
                res.status(200).json(resp);
            }))
                .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                // error
                (0, createBackLogs_1.default)('/farms', 500, err, req);
                logger_js_1.default.error('ERROR in farmData' + err);
                res.status(500).json({ error: 500, message: 'Error in API getting data' });
            }));
        }
        else {
            (0, createBackLogs_1.default)('/farms', 200, 'WARNING status 200 result no data in getFarms', req);
            logger_js_1.default.warn('WARNING status 200 result no data in getFarms');
            res.status(200).json([]);
        }
    }))
        .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
        // error
        (0, createBackLogs_1.default)('/farms', 500, err, req);
        logger_js_1.default.error('ERROR in getFarms ' + err);
        res.status(500).json({ error: 500, message: 'Error in API getting data' });
    }));
});
exports.getFarms = getFarms;
// getting farm by idwiseconn
const getFarmById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // define vars
    const id_wiseconn = req.params.id;
    if (!id_wiseconn) {
        (0, createBackLogs_1.default)('/farms/:id', 400, 'WARNING status 400 result ID invalid in getFarmById', req);
        logger_js_1.default.warn('WARNING status 400 result ID invalid in getFarmById');
        res.status(400).json({
            message: 'ID del Farm es inválido'
        });
        return;
    }
    ;
    // query
    yield models_1.Farm.findOne({
        id_wiseconn,
        active_cloning: true,
        active: true
    }, options).lean()
        .then((farmData) => __awaiter(void 0, void 0, void 0, function* () {
        if (farmData) {
            (0, createBackLogs_1.default)('/farms/:id', 200, 'INFO status 200 result OK in getFarmById', req);
            logger_js_1.default.info('INFO status 200 result OK in getFarmById');
            res.status(200).json({
                id: farmData.id_wiseconn,
                name: farmData.name,
                description: farmData.description,
                latitude: farmData.latitude,
                longitude: farmData.longitude,
                postalAddress: farmData.postalAddress,
                account: farmData.account,
                timeZone: farmData.timeZone,
                timeZoneName: farmData.timeZoneName,
                webhook: farmData.webhook,
                metadata: farmData.metadata
            });
        }
        else {
            (0, createBackLogs_1.default)('/farms/:id', 200, 'WARNING status 200 result no data in getFarmById', req);
            logger_js_1.default.warn('WARNING status 200 result no data in getFarmById');
            res.status(200).json({
                message: 'ID del Farm no existe o es inválido'
            });
        }
    }))
        .catch((err) => {
        // error
        (0, createBackLogs_1.default)('/farms/:id', 500, err, req);
        logger_js_1.default.error('ERROR in getFarmById ' + err);
        res.status(500).json({ error: 500, message: 'Error in API getting data' });
    });
});
exports.getFarmById = getFarmById;
// getting zones by farm
const getZonesByIdFarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // define vars
    const farmId = req.params.id;
    if (!farmId) {
        (0, createBackLogs_1.default)('/farms/:id/zones', 400, 'WARNING status 400 result ID invalid in getZonesByIdFarm', req);
        logger_js_1.default.warn('WARNING status 400 result ID invalid in getZonesByIdFarm');
        res.status(400).json({
            message: 'ID del Farm es inválido'
        });
        return;
    }
    ;
    yield models_1.Farm.findOne({
        id_wiseconn: farmId,
        active_cloning: true,
        active: true
    }, { _id: 1 }).lean()
        .then((farmData) => __awaiter(void 0, void 0, void 0, function* () {
        if (farmData) {
            // query for get zones
            yield models_1.Zone.find({ farm: farmData._id }, optionsZone).lean()
                .then((zonesData) => __awaiter(void 0, void 0, void 0, function* () {
                if (zonesData && zonesData.length > 0) {
                    yield Promise.all(zonesData.map((data) => {
                        return {
                            id: data.id_wiseconn,
                            name: data.name,
                            description: data.description,
                            latitude: data.latitude,
                            longitude: data.longitude,
                            type: data.type,
                            farmId,
                            pump_system: data.pump_system,
                            kc: data.kc,
                            theoreticalFlow: data.theoreticalFlow,
                            unitTheoreticalFlow: data.unitTheoreticalFlow,
                            efficiency: data.efficiency,
                            humidity_retention: data.humidity_retention,
                            max: data.max,
                            min: data.min,
                            critical_point1: data.critical_point1,
                            critical_point2: data.critical_point2,
                            BFPressureId: data.BFPressureId,
                            AFPressureId: data.AFPressureId,
                            onlyMonitoring: data.onlyMonitoring,
                            area: data.area,
                            areaUnit: data.areaUnit,
                            metadata: data.metadata,
                            allowPumpSelection: data.allowPumpSelection,
                            predefinedPumps: data.predefinedPumps,
                            polygon: data.polygon
                        };
                    })).then((resp) => {
                        (0, createBackLogs_1.default)('/farms/:id/zones', 200, 'INFO status 200 result OK in getZonesByIdFarm', req);
                        logger_js_1.default.info('INFO status 200 result OK in getZonesByIdFarm');
                        res.status(200).json(resp);
                    })
                        .catch((err) => {
                        // error
                        (0, createBackLogs_1.default)('/farms/:id/zones', 500, err, req);
                        logger_js_1.default.error('ERROR in getZonesByIdFarm ' + err);
                        res.status(500).json({ error: 500, message: 'Error in API getting data' });
                    });
                }
                else {
                    (0, createBackLogs_1.default)('/farms/:id/zones', 200, 'WARNING status 200 result not exist zones in getZonesByIdFarm', req);
                    logger_js_1.default.warn('WARNING status 200 result not exist zones in getZonesByIdFarm');
                    res.status(200).json([]);
                }
            }))
                .catch((err) => {
                // error
                (0, createBackLogs_1.default)('/farms/:id/zones', 500, err, req);
                logger_js_1.default.error('ERROR in getZonesByIdFarm ' + err);
                res.status(500).json({ error: 500, message: 'Error in API getting data' });
            });
        }
        else {
            (0, createBackLogs_1.default)('/farms/:id/zones', 200, 'WARNING status 200 result invalid ID or not exist in getZonesByIdFarm', req);
            logger_js_1.default.warn('WARNING status 200 result invalid ID or not exist in getZonesByIdFarm');
            res.status(200).json({
                message: 'ID del Farm no existe o es inválido'
            });
        }
    }))
        .catch((err) => {
        // error
        (0, createBackLogs_1.default)('/farms/:id/zones', 500, err, req);
        logger_js_1.default.error('ERROR in getZonesByIdFarm ' + err);
        res.status(500).json({ error: 500, message: 'Error in API getting data' });
    });
});
exports.getZonesByIdFarm = getZonesByIdFarm;
// getting measures by farm
const getMeasuresByFarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // define vars
    const farmId = req.params.id;
    if (!farmId) {
        (0, createBackLogs_1.default)('/farms/:id/measures', 400, 'WARNING status 400 result ID invalid in getMeasuresByFarm', req);
        logger_js_1.default.warn('WARNING status 400 result ID invalid in getMeasuresByFarm');
        res.status(400).json({
            message: 'ID del Farm es inválido'
        });
        return;
    }
    ;
    yield models_1.Farm.findOne({
        id_wiseconn: farmId,
        active_cloning: true,
        active: true
    }, { _id: 1 }).lean()
        .then((farmData) => __awaiter(void 0, void 0, void 0, function* () {
        if (farmData) {
            // query for get measures
            yield models_1.Measure.find({ farm: farmData._id }, {
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
                zone: 1
            }).lean()
                .then((measureData) => __awaiter(void 0, void 0, void 0, function* () {
                if (measureData && measureData.length > 0) {
                    yield Promise.all(measureData.map((data) => __awaiter(void 0, void 0, void 0, function* () {
                        const zoneId = yield models_1.Zone.findOne({ _id: data.zone }, { id_wiseconn: 1, _id: 0 })
                            .lean()
                            .catch((err) => {
                            // error
                            (0, createBackLogs_1.default)('/farms/:id/measures', 500, err, req);
                            logger_js_1.default.error('ERROR in getting zone in getMeasuresByFarm ' + err);
                        });
                        return {
                            id: data.id_wiseconn,
                            farmId,
                            zoneId: zoneId ? zoneId.id_wiseconn : '',
                            name: data.name,
                            unit: data.unit || '',
                            lastData: data.lastData || '',
                            lastDataDate: data.lastDataDate || '',
                            monitoringTime: data.monitoringTime || '',
                            sensorDepth: data.sensorDepth || '',
                            depthUnit: data.depthUnit || '',
                            fieldCapacity: data.field_capacity || '',
                            readilyAvailableMoisture: data.readily_available_moisture || '',
                            sensorType: data.sensorType || '',
                            readType: '',
                            soilMostureSensorType: data.soilMostureSensorType || '',
                            createdAt: data.createdAt
                        };
                    }))).then((resp) => {
                        (0, createBackLogs_1.default)('/farms/:id/measures', 200, 'INFO status 200 result OK in getMeasuresByFarm', req);
                        logger_js_1.default.info('INFO status 200 result OK in getMeasuresByFarm');
                        res.status(200).json(resp);
                    })
                        .catch((err) => {
                        // error
                        (0, createBackLogs_1.default)('/farms/:id/measures', 500, err, req);
                        logger_js_1.default.error('ERROR in getMeasuresByFarm ' + err);
                        res.status(500).json({ error: 500, message: 'Error in API getting data' });
                    });
                }
                else {
                    (0, createBackLogs_1.default)('/farms/:id/measures', 200, 'WARNING status 200 result not exist measures in getMeasuresByFarm', req);
                    logger_js_1.default.warn('WARNING status 200 result not exist measures in getMeasuresByFarm');
                    res.status(200).json([]);
                }
            }))
                .catch((err) => {
                // error
                (0, createBackLogs_1.default)('/farms/:id/measures', 500, err, req);
                logger_js_1.default.error('ERROR in getMeasuresByFarm ' + err);
                res.status(500).json({ error: 500, message: 'Error in API getting data' });
            });
        }
        else {
            (0, createBackLogs_1.default)('/farms/:id/measures', 200, 'WARNING status 200 result invalid ID or not exist in getMeasuresByFarm', req);
            logger_js_1.default.warn('WARNING status 200 result invalid ID or not exist in getMeasuresByFarm');
            res.status(200).json({
                message: 'ID del Farm no existe o es inválido'
            });
        }
    }))
        .catch((err) => {
        // error
        (0, createBackLogs_1.default)('/farms/:id/measures', 500, err, req);
        logger_js_1.default.error('ERROR in getMeasuresByFarm ' + err);
        res.status(500).json({ error: 500, message: 'Error in API getting data' });
    });
});
exports.getMeasuresByFarm = getMeasuresByFarm;
//# sourceMappingURL=FarmController.js.map