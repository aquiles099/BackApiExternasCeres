import { Router } from 'express';
const router: Router = Router();
import {
	getMeasuresByZone,
} from '../../controller/ZoneController';

router.route('/zones/:id/measures').get(getMeasuresByZone);

export default router;
