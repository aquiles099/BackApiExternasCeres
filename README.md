![image info](./logo.png)

##

# API Ceres Externas

El objetivo de este proyecto es tener toda la lógica necesaria de la solución para interactuar con la base de datos NoSQL MongoDB. Además, cualquier regla de negocio debe estar en esta API.

## Versión

1.0.0
	
## Estructura del proyecto API Ceres Externas

El proyecto está desarrollado con nodejs (Express, Cors, TypeScript y Mongoose), y está dividido de la siguiente manera:

-   app: [app](./src/app)
-   configuración: [config](./src/config)
-   controladores: [controller](./src/controller)
-   db: [data](./src/db/data)
-   modelos: [models](./src/db/models/)
-   mensajes: [messages](./src/hooks/messages/)
-   seguridad: [middleware](./src/middleware/)
-   rutas: [routes](./src/routes/admin/)
	- farms.routes.js
	- zone.routes.js
	- measures.routes.js
-   servicios: [services](./src/services/)

## Instalación

Para iniciar el funcionamiento del proyecto api, hacemos lo siguiente:

1. Instalar la API

    ```
    cd api
    npm install ó npm i
    ```

2. Configurar puerto de conexión en ./src/app/API.ts 

    Ejemplo:

    ```
    app.set('port', process.env.PORT || <port>);
    ```

3. Iniciar la API

    ```
    npm run serve
    ```

##

# Endpoints

## /farms?keyApiAccess=

Método que obtiene todas los farms registrados en la plataforma.

#### Tipo

```
GET
```

#### Request

```
keyApiAccess
```

#### Response

```
{
	id,
	name,
	description,
	latitude,
	longitude,
	id_wiseconn,
	postalAddress,
	account: {
		id,
		name
	},
	timeZone,
	timeZoneName,
	webhook,
	metadata
}
```

## /farm/:id?keyApiAccess=

Método que obtiene un farm por su IdWiseconn.

#### Tipo

```
GET
```

#### Request

```
id,
keyApiAccess
```

#### Response

```
{
	id,
	name,
	description,
	latitude,
	longitude,
	id_wiseconn,
	postalAddress,
	account: {
		id,
		name
	},
	timeZone,
	timeZoneName,
	webhook,
	metadata
}
```

## /farm/:id/zones?keyApiAccess=

Método que obtiene todas las zones asociadas a un IdWiseconn farm.

#### Tipo

```
GET
```

#### Request

```
id,
keyApiAccess
```

#### Response

```
{
	id,
	id_wiseconn,
	name,
	description,
	latitude,
	longitude,
	type,
	farm,
	pump_system,
	kc,
	theoreticalFlow,
	unitTheoreticalFlow,
	efficiency,	
	humidity_retention,
	max,
	min,
	critical_point1,
	critical_point2,
	BFPressureId,
	AFPressureId,
	onlyMonitoring,
	area,
	areaUnit,
	metadata,
	allowPumpSelection,
	predefinedPumps,
	polygon: {
		path,
		bounds
	}
}
```

## /farm/:id/measures?keyApiAccess=

Método que obtiene todas las measures (sensores) asociadas a un IdWiseconn farm.

#### Tipo

```
GET
```

#### Request

```
id,
keyApiAccess
```

#### Response

```
[
    {
		id,
		farmId,
		zoneId,
		name,
		unit,
		lastData,
		lastDataDate,
		monitoringTime,
		sensorDepth,
		depthUnit,
		fieldCapacity,
		readilyAvailableMoisture,
		sensorType,
		nodeId,
		readType,
		soilMostureSensorType,
		createdAt,
		physicalConnection
	}
]
```

## /zones/:id/measures?keyApiAccess=

Método que obtiene todas las measures (sensores) asociadas a un IdWiseconn zone.

#### Tipo

```
GET
```

#### Request

```
id,
keyApiAccess
```

#### Response

```
[
    {
		id,
		id_wiseconn,
		farmId,
		zoneId,
		name,
		unit,
		lastData,
		lastDataDate,
		monitoringTime,
		sensorDepth,
		depthUnit,
		fieldCapacity,
		readilyAvailableMoisture,
		sensorType,
		nodeId,
		readType,
		soilMostureSensorType,
		createdAt,
		physicalConnection
	}
]
```

## /measures/:id/data?keyApiAccess=

Método que obtiene toda la data de un measure (sensor) por el IdWiseconn.

#### Tipo

```
GET
```

#### Request

```
id,
keyApiAccess
```

#### Response

```
[
    {
		time,
		value
	}
]
```

##