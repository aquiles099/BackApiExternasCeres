import { model } from 'mongoose';

// colections
import farm from './farm';
import measure from './measure';
import measuredata from './measure-data';
import zone from './zone';
import evento from './evento';
import accounts from './accounts';
import node from './node';
import physicalConnection from './physical-connection';
import varDerivateMaster from './var-derivate-master';
import varDerivateSector from './var-derivate-by-sector';
import graphMaster from './graph-master';
import graphZone from './graph-zone';
import realIrrigations from './realIrrigations';
import irrimax from './irrimax';
import promMinMax from './promMinMax';
import user from './user';
import rol from './rol';
import accountSettings from './accountSettings';
import cloneprocess from './cloneprocess';
import stateszonesfarms from './stateszonesfarms';
import keyapiaccess from './keyapiaccess';
import backlogsexternos from './backlogsexternos';

/** init models */
export const Farm = model('Farm', farm);
//
export const Measure = model('Measure', measure);
//
export const MeasureData = model('MeasureData', measuredata);
//
export const Zone = model('Zone', zone);
//
export const Evento = model('Evento', evento);
//
export const Accounts = model('Accounts', accounts);
//
export const Node = model('Node', node);
//
export const PhysicalConnection = model('PhysicalConnection', physicalConnection);
//
export const VarDerivateMaster = model('VarDerivateMaster', varDerivateMaster);
//
export const VarDerivateSector = model('VarDerivateSector', varDerivateSector);
//
export const GraphMaster = model('GraphMaster', graphMaster);
//
export const GraphZone = model('GraphZone', graphZone);
//
export const User = model('User', user);
//
export const Rol = model('Rol', rol);
//
export const RealIrrigations = model('RealIrrigations', realIrrigations);
//
export const AccountSettings = model('AccountSettings', accountSettings);
//
export const EstanqueIrrimax = model('EstanqueIrrimax', irrimax);
//
export const PromMinMax = model('PromMinMax', promMinMax);
//
export const CloneProcess = model('CloneProcess', cloneprocess);
//
export const StatesZonesFarms = model('StatesZonesFarms', stateszonesfarms);
//
export const KeyApiAccess = model('KeyApiAccess', keyapiaccess);
//
export const BackLogExternos = model('BackLogExternos', backlogsexternos);