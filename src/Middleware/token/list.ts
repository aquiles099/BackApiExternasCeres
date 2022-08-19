import { prod } from '../../hooks/host';

export default !prod
	? [
		'farms',
		'zones',
		'measure'
	] : [
		'farms',
		'zones',
		'measure',
	];
