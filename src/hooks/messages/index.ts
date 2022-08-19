export const User = (id?: number | string | undefined, by?: string) => {
	const name: string = 'usuario';
	const base: string = ` el ${name} con el id: ${id}`;
	return {
		getAll: 'todos los usuarios',
		create: 'Se a creado' + base,
		get: base,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
		getBy: `todos los ${by}s Por el ${name} id:${id}`,
	};
};

export const Measure = (id?: number | string | undefined, by?: string | undefined) => {
	const name: string = 'Measure';
	const base: string = ` el ${name} con el id: ${id}`;
	return {
		getAll: 'todos los ' + name,
		create: 'Se a creado' + base,
		get: base,
		getBy: `todos los ${name}s Por la ${by} ${id}`,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
	};
};

export const MeasureData = (id?: number | string | undefined, by?: string | undefined) => {
	const name: string = 'MeasureData';
	const base: string = ` el ${name} con el id: ${id}`;
	return {
		getAll: 'todos los ' + name,
		create: 'Se a creado' + base,
		get: base,
		getBy: `todos los ${name}s Por la ${by} ${id}`,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
	};
};

export const varSector = (id?: number | string | undefined) => {
	const name: string = 'varSector';
	const base: string = ` el ${name}s con el id: ` + id;
	return {
		getAll: 'todos los ' + name,
		create: 'Se a creado' + base,
		get: base,
		getByZone: `todos los ${name}s Por la Zona ${id}`,
		getByMaster: `todos los ${name}s Por la varMaster ${id}`,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
	};
};

export const varMaster = (id?: number | string | undefined) => {
	const name: string = 'varMaster';
	const base: string = ` el ${name}s con el id: ` + id;
	return {
		getAll: 'todos los ' + name,
		create: 'Se a creado' + base,
		get: base,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
	};
};

export const rol = (id?: number | string | undefined, by?: string) => {
	const name: string = 'Rol';
	const base: string = ` el ${name} con el id: ${id}`;
	return {
		getAll: 'todos los ' + name,
		create: 'Se a creado' + base,
		get: base,
		getBy: `todos los ${name}s Por la ${by} ${id}`,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
	};
};

export const Zone = (id?: number | string | undefined, by?: string) => {
	const name: string = 'Zone';
	const base: string = ` el ${name} con el id: ${id}`;
	return {
		getAll: 'todos los ' + name,
		create: 'Se a creado' + base,
		get: base,
		getBy: `todos los ${name}s Por la ${by} ${id}`,
		getPrmMinMax: `todos los ${name}s Por la ${by} ${id}`,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
		deleteImg: 'Se a eliminado la imagen de' + base,
	};
};

export const GraphZone = (id?: number | string | undefined, by?: string) => {
	const name: string = 'GraphZone';
	const base: string = ` el ${name} con el id: ${id}`;
	return {
		getAll: 'todos los ' + name,
		create: 'Se a creado' + base,
		get: base,
		getBy: `todos los ${name}s Por la ${by} ${id}`,
		getPrmMinMax: `todos los ${name}s Por la ${by} ${id}`,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
		deleteImg: 'Se a eliminado la imagen de' + base,
	};
};

export const Farm = (id?: number | string | undefined, by?: string) => {
	const name: string = 'Farm';
	const base: string = ` el ${name} con el id: ${id}`;
	return {
		getAll: 'todos los ' + name,
		create: 'Se a creado' + base,
		get: base,
		getBy: `todos los ${name}s Por la ${by} ${id}`,
		getPrmMinMax: `todos los ${by}s Por la ${name} ${id}`,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
		deleteImg: 'Se a eliminado la imagen de' + base,
	};
};

export const AccountSettings = (id?: number | string | undefined, by?: string) => {
	const name: string = 'AccountSettings';
	const base: string = ` el ${name} con el id: ${id}`;
	return {
		getAll: 'todos los ' + name,
		create: 'Se a creado' + base,
		get: base,
		getBy: `todos los ${name}s Por la ${by} ${id}`,
		getPrmMinMax: `todos los ${by}s Por la ${name} ${id}`,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
		deleteImg: 'Se a eliminado la imagen de' + base,
	};
};

export const Account = (id?: number | string | undefined, by?: string) => {
	const name: string = 'Account';
	const base: string = ` el ${name} con el id: ${id}`;
	return {
		getAll: 'todos los ' + name,
		create: 'Se a creado' + base,
		get: base,
		getBy: `todos los ${name}s Por la ${by} ${id}`,
		getPrmMinMax: `todos los ${by}s Por la ${name} ${id}`,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
		deleteImg: 'Se a eliminado la imagen de' + base,
	};
};

export const StateZonesFarms = (id?: number | string | undefined, by?: string) => {
	const name: string = 'StateZonesFarms';
	const base: string = ` el ${name} con el id: ${id}`;
	return {
		getAll: 'todos los ' + name,
		create: 'Se a creado' + base,
		get: base,
		getBy: `todos los ${name}s Por la ${by} ${id}`,
		getPrmMinMax: `todos los ${name}s Por la ${by} ${id}`,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
		deleteImg: 'Se a eliminado la imagen de' + base,
	};
};
