import * as Intf from '../interfaces';
import { Measure, MeasureData, Farm } from '../models/index';

export default async () => {
	await Farm.updateMany({ active: true });
};
