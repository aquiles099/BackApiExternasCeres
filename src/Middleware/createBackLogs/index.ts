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
    const now: any = moment().format('YYYY-MM-DDTHH:mm:ss');
    const offset: any = moment().utc().format('YYYY-MM-DDTHH:mm:ss');
    const dateLog: any = moment().subtract(moment(offset).diff(now, 'hours'), 'h').format('YYYY-MM-DDTHH:mm:ss');

    backLog.api = api;
    backLog.logDate = dateLog.toString();
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