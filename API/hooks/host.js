"use strict";
/**
 * este hook detecta si el proyecto esta en produccion
 * o desarrollo y te retorna un host seguan cual estas usando
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.url_web = exports.host = exports.prod = void 0;
exports.prod = process.argv[0] === '/root/.nvm/versions/node/v14.15.0/bin/node';
exports.host = exports.prod ? 'https://api.node.devceres.cloud:5000/' : 'http://localhost:5000/';
exports.url_web = exports.prod ? 'https://www.ceres-cdtec.cl/#/' : 'http://localhost:4200/#/';
//# sourceMappingURL=host.js.map