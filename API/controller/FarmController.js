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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeasuresByFarm = exports.getZonesByIdFarm = exports.getFarmById = exports.getFarms = void 0;
const models_1 = require("../db/models");
const Msg = __importStar(require("../hooks/messages"));
const options = {
    _id: 0,
    id: 1,
    name: 1,
    description: 1,
    latitude: 1,
    longitude: 1,
    id_wiseconn: 1,
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
    id: 1,
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
        path: 1,
        bounds: 1
    }
};
// obtain all farms
const getFarms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // query
        const info = yield models_1.Farm.find({}, options).lean();
        // response
        res.status(200).json({ status: true, message: Msg.Farm().getAll, data: info });
    }
    catch (err) {
        // response error
        next(err);
    }
});
exports.getFarms = getFarms;
// obtain farm by idwiseconn
const getFarmById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // define vars
        const id_wiseconn = req.params.id;
        // query
        const info = yield models_1.Farm.findOne({ id_wiseconn }, options);
        // response
        res.status(200).json({ status: true, message: Msg.Farm(id_wiseconn).get, data: info });
    }
    catch (err) {
        // response error
        next(err);
    }
});
exports.getFarmById = getFarmById;
// obtain zones by farm
const getZonesByIdFarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // define vars
        const id_wiseconn = req.params.id;
        const farm = yield models_1.Farm.findOne({ id_wiseconn });
        if (!farm)
            throw { code: 400, message: 'el farm no existe' };
        const { _id } = farm;
        // query for get zones
        const zones = yield models_1.Zone.find({ farm: _id }, optionsZone).lean();
        res.status(200).json({ message: Msg.Zone(id_wiseconn, 'farm').getBy, data: zones });
    }
    catch (err) {
        // response error
        next(err);
    }
});
exports.getZonesByIdFarm = getZonesByIdFarm;
// obtain measures by farm
const getMeasuresByFarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // define vars
        const id_wiseconn = req.params.id;
        if (!id_wiseconn)
            throw { message: 'el id es requerido', code: 400 };
        // query
        const farmData = yield models_1.Farm.findOne({ id_wiseconn }, '_id');
        if (!farmData)
            throw { message: 'el id suministrado noexiste en la db', code: 400 };
        const ArrayData = yield models_1.Measure.find({ farm: farmData._id });
        const resp = ArrayData.map((data, i) => __awaiter(void 0, void 0, void 0, function* () {
            const { node, lastData, lastDataDate, depthUnit, sensorDepth, sensorType, createdAt, soilMostureSensorType, monitoringTime, zone, name, unit, } = data;
            const physical_connection = yield models_1.PhysicalConnection.findById(data.physical_connection);
            const obj = {
                id: data.id_wiseconn,
                farmId: id_wiseconn,
                zoneId: zone,
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
                nodeId: node,
                readType: '',
                soilMostureSensorType,
                createdAt,
                physicalConnection: physical_connection,
            };
            return obj;
        }));
        const info = yield Promise.all(resp);
        // response
        res.status(200).json({ status: true, message: Msg.Farm(id_wiseconn, 'Measures').getBy, data: info });
    }
    catch (err) {
        // console view errr
        // response error
        next(err);
    }
});
exports.getMeasuresByFarm = getMeasuresByFarm;
//# sourceMappingURL=FarmController.js.map