"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// modules
const express_1 = require("express");
const router = (0, express_1.Router)();
// controllers
const FarmController_1 = require("../../controller/FarmController");
router.route('/farms').get(FarmController_1.getFarms);
router.route('/farm/:id').get(FarmController_1.getFarmById);
router.route('/farm/:id/zones').get(FarmController_1.getZonesByIdFarm);
router.route('/farm/:id/measures').get(FarmController_1.getMeasuresByFarm);
exports.default = router;
//# sourceMappingURL=farms.routes.js.map