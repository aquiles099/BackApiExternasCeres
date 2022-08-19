/**
 * este middleware proccesa los cors para
 * para limitar a que dominios tienen o no acceso
 */

import cors, { CorsOptions } from 'cors';

const white_list: Array<string> = [''];

const origin: any = (origin: string, cb: any) => (white_list.includes(origin) ? cb(null, true) : cb(null, true));

const corsOptions: CorsOptions = {
	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
	origin,
};

export default cors(corsOptions);
