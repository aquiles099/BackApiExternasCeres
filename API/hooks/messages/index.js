"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateZonesFarms = exports.Account = exports.AccountSettings = exports.Farm = exports.GraphZone = exports.Zone = exports.rol = exports.varMaster = exports.varSector = exports.MeasureData = exports.Measure = exports.User = void 0;
const User = (id, by) => {
    const name = 'usuario';
    const base = ` el ${name} con el id: ${id}`;
    return {
        getAll: 'todos los usuarios',
        create: 'Se a creado' + base,
        get: base,
        edit: 'Se a editado' + base,
        delete: 'Se a eliminado' + base,
        getBy: `todos los ${by}s Por el ${name} id:${id}`,
    };
};
exports.User = User;
const Measure = (id, by) => {
    const name = 'Measure';
    const base = ` el ${name} con el id: ${id}`;
    return {
        getAll: 'todos los ' + name,
        create: 'Se a creado' + base,
        get: base,
        getBy: `todos los ${name}s Por la ${by} ${id}`,
        edit: 'Se a editado' + base,
        delete: 'Se a eliminado' + base,
    };
};
exports.Measure = Measure;
const MeasureData = (id, by) => {
    const name = 'MeasureData';
    const base = ` el ${name} con el id: ${id}`;
    return {
        getAll: 'todos los ' + name,
        create: 'Se a creado' + base,
        get: base,
        getBy: `todos los ${name}s Por la ${by} ${id}`,
        edit: 'Se a editado' + base,
        delete: 'Se a eliminado' + base,
    };
};
exports.MeasureData = MeasureData;
const varSector = (id) => {
    const name = 'varSector';
    const base = ` el ${name}s con el id: ` + id;
    return {
        getAll: 'todos los ' + name,
        create: 'Se a creado' + base,
        get: base,
        getByZone: `todos los ${name}s Por la Zona ${id}`,
        getByMaster: `todos los ${name}s Por la varMaster ${id}`,
        edit: 'Se a editado' + base,
        delete: 'Se a eliminado' + base,
    };
};
exports.varSector = varSector;
const varMaster = (id) => {
    const name = 'varMaster';
    const base = ` el ${name}s con el id: ` + id;
    return {
        getAll: 'todos los ' + name,
        create: 'Se a creado' + base,
        get: base,
        edit: 'Se a editado' + base,
        delete: 'Se a eliminado' + base,
    };
};
exports.varMaster = varMaster;
const rol = (id, by) => {
    const name = 'Rol';
    const base = ` el ${name} con el id: ${id}`;
    return {
        getAll: 'todos los ' + name,
        create: 'Se a creado' + base,
        get: base,
        getBy: `todos los ${name}s Por la ${by} ${id}`,
        edit: 'Se a editado' + base,
        delete: 'Se a eliminado' + base,
    };
};
exports.rol = rol;
const Zone = (id, by) => {
    const name = 'Zone';
    const base = ` el ${name} con el id: ${id}`;
    return {
        getAll: 'todos los ' + name,
        create: 'Se a creado' + base,
        get: base,
        getBy: `todos los ${name}s Por la ${by} ${id}`,
        getPrmMinMax: `todos los ${name}s Por la ${by} ${id}`,
        edit: 'Se a editado' + base,
        delete: 'Se a eliminado' + base,
        deleteImg: 'Se a eliminado la imagen de' + base,
    };
};
exports.Zone = Zone;
const GraphZone = (id, by) => {
    const name = 'GraphZone';
    const base = ` el ${name} con el id: ${id}`;
    return {
        getAll: 'todos los ' + name,
        create: 'Se a creado' + base,
        get: base,
        getBy: `todos los ${name}s Por la ${by} ${id}`,
        getPrmMinMax: `todos los ${name}s Por la ${by} ${id}`,
        edit: 'Se a editado' + base,
        delete: 'Se a eliminado' + base,
        deleteImg: 'Se a eliminado la imagen de' + base,
    };
};
exports.GraphZone = GraphZone;
const Farm = (id, by) => {
    const name = 'Farm';
    const base = ` el ${name} con el id: ${id}`;
    return {
        getAll: 'todos los ' + name,
        create: 'Se a creado' + base,
        get: base,
        getBy: `todos los ${name}s Por la ${by} ${id}`,
        getPrmMinMax: `todos los ${by}s Por la ${name} ${id}`,
        edit: 'Se a editado' + base,
        delete: 'Se a eliminado' + base,
        deleteImg: 'Se a eliminado la imagen de' + base,
    };
};
exports.Farm = Farm;
const AccountSettings = (id, by) => {
    const name = 'AccountSettings';
    const base = ` el ${name} con el id: ${id}`;
    return {
        getAll: 'todos los ' + name,
        create: 'Se a creado' + base,
        get: base,
        getBy: `todos los ${name}s Por la ${by} ${id}`,
        getPrmMinMax: `todos los ${by}s Por la ${name} ${id}`,
        edit: 'Se a editado' + base,
        delete: 'Se a eliminado' + base,
        deleteImg: 'Se a eliminado la imagen de' + base,
    };
};
exports.AccountSettings = AccountSettings;
const Account = (id, by) => {
    const name = 'Account';
    const base = ` el ${name} con el id: ${id}`;
    return {
        getAll: 'todos los ' + name,
        create: 'Se a creado' + base,
        get: base,
        getBy: `todos los ${name}s Por la ${by} ${id}`,
        getPrmMinMax: `todos los ${by}s Por la ${name} ${id}`,
        edit: 'Se a editado' + base,
        delete: 'Se a eliminado' + base,
        deleteImg: 'Se a eliminado la imagen de' + base,
    };
};
exports.Account = Account;
const StateZonesFarms = (id, by) => {
    const name = 'StateZonesFarms';
    const base = ` el ${name} con el id: ${id}`;
    return {
        getAll: 'todos los ' + name,
        create: 'Se a creado' + base,
        get: base,
        getBy: `todos los ${name}s Por la ${by} ${id}`,
        getPrmMinMax: `todos los ${name}s Por la ${by} ${id}`,
        edit: 'Se a editado' + base,
        delete: 'Se a eliminado' + base,
        deleteImg: 'Se a eliminado la imagen de' + base,
    };
};
exports.StateZonesFarms = StateZonesFarms;
//# sourceMappingURL=index.js.map