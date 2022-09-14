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
exports.getMeasuresByZone = void 0;
const models_1 = require("../db/models");
const mongoose = require('mongoose');
// obtain measures for Zone by idwiseconn
const getMeasuresByZone = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // define vars
        const zoneId = req.params.id;
        // query
        const zoneData = yield models_1.Zone.findOne({ id_wiseconn: zoneId }, { '_id': 1 }).lean();
        if (!zoneData)
            throw { message: 'El id_wiseconn no existe', error: 400 };
        const ArrayData = yield models_1.Measure.find({ zone: zoneData._id }).lean();
        yield Promise.all(ArrayData.map((data) => __awaiter(void 0, void 0, void 0, function* () {
            const { id_wiseconn, lastData, lastDataDate, depthUnit, sensorDepth, sensorType, createdAt, soilMostureSensorType, monitoringTime, name, unit, brand } = data;
            const physical_connection = yield models_1.PhysicalConnection.findOne({ measure: data._id }, {
                _id: 0,
                expansionPort: 1,
                expansionBoard: 1,
                nodePort: 1
            }).lean();
            const farmId = yield models_1.Farm.findOne({ _id: data.farm }, { id_wiseconn: 1, _id: 0 }).lean();
            return {
                id: id_wiseconn,
                farmId: farmId.id_wiseconn,
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
exports.getMeasuresByZone = getMeasuresByZone;
//# sourceMappingURL=ZoneController.js.map