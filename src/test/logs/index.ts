// import logzio and config
import { ILoggerOptions, ILogzioLogger, createLogger } from 'logzio-nodejs';

// define objerto de configuracion a logz.io
const config: ILoggerOptions = {
	token: 'zyMMTFhVZlVcKdqLWtcZHzUwfmPEwpKl',
	protocol: 'https',
	host: 'listener.logz.io',
	port: '8071',
	type: 'json',
};

// create logz.io logger
const logger: ILogzioLogger = createLogger(config);

export default logger;
