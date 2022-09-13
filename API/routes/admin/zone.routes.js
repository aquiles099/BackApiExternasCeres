"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const ZoneController_1 = require("../../controller/ZoneController");
router.route('/zones/:id/measures').get(ZoneController_1.getMeasuresByZone);
exports.default = router;
//# sourceMappingURL=zone.routes.js.map