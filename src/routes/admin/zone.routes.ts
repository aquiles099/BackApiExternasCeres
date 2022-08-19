import { Router } from 'express';
const router: Router = Router();
import {
	getZoneByIdWise,
	getMeasuresByZone,
	getAllZone,
	getZoneById,
	getMeasuresByZoneById,
} from '../../controller/ZoneController';

router.route('/zones').get(getAllZone);
router.route('/zone/:id').get(getZoneByIdWise);
router.route('/zone/:id/measures').get(getMeasuresByZone);
router.route('/zonebyid/:id/measures').get(getMeasuresByZoneById);
router.route('/zonebyid/:id').get(getZoneById);

export default router;
