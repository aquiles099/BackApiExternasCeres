import { BackLogExternos } from '../../db/models';
import { Request } from 'express';

import moment from 'moment';


const backLog = {
	api: '',
	logDate: '',
	request: {},
	response: {},
	app: 'externa',
	statusCode: ''
};

export default async (api: any, code: any, message: any, req: Request) => {

    const today: string = moment().tz('America/Santiago').format('YYYY-MM-DDTHH:mm:ss').toString();

    backLog.api = api;
    backLog.logDate = today;
    backLog.statusCode = code.toString();
    backLog.response = code == 500 ? message : {code, message};
    backLog.request = {
        query: req.query,
        params: req.params,
        body: req.body
    };

    await BackLogExternos.create(backLog);

    return true;
}