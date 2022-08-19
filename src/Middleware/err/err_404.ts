import descript from './code';
// modules
import express, { Request, Response, NextFunction } from 'express';

const err404 = (req: Request, res: Response, next: NextFunction) => {
	// create obj of the response
	const code_descript = descript[404];
	const message = 'Sorry the route no is valid  404';
	const obj = { status: false, message, code: 404, code_descript, path: req.originalUrl, method: req.method };

	// to write response in the consol
	if (obj.message.length + obj.code_descript + obj.path.length < 80) console.table([obj]);
	else console.log(obj);

	// response
	res.status(404).json(obj);
};

export default err404;
