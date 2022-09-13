"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const MeasureControllers_1 = require("../../controller/MeasureControllers");
router.route('/measures/:id/data').get(MeasureControllers_1.getMeasureDatasByMeasure);
exports.default = router;
//# sourceMappingURL=measures.routes.js.map