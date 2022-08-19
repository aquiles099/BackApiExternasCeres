import https from 'https';
import fs from 'fs';
import API from './app/API';
const prod = process.argv[0] === '/root/.nvm/versions/node/v14.15.0/bin/node';

if (prod) {
	API.listen(API.get('port'), () => {
		console.log('                                                                  ()_()');
		console.log(`app corriendo en el puerto http://localhost:${API.get('port')} leoM             (o.o)`);
		console.log('                                                                  (|_|)*');
	});

} else {
	API.listen(API.get('port'), () => {
		console.log('                                                                  ()_()');
		console.log(`app corriendo en el puerto http://localhost:${API.get('port')} leoM             (o.o)`);
		console.log('                                                                  (|_|)*');
	});
}
