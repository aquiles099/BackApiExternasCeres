import { prod } from '../../hooks/host';

export default !prod
	? ['']
	: [
			'farms',
			'VarDerivateMaster',
			'VarDerivateSector',
			'VarDerivate',
			'zones',
			'measure',
			'AccountSettings',
			'grapthZone',
			'accounts',
			'roles',
	  ];
