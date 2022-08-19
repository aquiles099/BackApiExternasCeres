/**
 * este hook detecta si el proyecto esta en produccion
 * o desarrollo y te retorna un host seguan cual estas usando
 */

export const prod = process.argv[0] === '/root/.nvm/versions/node/v14.15.0/bin/node';

export const host = prod ? 'https://api.node.devceres.cloud:5000/' : 'http://localhost:5000/';

export const url_web = prod ? 'https://www.ceres-cdtec.cl/#/' : 'http://localhost:4200/#/';

