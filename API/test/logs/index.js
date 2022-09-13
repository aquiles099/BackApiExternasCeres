"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import logzio and config
const logzio_nodejs_1 = require("logzio-nodejs");
// define objerto de configuracion a logz.io
const config = {
    token: 'zyMMTFhVZlVcKdqLWtcZHzUwfmPEwpKl',
    protocol: 'https',
    host: 'listener.logz.io',
    port: '8071',
    type: 'json',
};
// create logz.io logger
const logger = (0, logzio_nodejs_1.createLogger)(config);
exports.default = logger;
//# sourceMappingURL=index.js.map