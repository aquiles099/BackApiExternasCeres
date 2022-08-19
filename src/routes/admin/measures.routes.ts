import { Router } from 'express';
const router: Router = Router();
import {
	getMeasureDatasByMeasure
} from '../../controller/MeasureControllers';

router.route('/measures/:id/data').get(getMeasureDatasByMeasure);

export default router;
