import descript from './code';
// modules
import { Request, Response, NextFunction } from 'express';
import logger from '../../test/logs/index';

import createBackLog from '../../Middleware/createBackLogs';

interface objError {
	status: boolean | string;
	message: string;
	code: number;
	code_descript: string;
	path: string;
	method: string;
}

/**
 * este middleware se dedica a cashar y formatear los errores
 * @param err
 * @param req
 * @param res
 * @param next
 */
const Error = (err: any, req: Request, res: Response, next: NextFunction) => {
	if (!err) next();
	// define vars
	const code: number = err.code ? err.code : err.response ? err.response.status : 500;
	const message: string = '❌ ' + (err.response ? err.response : err.message ? err.message : err);
	const code_descript: string = descript[code] ? descript[code] : `code:${code}`;

	// create obj for response
	const obj: objError = { status: false, message, code, code_descript, path: req.originalUrl, method: req.method };

	// to write response in the consol
	const length: number = obj.message.length + obj.code_descript.length + obj.path.length;
	if (length < 80) console.table([obj]);
	else console.log(obj);

	if (err.logger) logger.log(obj);

	createBackLog(req.originalUrl, code, message, req);
	// response
	res.status(code).json(obj);
};

export default Error;
