import mongoose from 'mongoose';
import { Measure, MeasureData, User, Zone } from './models';
// import preData from './data';
const name: string = 'farms_db';
// const name: string = 'dev-space';
const URI = `mongodb+srv://db-farms-clone-api:U8RZMnwNgS77oZzk@cluster1.3ex2j.mongodb.net/${name}?retryWrites=true&w=majority`;

(async () => {
	try {
		const config = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
		await mongoose.connect(URI, config);

		// const test: any[] = await Zone.updateOne({ id_wiseconn: '8036' }, { pp_equipo: 1.33 });
		// console.log('test');
		// console.log(test);

		// preData();
		// const zones: any[] = await Zone.find({ graph1_url: { $nin: [null] } }, '_id');
		// const ids: string[] = zones.map((z: any) => z._id);
		// const measures: any[] = await Measure.find({
		// 	zone: { $in: ids },
		// 	$or: [{ name: 'Irrigation Precipitation' }, { sensorType: 'KC aplicada' }],
		// });

		// console.log(measures);

		console.log('db is connected');
	} catch (err) {
		console.error(err);
	}
})();
