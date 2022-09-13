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
exports.getMeasuresByZone = void 0;
const models_1 = require("../db/models");
const Msg = __importStar(require("../hooks/messages"));
// obtain measures for Zone by idwiseconn
const getMeasuresByZone = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // define vars
        const id = req.params.id;
        // query
        const zoneData = yield models_1.Zone.findOne({ 'id_wiseconn': id }, { '_id': 1, 'id_wiseconn': 1 });
        if (!zoneData)
            throw { message: 'El id suministrado no existe en la DB', code: 400 };
        const ArrayData = yield models_1.Measure.find({ zone: zoneData._id });
        const resp = ArrayData.map((data, i) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, id_wiseconn, node, lastData, lastDataDate, depthUnit, sensorDepth, sensorType, createdAt, soilMostureSensorType, monitoringTime, farm, name, unit, brand } = data;
            const physical_connection = yield models_1.PhysicalConnection.findById(data.physical_connection, {
                _id: 0,
                expansionPort: 1,
                expansionBoard: 1,
                nodePort: 1
            });
            const obj = {
                id: data.id,
                id_wiseconn: data.id_wiseconn,
                farmId: farm,
                zoneId: zoneData._id,
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
                readType: 'direct',
                soilMostureSensorType,
                brand,
                createdAt,
                physicalConnection: physical_connection,
            };
            return obj;
        }));
        const info = yield Promise.all(resp);
        // response
        res.status(200).json({
            status: true,
            message: Msg.Farm(zoneData._id, 'Measures').getBy,
            data: info,
        });
    }
    catch (err) {
        // console view errr
        console.log('error');
        // response error
        next(err);
    }
});
exports.getMeasuresByZone = getMeasuresByZone;
//# sourceMappingURL=ZoneController.js.map