// modules
import { Router } from 'express';
const router: Router = Router();

// controllers
import {
	getFarms,
	getFarmById,
	getZonesByIdFarm,
	getMeasuresByFarm,
} from '../../controller/FarmController'  ;

router.route('/farms').get(getFarms);
router.route('/farms/:id').get(getFarmById);
router.route('/farms/:id/zones').get(getZonesByIdFarm);
router.route('/farms/:id/measures').get(getMeasuresByFarm);

export default router;
