import https from 'https';
import fs from 'fs';
import API from './app/API';
import logger from './logger.js';

const prod = process.argv[0] === '/root/.nvm/versions/node/v14.15.0/bin/node';


if (prod) {
	const options = {
		key: fs.readFileSync('/etc/letsencrypt/live/externo.devceres.cloud/privkey.pem', 'utf8'),
		cert: fs.readFileSync('/etc/letsencrypt/live/externo.devceres.cloud/cert.pem', 'utf8'),
	};

	https.createServer(options, API).listen(API.get('port'), () => {
		console.log('                                                                  ()_()');
		console.log(`app corriendo en el puerto http://localhost:${API.get('port')}    (o.o)`);
		console.log('                                                                  (|_|)*');
	});

} else {
	API.listen(API.get('port'), () => {
		logger.info('Server running on port %d', API.get('port'));
		console.log('                                                                  ()_()');
		console.log(`Server running on http://localhost:${API.get('port')}             (o.o)`);
		console.log('                                                                  (|_|)*');
	});
}
