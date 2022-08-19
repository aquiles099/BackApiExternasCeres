import mongoose from 'mongoose';
const name: string = 'farms_db';
const URI = `mongodb+srv://db-farms-clone-api:U8RZMnwNgS77oZzk@cluster1.3ex2j.mongodb.net/${name}?retryWrites=true&w=majority`;

(async () => {
	try {
		const config = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
		await mongoose.connect(URI, config);
		console.log('db is connected');
	} catch (err) {
		console.error(err);
	}
})();
