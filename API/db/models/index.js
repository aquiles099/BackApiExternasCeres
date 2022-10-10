"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackLogExternos = exports.KeyApiAccess = exports.StatesZonesFarms = exports.CloneProcess = exports.PromMinMax = exports.EstanqueIrrimax = exports.AccountSettings = exports.RealIrrigations = exports.Rol = exports.User = exports.GraphZone = exports.GraphMaster = exports.VarDerivateSector = exports.VarDerivateMaster = exports.PhysicalConnection = exports.Node = exports.Accounts = exports.Evento = exports.Zone = exports.MeasureData = exports.Measure = exports.Farm = void 0;
const mongoose_1 = require("mongoose");
// colections
const farm_1 = __importDefault(require("./farm"));
const measure_1 = __importDefault(require("./measure"));
const measure_data_1 = __importDefault(require("./measure-data"));
const zone_1 = __importDefault(require("./zone"));
const evento_1 = __importDefault(require("./evento"));
const accounts_1 = __importDefault(require("./accounts"));
const node_1 = __importDefault(require("./node"));
const physical_connection_1 = __importDefault(require("./physical-connection"));
const var_derivate_master_1 = __importDefault(require("./var-derivate-master"));
const var_derivate_by_sector_1 = __importDefault(require("./var-derivate-by-sector"));
const graph_master_1 = __importDefault(require("./graph-master"));
const graph_zone_1 = __importDefault(require("./graph-zone"));
const realIrrigations_1 = __importDefault(require("./realIrrigations"));
const irrimax_1 = __importDefault(require("./irrimax"));
const promMinMax_1 = __importDefault(require("./promMinMax"));
const user_1 = __importDefault(require("./user"));
const rol_1 = __importDefault(require("./rol"));
const accountSettings_1 = __importDefault(require("./accountSettings"));
const cloneprocess_1 = __importDefault(require("./cloneprocess"));
const stateszonesfarms_1 = __importDefault(require("./stateszonesfarms"));
const keyapiaccess_1 = __importDefault(require("./keyapiaccess"));
const backlogsexternos_1 = __importDefault(require("./backlogsexternos"));
/** init models */
exports.Farm = (0, mongoose_1.model)('Farm', farm_1.default);
//
exports.Measure = (0, mongoose_1.model)('Measure', measure_1.default);
//
exports.MeasureData = (0, mongoose_1.model)('MeasureData', measure_data_1.default);
//
exports.Zone = (0, mongoose_1.model)('Zone', zone_1.default);
//
exports.Evento = (0, mongoose_1.model)('Evento', evento_1.default);
//
exports.Accounts = (0, mongoose_1.model)('Accounts', accounts_1.default);
//
exports.Node = (0, mongoose_1.model)('Node', node_1.default);
//
exports.PhysicalConnection = (0, mongoose_1.model)('PhysicalConnection', physical_connection_1.default);
//
exports.VarDerivateMaster = (0, mongoose_1.model)('VarDerivateMaster', var_derivate_master_1.default);
//
exports.VarDerivateSector = (0, mongoose_1.model)('VarDerivateSector', var_derivate_by_sector_1.default);
//
exports.GraphMaster = (0, mongoose_1.model)('GraphMaster', graph_master_1.default);
//
exports.GraphZone = (0, mongoose_1.model)('GraphZone', graph_zone_1.default);
//
exports.User = (0, mongoose_1.model)('User', user_1.default);
//
exports.Rol = (0, mongoose_1.model)('Rol', rol_1.default);
//
exports.RealIrrigations = (0, mongoose_1.model)('RealIrrigations', realIrrigations_1.default);
//
exports.AccountSettings = (0, mongoose_1.model)('AccountSettings', accountSettings_1.default);
//
exports.EstanqueIrrimax = (0, mongoose_1.model)('EstanqueIrrimax', irrimax_1.default);
//
exports.PromMinMax = (0, mongoose_1.model)('PromMinMax', promMinMax_1.default);
//
exports.CloneProcess = (0, mongoose_1.model)('CloneProcess', cloneprocess_1.default);
//
exports.StatesZonesFarms = (0, mongoose_1.model)('StatesZonesFarms', stateszonesfarms_1.default);
//
exports.KeyApiAccess = (0, mongoose_1.model)('KeyApiAccess', keyapiaccess_1.default);
//
exports.BackLogExternos = (0, mongoose_1.model)('BackLogExternos', backlogsexternos_1.default);
//# sourceMappingURL=index.js.map