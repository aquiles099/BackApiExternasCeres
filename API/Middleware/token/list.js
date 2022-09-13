"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const host_1 = require("../../hooks/host");
exports.default = !host_1.prod
    ? [
        'farms',
        'zones',
        'measure'
    ] : [
    'farms',
    'zones',
    'measure',
];
//# sourceMappingURL=list.js.map