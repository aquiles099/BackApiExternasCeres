import descript from './code';
// modules
import express, { Request, Response, NextFunction } from 'express';

import createBackLog from '../../Middleware/createBackLogs';

const err404 = (req: Request, res: Response, next: NextFunction) => {
	// create obj of the response
	const code_descript = descript[404];
	const message = 'WARNING 404 Sorry, the route not is valid.';
	const obj = { status: false, message, code: 404, code_descript, path: req.originalUrl, method: req.method };

	// to write response in the consol
	if (obj.message.length + obj.code_descript + obj.path.length < 80) console.table([obj]);
	else console.log(obj);

	createBackLog(req.originalUrl, 404, message, req);
	// response
	res.status(404).json(obj);
};

export default err404;
