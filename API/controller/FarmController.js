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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeasuresByFarm = exports.getZonesByIdFarm = exports.getFarmById = exports.getFarms = void 0;
const models_1 = require("../db/models");
const mongoose = require('mongoose');
const options = {
    _id: 1,
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
    _id: 1,
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
// obtain all farms
const getFarms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // query
        const farmData = yield models_1.Farm.find({
            active_cloning: true,
            active: true
        }, options).lean();
        // response
        const resp = farmData.filter((data) => {
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
        });
        const info = yield Promise.all(resp);
        // response
        res.status(200).json(info);
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
        if (!id_wiseconn)
            throw { error: 400, message: 'El Id es requerido' };
        // query
        const info = yield models_1.Farm.findOne({
            id_wiseconn,
            active_cloning: true,
            active: true
        }, options).lean();
        res.status(200).json({
            id: info.id_wiseconn,
            name: info.name,
            description: info.description,
            latitude: info.latitude,
            longitude: info.longitude,
            postalAddress: info.postalAddress,
            account: info.account,
            timeZone: info.timeZone,
            timeZoneName: info.timeZoneName,
            webhook: info.webhook,
            metadata: info.metadata
        });
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
        const farmId = req.params.id;
        const farm = yield models_1.Farm.findOne({
            id_wiseconn: farmId,
            active_cloning: true,
            active: true
        }, { _id: 1 }).lean();
        if (!farm)
            throw { error: 400, message: 'El farm no existe' };
        // query for get zones
        const zones = yield models_1.Zone.find({ farm: farm._id }, optionsZone).lean();
        yield Promise.all(zones.map((data) => __awaiter(void 0, void 0, void 0, function* () {
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
        }))).then((resp) => res.status(200).json(resp))
            .catch((err) => {
            res.status(400).json({ message: 'Error al obtener la data', error: 400 });
        });
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
        const idFarm = req.params.id;
        if (!idFarm)
            throw { message: 'El Id es requerido', error: 400 };
        // query
        const farmData = yield models_1.Farm.findOne({
            id_wiseconn: idFarm,
            active_cloning: true,
            active: true
        }, { _id: 1 }).lean();
        if (!farmData)
            throw { message: 'El Id suministrado no existe', error: 400 };
        const ArrayData = yield models_1.Measure.find({ farm: farmData._id }, {
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
        }).lean();
        yield Promise.all(ArrayData.map((data) => __awaiter(void 0, void 0, void 0, function* () {
            const zoneId = yield models_1.Zone.findOne({ _id: data.zone }, { id_wiseconn: 1, _id: 0 }).lean();
            return {
                id: data.id_wiseconn,
                farmId: idFarm,
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
        }))).then((resp) => res.status(200).json(resp))
            .catch((err) => {
            res.status(400).json({ message: 'Error al obtener la data', error: 400 });
        });
    }
    catch (err) {
        // response error
        next(err);
    }
});
exports.getMeasuresByFarm = getMeasuresByFarm;
//# sourceMappingURL=FarmController.js.map