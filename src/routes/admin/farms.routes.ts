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
router.route('/farm/:id').get(getFarmById);
router.route('/farm/:id/zones').get(getZonesByIdFarm);
router.route('/farm/:id/measures').get(getMeasuresByFarm);

export default router;
