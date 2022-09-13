"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../db/models");
const node_cron_1 = __importDefault(require("node-cron"));
const moment_1 = __importDefault(require("moment"));
const axios_1 = __importDefault(require("axios"));
const index_1 = require("../index");
const host_1 = require("../../hooks/host");
const html_pdf_1 = __importDefault(require("html-pdf"));
const path_1 = __importDefault(require("path"));
const URL_API = 'https://api.node.devceres.cloud:1500';
//Se declaran las variables que seran usadas para los minutos.
let $1440 = 0;
let $720 = 0;
let $360 = 0;
let $180 = 0;
let $120 = 0;
let $60 = 0;
let $45 = 0;
let $30 = 0;
let $15 = 0;
//Actualiza la la alerta en la zona
const edit_Date = (zones, $time) => __awaiter(void 0, void 0, void 0, function* () {
    const edit_date = zones.map((zone) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_wiseconn } = zone;
        const alertas = zone.alertas;
        /***
         * Se recorre las alerta y se actualiza la q cumpla la condición.
         */
        const options = { 'new': true, 'safe': true, 'upsert': true };
        for (const alerta of alertas) {
            if (alerta.out_range == $time) {
                alerta.last_mail_send_date = (0, moment_1.default)().format();
                const condition = {
                    id_wiseconn: id_wiseconn,
                    alertas: {
                        $elemMatch: { '_id': String(alerta._id) }
                    }
                };
                const update = {
                    $set: {
                        'alertas.$.emails': alerta.emails,
                        'alertas.$.enabled': alerta.enabled,
                        'alertas.$.hour': alerta.hour,
                        'alertas.$.out_range': alerta.out_range,
                        'alertas.$.min_value': alerta.min_value,
                        'alertas.$.max_value': alerta.max_value,
                        'alertas.$.main': alerta.main,
                        'alertas.$.id_measure': alerta.id_measure,
                        'alertas.$.last_mail_send_date': alerta.last_mail_send_date
                    }
                };
                yield models_1.Zone.findOneAndUpdate(condition, update, options);
            }
        }
        /*	.filter((alerta: any) => alerta.out_range == $time)
            .map((alerta: any) => {
                alerta.last_mail_send_date = moment().format();

                return alerta;
            });
        const alertas = alertass[0] */
        /* if (alertass.length != 0) {
            await Zone.updateOne({ id_wiseconn }, { alertas });
        } */
    }));
    yield Promise.all(edit_date);
});
// ? esta funcion procesa el contenido de los correos
const querys = ($time, alerts, zones) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log(zones);
        const $data = alerts.filter((alerta) => alerta.out_range === $time);
        //console.log($data);
        const array = $data.map((alerta) => __awaiter(void 0, void 0, void 0, function* () {
            const zone = yield models_1.Zone.findOne({ _id: alerta.zone });
            let zonaRecorrido = zone.types;
            let id_wiseconn = zone.id_wiseconn;
            const farm = yield models_1.Farm.findOne({ _id: zone.farm });
            const cuentas = farm.account;
            try {
                //Recorre lo types de la zone.
                console.log(alerta);
                //Valida si la zona pertenece al sensor indicado.
                if (zonaRecorrido[0] === 'Soil' || zonaRecorrido[0] === 'Irrigation' || zonaRecorrido[1] === 'Soil' || zonaRecorrido[1] === 'Irrigation') {
                    const { url } = alerta;
                    const resp = yield axios_1.default.post('https://api.ceres-cdtec.cl/api/irrimax/query', { url });
                    const API_resp = resp.data.data;
                    const split = API_resp.split(',');
                    let campo = farm.name;
                    let cuenta = cuentas.name;
                    let urlMail = host_1.url_web + 'soil-moisture/' + zone.id_wiseconn;
                    split[0] < split[3]
                        ? yield index_1.mail.alertas(Object.assign(Object.assign({}, alerta), { API_resp, campo, cuenta, urlMail }))
                        : split[0] > split[1]
                            ? yield index_1.mail.alertas(Object.assign(Object.assign({}, alerta), { API_resp, campo, cuenta, urlMail }))
                            : 'sin criterios';
                    //return alerta;
                }
                for (const value of zonaRecorrido) {
                    if (value === 'Weather') {
                        const { max_value, min_value } = alerta;
                        const measure = yield models_1.Measure.findOne({ sensorType: 'Temperature', zone: alerta.zone });
                        if (measure !== null) {
                            if (!(min_value < measure.lastData) && !(max_value > measure.lastData))
                                throw '';
                            yield index_1.mail.alertasClima(Object.assign(Object.assign({}, alerta), { max_value, min_value, measure }));
                            //return alerta;
                        }
                    }
                }
                //	let data:any = []
                //	let dataTable:any = []
                //	await getPdfByZone(alerta.emails[0], id_wiseconn, data, dataTable);
                return alerta;
            }
            catch (err) {
                return false;
            }
        }));
        if ($data.length !== 0) {
            yield Promise.all(array);
            edit_Date(zones, $time);
        }
    }
    catch (err) {
        console.log(err);
    }
});
// ? activa los crons cada 5 minutos
node_cron_1.default.schedule('*/5 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    $15 = $15 + 5;
    $30 = $30 + 5;
    $60 = $60 + 5;
    $45 = $45 + 5;
    $1440 = $1440 + 5;
    $720 = $720 + 5;
    $360 = $360 + 5;
    $180 = $180 + 5;
    $120 = $120 + 5;
    const zones = yield models_1.Zone.find({ alertas: { $exists: true } });
    const alerts = zones
        .map((zone) => {
        const { _id, image_url_irrimax, alertas, name, graph1_url } = zone;
        const resp = alertas.map((alerta) => (Object.assign(Object.assign({}, alerta._doc), { zone: _id, url: image_url_irrimax, urlImagen: graph1_url, name })));
        return resp;
    })
        .reduce((data, resp) => data.concat(resp))
        .filter((alerta) => alerta.enabled === 'true');
    yield querys('5 minutos', alerts, zones);
    if ($15 == 15)
        yield querys('15 minutos', alerts, zones);
    if ($30 == 30)
        yield querys('30 minutos', alerts, zones);
    if ($45 == 45)
        yield querys('45 minutos', alerts, zones);
    if ($60 == 60)
        yield querys('1 hora', alerts, zones);
    if ($120 == 120)
        yield querys('2 horas', alerts, zones);
    if ($180 == 180)
        yield querys('3 horas', alerts, zones);
    if ($360 == 360)
        yield querys('6 horas', alerts, zones);
    if ($720 == 720)
        yield querys('12 horas', alerts, zones);
    if ($1440 == 1440)
        yield querys('24 horas', alerts, zones);
    if ($1440 == 1440)
        $1440 = 0;
    if ($720 == 720)
        $720 = 0;
    if ($360 == 360)
        $360 = 0;
    if ($180 == 180)
        $180 = 0;
    if ($120 == 120)
        $120 = 0;
    if ($60 == 60)
        $60 = 0;
    if ($45 == 45)
        $45 = 0;
    if ($30 == 30)
        $30 = 0;
    if ($15 == 15)
        $15 = 0;
}));
function getPdfByZone(email, idwisconn, data, dataTable) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const emails = email;
            const { tecnica, adminTecnica, operation, sobreRiego, caudalDeficiario, bienEjecutado, pp_equipo, dataTitulo } = data;
            const id = idwisconn;
            const tablaDinamica = dataTable;
            console.log(id);
            console.log(emails);
            if (!id)
                throw { message: 'el id de la zona es requerido', code: 400 };
            // ? validar y traer la data de la zona de la db
            const zone = yield models_1.Zone.findOne({ id_wiseconn: id });
            if (!zone)
                throw { message: 'no existe la zona', code: 400 };
            const { graph1_url, image_url_irrimax, farm, _id, cultivo } = zone;
            //	const measures: any[] = await Measure.find({ zone: zone._id, sensorType: "Soil Moisture" });
            // ? validamos y procesamos la fecha
            // const { initTime, endTime }: any = req.query;
            const initTimePDF = (0, moment_1.default)()
                .tz('America/Santiago').subtract(15, 'd')
                .format('YYYY-MM-DD');
            const initTimeEvent = (0, moment_1.default)().subtract(15, 'd')
                .tz('America/Santiago')
                .format('YYYY-MM-DD');
            const endTimeEvent = (0, moment_1.default)().subtract(1, 'd').tz('America/Santiago').format('YYYY-MM-DD');
            const initTime = (0, moment_1.default)()
                .tz('America/Santiago')
                .subtract(15, 'd')
                .format('YYYY-MM-DD');
            const endTime = (0, moment_1.default)().subtract(1, 'd').tz('America/Santiago').add(1, 'd').format('YYYY-MM-DD');
            const endTimeEstanque = (0, moment_1.default)().tz('America/Santiago').format('YYYY-MM-DD');
            const validTime = (() => {
                const init = new Date((0, moment_1.default)(initTime).add(18, 'd').format('YYYY-MM-DD')).valueOf();
                const end = new Date((0, moment_1.default)(endTime).format('YYYY-MM-DD')).valueOf();
                return init > end;
            })();
            if (!initTime || !endTime || !validTime) {
                throw {
                    message: 'se requiere una fecha de inicio y una de fin, con separacion no mayor 14 dias',
                    code: 400,
                };
            }
            const urlGraph = graph1_url +
                '&from=' +
                (0, moment_1.default)(initTime).add(1, 'd').format('YYYYMMDD') +
                '000000' +
                '&to=' +
                (0, moment_1.default)(endTime).subtract(1, 'd').format('YYYYMMDD') +
                '235900';
            const fecha = {
                $gt: new Date(initTime),
                $lt: new Date(endTime),
            };
            const varSector = yield getProMeasureSumaHumedad(_id, fecha);
            if (!varSector) {
                throw {
                    message: 'Por favor cree el sensor Suma de humedades para poder generar el informe',
                    code: 400,
                };
            }
            const dataZoneMax = varSector.map((zone) => {
                return Object.assign(Object.assign({}, zone._doc), { day: zone.time });
            });
            const resultMax = [];
            dataZoneMax.reduce(function (res, value, val) {
                if (!res[value.time]) {
                    res[value.time] = { time: value.time, value: 0 };
                    resultMax.push(res[value.time]);
                }
                res[value.time].value += value.value;
                return res;
            }, {});
            resultMax.sort(function (a, b) {
                if (a.time > b.time) {
                    return 1;
                }
                if (a.time < b.time) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            var desde = (0, moment_1.default)().tz('America/Santiago').subtract(15, 'd');
            var hasta = (0, moment_1.default)().tz('America/Santiago').subtract(1, 'd');
            var dia_actual = desde;
            const fechaData = [];
            while (dia_actual.isSameOrBefore(hasta)) {
                fechaData.push(dia_actual.format('YYYY-MM-DD'));
                dia_actual.add(1, 'days');
            }
            //console.log(estanquesdb);
            const fechas = [];
            let estanques = resultMax.filter((element) => {
                const fecha = element.time;
                const fecha_formateada = (0, moment_1.default)(fecha).format('YYYY-MM-DD');
                if (fechas.includes(fecha_formateada))
                    return false;
                else {
                    fechas.push(fecha_formateada);
                    return true;
                }
            });
            let fechaEstanque = fechaData.map((element) => {
                let estanquesData = estanques.filter((elementEstanque) => {
                    return (0, moment_1.default)(elementEstanque.time).format('YYYY-MM-DD') === element;
                });
                let data = {
                    time: element,
                    value: resultMax[0].value
                };
                return estanquesData.length > 0 ? estanquesData : data;
            });
            let dataEtanque = flatten(fechaEstanque);
            const fechaEstante = {
                $gt: new Date(initTime),
                $lt: new Date(endTimeEstanque),
            };
            /*
                    var desde = moment(req.query.initTime).tz('America/Santiago').subtract(1, 'd');
                    var hasta = moment(req.query.endTime).tz('America/Santiago').add(1, 'd');
                    var dia_actual = desde;
                    const fechaData: string[] = [];
                    while (dia_actual.isSameOrBefore(hasta)) {
                        fechaData.push(dia_actual.format('YYYY-MM-DD'));
                        dia_actual.add(1, 'days');
                    }
            
                    // ? estanques por zona
                    const estanquesdb: any[] = await EstanqueIrrimax.find({ zone: _id, fecha: fechaEstante });
                    const fechas: string[] = [];
                    const estanques: any[] = estanquesdb.filter((element: any) => {
                        const fecha: string = element.fecha;
                        const fecha_formateada: string = moment(fecha).format('YYYY-MM-DD');
            
                        if (fechas.includes(fecha_formateada)) return false;
                        else {
                            fechas.push(fecha_formateada);
                            return true;
                        }
                    });
            
                    let fechaEstanque: any[] = fechaData.map((element: any) => {
                        //	console.log(element);
                        let estanquesData: any[] = estanques.filter((elementEstanque: any) => {
                            return moment(elementEstanque.fecha).format('YYYY-MM-DD') === element;
                        });
                        return estanquesData.length > 0 ? estanquesData : '-';
                    });
            
            
                    let dataEtanque: any = flatten(fechaEstanque);
            */
            var desdeIrrigation = (0, moment_1.default)().tz('America/Santiago').subtract(15, 'd');
            var hastaIrrigation = (0, moment_1.default)().tz('America/Santiago').subtract(1, 'd');
            var dia_actual = desdeIrrigation;
            const fechaIrriga = [];
            while (dia_actual.isSameOrBefore(hastaIrrigation)) {
                fechaIrriga.push(dia_actual.format('YYYY-MM-DD'));
                dia_actual.add(1, 'days');
            }
            // console.log('------|> ' + ++i);
            // ? irrigation por zona
            const irrigation = yield models_1.Measure.findOne({ zone: _id, name: 'Irrigation Precipitation' });
            //if (irrigation === null) throw { message: 'El sensor Irrigation Precipitation no existe para esta zona', code: 400 };
            if (irrigation !== null) {
                const irrigationData = yield models_1.MeasureData.find({ id_wiseconn: irrigation.id_wiseconn, time: fecha });
                const irrigationMM = irrigationData
                    .map((item) => item.value)
                    .reduce((total, item) => {
                    return total + item;
                });
                const irrigationVolumenItem = yield models_1.Measure.findOne({ zone: zone._id, name: 'Irrigation Volume' });
                const irrigationVolumenData = yield models_1.MeasureData.find({
                    id_wiseconn: irrigationVolumenItem.id_wiseconn,
                    time: fecha,
                });
                const irrigationVolumens = fechaIrriga.map((element) => {
                    let estanquesData = irrigationVolumenData.reverse().filter((data) => {
                        return (0, moment_1.default)(data.time).add(4, 'h').format('YYYY-MM-DD') === element;
                    });
                    let estanquesData2 = estanquesData.map((data) => {
                        return /* html */ `
					<td >
						<p style="font-size: 9px; width: 25px "> ${parseFloat('' + data.value + '').toFixed(2)} </p>
					</td>
					`;
                    });
                    return estanquesData2.length > 0 ? estanquesData2 : `
				<td >
					<p style="font-size: 9px; width: 25px"> ${parseFloat('' + 0 + '').toFixed(2)} </p>
				</td>
				`;
                });
                const irrigationVolumen = flatten(irrigationVolumens);
                const irrigationTimeItem = yield models_1.Measure.findOne({ zone: zone._id, name: 'Irrigation Time' });
                const irrigationTimeData = yield models_1.MeasureData.find({
                    id_wiseconn: irrigationTimeItem.id_wiseconn,
                    time: fecha,
                });
                const irrigationTimes = fechaIrriga.map((element) => {
                    let estanquesData = irrigationTimeData.reverse().filter((data) => {
                        return (0, moment_1.default)(data.time).add(4, 'h').format('YYYY-MM-DD') === element;
                    });
                    let estanquesData2 = estanquesData.map((data) => {
                        return data.value;
                    });
                    return estanquesData2.length > 0 ? estanquesData2 : 0;
                });
                const irrigationTime = flatten(irrigationTimes);
                const sistenRiegoDates = [];
                const sistenRiegoIrrigations = [];
                const irrigationVolumenHTML = [];
                const formula2 = [];
                const formula2Colors = [];
                const formula = [];
                let fechaEstanque2 = fechaIrriga.map((element) => {
                    let estanquesData = irrigationData.filter((elementEstanque) => {
                        return (0, moment_1.default)(elementEstanque.time).add(4, 'h').format('YYYY-MM-DD') === element;
                    });
                    let data = {
                        time: element,
                        value: 0
                    };
                    return estanquesData.length > 0 ? estanquesData : data;
                });
                let dataEtanqueRiego = flatten(fechaEstanque2);
                dataEtanqueRiego.forEach((data, i) => {
                    sistenRiegoDates.push(/* html */ `
			<td >
				<p style="font-size: 8px;width: 25px "> ${(0, moment_1.default)(data.time).add(4, 'h').format('DD MMM')} </p>
			</td>
			`);
                    sistenRiegoIrrigations.push(/* html */ `
			<td> 
				<p style="font-size: 9px; width: 25px;"> ${parseFloat(data.value).toFixed(2)} </p>
			</td>
			`);
                    irrigationVolumenHTML.push(irrigationVolumen[i]);
                    const a = data.value;
                    const b = irrigationTime[i] / 60;
                    const resulValid = a / b;
                    formula.push(/* html */ `
			<td> 
				<p style="font-size: 9px; width: 25px;"> ${resulValid && resulValid != 'Infinity' ? parseFloat(resulValid).toFixed(2) : '-'} </p>
			</td>
			`);
                    const resul2 = (resulValid - pp_equipo) / pp_equipo;
                    const resul2Redon = parseFloat(resul2).toFixed(2);
                    const rsul2HTML = parseFloat(resul2Redon);
                    formula2.push(/* html */ `
			<td> 
				<p style="font-size: 9px; width: 25px;"> ${resulValid && resulValid != 'Infinity'
                        ? resul2 && resul2 != 'Infinity'
                            ? Math.round(rsul2HTML * 100) + '%'
                            : '-'
                        : '-'} </p>
			</td>
			`);
                    formula2Colors.push(/* html */ `
			<td style="border: none!important; width: 25px; background-color: #${resulValid && resulValid != 'Infinity'
                        ? resul2 && resul2 != 'Infinity'
                            ? Math.round(rsul2HTML * 100) > parseFloat(sobreRiego)
                                ? '1155cc'
                                : Math.round(rsul2HTML * 100) > -parseFloat(caudalDeficiario)
                                    ? 'a6f0f0'
                                    : 'f1fc08'
                            : 'fff'
                        : 'fff'}"> 
				
			</td>
			`);
                });
                const sistenRiego = /* html */ `

		<tr>
		<td style="width: 25px;"> <p style="font-size: 9px">Fecha</p></td>	<p style="font-size: 8px"> ${sistenRiegoDates.join('')} </p> 
		</tr>
		<tr>
			<td style="border: none!important; width: 25px;" ></td>${formula2Colors.join('')}
		</tr>
		<tr>
		   <td style="width: 25px;"><p style="font-size: 9px">mm</p></td>${sistenRiegoIrrigations.join('')}
		</tr>
		<tr>
		<td style="width: 25px;"><p style="font-size: 9px"> m3 </p></td>${irrigationVolumenHTML.join('')}
		</tr>
		<tr>
		<td style="width: 25px;"><p style="font-size: 9px">mm/h</p></td>${formula.join('')}
		</tr>
		<tr>
		<td style="width: 25px;"><p style="font-size: 9px">%Dif</p></td>${formula2.join('')} 
		</tr>
		`;
                let idFarm;
                idFarm = farm;
                if (farm == '602435e2f94eb664dc9529ff' || farm == '60a2f375a329f318a82a332e' || farm == '602435e2f94eb664dc9529fe' || farm == '602435e2f94eb664dc9529fd') {
                    idFarm = '602435e2f94eb664dc95294e';
                }
                if (farm == '602435e2f94eb664dc952b57') {
                    idFarm = '602435e2f94eb664dc9528de';
                }
                // console.log('------|> ' + ++i);
                // ? eto por zona
                const Et0 = yield models_1.Measure.findOne({ farm: idFarm, name: 'Et0' });
                //if (Et0 === null) throw { message: 'El sensor Et0 no existe para este campo', code: 400 };
                const Et0Data = Et0 !== null ? yield models_1.MeasureData.find({ id_wiseconn: Et0.id_wiseconn, time: fecha }) : 0;
                const Et0MM = Et0Data.length > 0 ? Et0Data.map((item) => item.value).reduce((total, item) => {
                    return total + item;
                }) : 0;
                // console.log('------|> ' + ++i);
                // ? Rain por zona
                const Rain = yield models_1.Measure.findOne({ farm: idFarm, sensorType: 'Rain' });
                //if (Rain === null) throw { message: 'El sensor Rain no existe para este campo', code: 400 };
                const RainsData = Rain !== null ? yield models_1.MeasureData.find({ id_wiseconn: Rain.id_wiseconn, time: fecha }) : 0;
                const RainMM = RainsData.length > 0 ? RainsData.map((item) => item.value).reduce((total, item) => {
                    return total + item;
                }) : 0;
                // console.log('------|> ' + ++i);
                // ? Kc por zona
                const Kc = yield models_1.Measure.findOne({ sensorType: 'KC aplicada', zone: _id });
                // if (Kc === null) throw { message: 'No se encuentra variable derivada KC para esta zona', code: 400 };
                const KcData = Kc !== null ? yield models_1.MeasureData.find({ id_wiseconn: Kc.id_wiseconn, time: fechaEstante }) : null;
                // console.log('------|> ' + ++i);
                // ? consulta a irrimax
                const resp = yield axios_1.default.post('https://api.ceres-cdtec.cl/api/irrimax/query', {
                    url: image_url_irrimax,
                });
                const split = resp.data.data.split(',');
                const data = {
                    pond: Math.round(((parseFloat(split[0]) - parseFloat(split[3])) / (parseFloat(split[1]) - parseFloat(split[3]))) * 100),
                    currentStateHumidity: split[0],
                    saturationZone: split[1],
                    stressZone: split[3],
                    fecha: split[5],
                    zone: _id,
                };
                for (const dataMax of dataEtanque) {
                    dataMax.fecha = dataMax.time;
                    dataMax.saturationZone = Number(data.saturationZone);
                    dataMax.stressZone = Number(data.stressZone);
                    dataMax.pond = ((dataMax.value - dataMax.stressZone) / (dataMax.saturationZone - dataMax.stressZone)) * 100;
                }
                dataEtanque.sort(function (a, b) {
                    if (a.time > b.time) {
                        return 1;
                    }
                    if (a.time < b.time) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
                // ? define html
                const barra = dataEtanque
                    .map((item) => {
                    //	const { currentStateHumidity } = item;
                    const fecha = (0, moment_1.default)(item.fecha).add(4, 'h').format('YYYY-MM-DD');
                    /*	const formula: number =
                            ((currentStateHumidity ? currentStateHumidity : data.currentStateHumidity) - data.stressZone) /
                            (data.currentStateHumidity - data.stressZone);*/
                    const kc = KcData !== null ? KcData.find((kc) => (0, moment_1.default)(kc.time).add(4, 'h').format('YYYY-MM-DD') == fecha) : 0;
                    return { prom: item.pond ? Math.round(item.pond) + '%' : '-', kc: kc && kc.value ? kc.value : 0 };
                })
                    .map((item) => {
                    const prom = 
                    /* html */
                    `
					<td style="border: 1px solid #d8d8d8!important;font-size: 12px;text-align: center;border: 1px solid #${parseInt(item.prom) >= 0 && parseInt(item.prom) <= 100 ? '80ffc0' : parseInt(item.prom) > 100 ? '80c0ff' : 'ffc0c0'}!important;font-size: 12px; background-color: #${parseInt(item.prom) >= 0 && parseInt(item.prom) <= 100 ? '80ffc0' : parseInt(item.prom) > 100 ? '80c0ff' : 'ffc0c0'} 
						" >
						<p style="width: 25px;color: #444343!important; text-align: center;padding-top: 3px;padding-bottom: 3px;min-width:30px; text-align: center;">${item.prom}</p>
					</td>
					`;
                    const kc = 
                    /* html */
                    `
					<td style="border: 1px solid #d8d8d8!important;font-size: 12px;text-align: center;">
						<p style="width: 25px;color: #444343!important; padding-top: 3px;padding-bottom: 3px; min-width:30px; text-align: center;">${item.kc !== 0 ? parseFloat(item.kc).toFixed(2) : 0}</p>
					</td>
					`;
                    return { prom, kc };
                });
                // ? define html
                const tabla = tablaDinamica
                    .map((item) => {
                    const tabla = 
                    /* html */
                    `
				<td style="border: 1px solid #d8d8d8!important;font-size: 12px;text-align: center;">
					<p style="width: 25px;color: #444343!important; padding-top: 3px;padding-bottom: 3px; min-width:30px;text-align: center;">${item}</p>
				</td>
				`;
                    return { tabla };
                });
                const ResPromHTML = barra.map((item) => item.prom);
                ResPromHTML.shift();
                ResPromHTML.pop();
                const promHTML = ResPromHTML.join('');
                const RespKcHTML = barra.map((item) => item.kc);
                RespKcHTML.shift();
                RespKcHTML.pop();
                const kcHTML = RespKcHTML.join('');
                const RespTablaHTML = tabla.map((item) => item.tabla);
                const tablaHTML = RespTablaHTML.join('');
                const nameFile = 'zone-' + id + '-date-' + (0, moment_1.default)().tz('America/Santiago').format('DD-MM-YYYY');
                const title = `./static/pdf/zone-${id}-date-${(0, moment_1.default)()
                    .tz('America/Santiago')
                    .format('DD-MM-YYYY')}.pdf`;
                const titleCorreo = `zone-${id}-date-${(0, moment_1.default)()
                    .tz('America/Santiago')
                    .format('DD-MM-YYYY')}.pdf`;
                // Read HTML Template
                const html = /* html */ `
		<html>
			<head>
				<title>${title}</title>
				<link rel="preconnect" href="https://fonts.googleapis.com">
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
				<link href="link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap" rel="stylesheet">
			</head>
			<body style="padding: 12px">
				<div style="float: left; ">
					<img
					width="200px"
					style="margin-bottom: 8px"
					src="${URL_API}/static/logo.png"
					/>
				</div>
				<div >
					<p style="text-align: center; font-size: 30px; color: #6b6467; font-weight: 100" > Informe de Gestión y Operación de riego </p>
				</div>
				<div style="width: 72%; float: left">
					<div style="text-align: center;">
						<img style="width: 95%;height: 370px" src="${urlGraph}" />
					</div>
				<div style="padding-left: 35px;padding-right: 60px">	
					<table style="border: none!important; padding-left: 0px; margin-bottom: 0%;">
						<tr style="margin-bottom: 0%;margin-top: 0%;">
							<td style="width: 25px;margin-bottom: 0%;margin-top: 0%;"> <p style="font-size: 10px;width: 25px; color: #000; margin-bottom: 0%;margin-top: 0%; ">EST <span style="color:#fff">h</span></p></td>  ${promHTML}
						</tr>
					</table>
					<table style="border: none!important; padding-left: 0px;margin-top: 0%; margin-bottom: 0%; ">
						<tr >
						<td style="width: 25px;"> <p style="font-size: 10px;width: 25px;color: #000 ">KC <span style="color:#fff">ho</span></p></td> ${kcHTML}  
						</tr>
					</table>
					<table style="border: none!important; padding-left: 0px;margin-top: 0%; margin-bottom: 0%;">
						<tr >
						<td style="width: 25px;"> <p style="font-size: 10px;width: 20px; color: #000">${dataTitulo} <span style="color:#fff">ho</span></p></td> ${tablaHTML}
						</tr>
					</table>
				</div>
					
					<div style="padding-left: 35px;padding-right: 60px">
						<div style="padding-left: 0px;padding-right: 0px">	
							<table style="margin-top: 0%; ">
								<tr>
									<td style="width: 100%; border: none!important"> <p style="text-aling: center; font-size: 9px; color: grey; font-weight: 600;" > OPERACIÓN EQUIPOS MONITOREADOS </p></td>
								</tr>
								<tr>
									<td style="width: 100%; border: none!important"> <p style="text-aling: center; font-size: 13px; color: grey; " > SISTEMA DE RIEGO: ANALISIS POR RIEGOS </p></td>
									
								</tr>
							</table>
						</div>
					
						<table >
							${sistenRiego}
						</table >
						<table id="titulo" style="margin-top: 12px;border: none!important">
							<tr>
								<td style="width: 100%; border: none!important"> <p style="font-size: 13px; font-weight: 600; width: 300px"> Operación sistema de riego </p></td>
							</tr>
						</table>
						<table id="legen" >
							<tr>
								<td > <p style="font-size: 10px; width: 95px"> Sobre riego</p></td>
								<td> <p style="font-size: 11px;background-color: #1155cc; width: 60px"> <span style="color: #1155cc; width:30px">color</span> </p></td>
								<td> <p style="font-size: 10px; width: 95px">Bien Ejecutado</p></td>
								<td> <p style="font-size: 10px;background-color: #a6f0f0; width: 60px"> <span style="color: #a6f0f0; width:30px">color</span> </p></td>
								<td> <p style="font-size: 10px;width: 95px "> Caudal Deficitario</p></td>
								<td> <p style="font-size: 10px;background-color: #f1fc08; width: 60px"> <span style="color: #f1fc08; width:30px">color</span> </p></td>
							</tr>
						</table>
					</div>
				</div>
				<div style="width: 28%; float: right">
					<table style="border: none!important">
						<tr>
							<td style="width: 50%; border: none!important">
								<b><p style="font-size: 8px">Sector   </p></b>
							</td>
							<td style="width: 50%; border: none!important">
								<p style="font-size: 8px">Sonda   </p>
							</td>
						</tr>
						<tr >
							<td style="width: 50%; border: none!important;" >
							<p style="font-size: 11px; font-weight: bold" >${zone.name} </p>
							</td>
							<td style="width: 50%;border: none!important; ">
								<p style="font-size: 11px; font-weight: bold" > ${zone.probe_type} </p>
							</td>
						</tr>
						<tr>
							<td style="width: 50%; border: none!important">
								<p style="font-size: 8px">Cultivo   </p>
							</td>
							<td style="width: 50%; border: none!important">
								<p style="font-size: 8px">Zona De Riego   </p>
							</td>
						</tr>
					
						<tr>
							<td style="width: 50%;border: none!important; ">
								<p style="font-size: 11px; font-weight: bold"> ${cultivo} </p>
							</td>
							<td style="width: 50%;border: none!important; ">
								<p style="font-size: 11px; font-weight: bold"> ${data.stressZone} %</p>
							</td>
						</tr>
						<tr>
							<td style="width: 50%; border: none!important">
								<p style="font-size: 8px"> Superficie </p>
							</td>
							<td style="width: 50%; border: none!important">
								<p style="font-size: 8px">P.P Equipo   </p>
							</td>
						</tr>
						<tr style="border: none!important">
							<td style="width: 50%;border: none!important; ">
								<p style="font-size: 11px; font-weight: bold">${zone.surface} m2</p>
							</td>
							<td style="width: 50%;border: none!important; ">
								<p style="font-size: 11px; font-weight: bold"> ${pp_equipo} mm/h</p>
							</td>
						</tr>
						<tr>
							<td style="width: 50%; border: none!important">
								<p style="font-size: 8px">Variedad </p>
							</td>
							<td style="width: 50%; border: none!important">
								<p style="font-size: 8px">Máxima Humedad   </p>
							</td>
						</tr>
						<tr>
							<td style="width: 50%;border: none!important; ">
								<p style="font-size: 11px; font-weight: bold"> ${zone.variety} </p>
							</td>
							<td style="width: 50%;border: none!important; ">
								<p style="font-size: 11px; font-weight: bold"> ${data.saturationZone} % </p>
							</td>
						</tr>
					</table>

					<table id="titulo" style="margin-top: 12px">
						<tr>
							<td style="width: 100%; border: none!important"> <p style="font-size: 13px; font-weight: 600; width: 200px"> Técnica </p></td>
						</tr>
					</table>
					<table >
						<tr>
							<td style="width: 100%; border: none!important"> <p style="text-aling: center; font-size: 9px;" > ${tecnica} </p></td>
							
						</tr>
					</table>

					<table id="titulo" style="margin-top: 12px">
						<tr>
							<td style="width: 100%; border: none!important"> <p style="font-size: 13px; font-weight: 600; width: 200px"> Administración de la técnica </p></td>
						</tr>
					</table>
					<table >
						<tr>
							<td style="width: 100%; border: none!important"> <p style="text-aling: center; font-size: 9px;" > ${adminTecnica} </p></td>
							
						</tr>
					</table>

					<table id="titulo" style="margin-top: 12px">
						<tr>
							<td style="width: 100%; border: none!important"> <p style="font-size: 13px; font-weight: 600; width: 200px"> Operación </p></td>
						</tr>
					</table>
					<table >
						<tr>
							<td style="width: 100%; border: none!important"> <p style="text-aling: center; font-size: 9px;" > ${operation} </p></td>
							
						</tr>
					</table>
				

					<table id="titulo" style="margin-top: 12px">
						<tr>
							<td style="width: 100%; border: none!important"> <p style="font-size: 13px; font-weight: 600; width: 200px"> Resumen </p></td>
						</tr>
					</table>
					<table id="legen">
						<tr>
							<td > <p style="font-size: 10px; width: 50px; "> Riego mm </p></td>
							<td style="width: 5%"><p style="font-size: 10px; width: 30px; ">${irrigationMM.toFixed(2)}</p></td>
							<td style="width: 20%"><p style="font-size: 10px; width: 40px; "> Precipit. mm </p> </td>
							<td style="width: 5%"><p style="font-size: 10px; width: 30px; ">${RainMM.toFixed(2)}</p></td>
							<td style="width: 20%"><p style="font-size: 10px; width: 40px; "> Evapo. mm </p></td>
							<td style="width: 5%"><p style="font-size: 10px; width: 30px; ">${Et0MM.toFixed(2)}</p></td>
							<td style="width: 20%"><p style="font-size: 10px; width: 40px; "> Kc </p></td>
							<td style="width: 5%"><p style="font-size: 10px; width: 30px; ">${((RainMM + irrigationMM) / Et0MM).toFixed(2)}</p></td>
						</tr>
					</table>
				</div>
		
				<div style="padding-left: 30px; padding-right: 20px">
					
				</div>
				
				
				<style>
					table {
						width: 100%;
					}
					table, th, td {
  						border: 1px solid #dee2e6;
						  color: #3C4858;
						  font-family: 'Roboto', sans-serif;
					}
					table#legen {
						width: 50%;
						float: left;				
						font-family: 'Roboto', sans-serif;
						border: none!important
					}
					table#legen2, table#legen3 {
						margin-top: 16px;
						width: 40%;
						float: right;
						font-family: 'Roboto', sans-serif;
					}
					p{
						color: #3C4858;
						font-family: 'Roboto', sans-serif;
					}

					table#titulo {
						width: 100%;
						float: left;						
						font-family: 'Roboto', sans-serif;
						border: none!important
					}
				</style>
			</body>
		</html>
		`;
                html_pdf_1.default.create(html, { orientation: 'landscape', format: 'Tabloid' }).toFile(title, (err, resp) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    else {
                        if (emails) {
                            yield index_1.mail.ImagisInfoRIego({
                                emails,
                                filename: titleCorreo,
                                direction: path_1.default.resolve(title),
                                even_date: initTimeEvent,
                                even_time: endTimeEvent,
                            });
                        }
                        yield models_1.Zone.findByIdAndUpdate(zone._id, {
                            $push: {
                                pdf_informe_riego: {
                                    date_create: (0, moment_1.default)().format('YYYY-MM-DD'),
                                    path: path_1.default.resolve(title),
                                    initTime: initTimePDF,
                                    endTime,
                                },
                            },
                            pp_equipo: pp_equipo
                        });
                        return { data: resp, nameFile: nameFile };
                        //	res.status(200).json({ status: true, message: 'PDF generado', data: resp, nameFile: nameFile });
                    }
                }));
            }
            else {
                let fechaIrrigation = fechaIrriga.map((element) => {
                    return element;
                });
                const irrigationMM = 0;
                const sistenRiegoDates = [];
                const sistenRiegoIrrigations = [];
                const irrigationVolumenHTML = [];
                const formula2 = [];
                const formula2Colors = [];
                const formula = [];
                fechaIrrigation.forEach((data, i) => {
                    sistenRiegoDates.push(/* html */ `
			<td >
				<p style="font-size: 9px;width: 25px; "> ${(0, moment_1.default)(data).format('DD MMM')} </p>
			</td>
			`);
                    sistenRiegoIrrigations.push(/* html */ `
			<td> 
				<p style="font-size: 9px; width: 25px;"> ${parseFloat('0').toFixed(2)} </p>
			</td>
			`);
                    irrigationVolumenHTML.push(`<td>
				<p style="font-size: 9px; width: 25px "> ${parseFloat('' + '0' + '').toFixed(2)} </p>
			</td>`);
                    const a = 0;
                    const b = 0 / 60;
                    const resulValid = a / b;
                    formula.push(/* html */ `
			<td> 
				<p style="font-size: 9px; width: 25px;"> ${resulValid && resulValid != 'Infinity' ? parseFloat(resulValid).toFixed(2) : '-'} </p>
			</td>
			`);
                    const resul2 = (resulValid - pp_equipo) / pp_equipo;
                    const resul2Redon = parseFloat(resul2).toFixed(2);
                    const rsul2HTML = parseFloat(resul2Redon);
                    formula2.push(/* html */ `
			<td> 
				<p style="font-size: 9px; width: 25px;"> ${resulValid && resulValid != 'Infinity'
                        ? resul2 && resul2 != 'Infinity'
                            ? Math.round(rsul2HTML * 100) + '%'
                            : '-'
                        : '-'} </p>
			</td>
			`);
                    formula2Colors.push(/* html */ `
			<td style="border: none!important; width: 25px; background-color: #${resulValid && resulValid != 'Infinity'
                        ? resul2 && resul2 != 'Infinity'
                            ? Math.round(rsul2HTML * 100) > parseFloat(sobreRiego)
                                ? '1155cc'
                                : Math.round(rsul2HTML * 100) > -parseFloat(caudalDeficiario)
                                    ? 'a6f0f0'
                                    : 'f1fc08'
                            : 'fff'
                        : 'fff'}"> 
				
			</td>
			`);
                });
                const sistenRiego = /* html */ `

		<tr>
		<td style="width: 25px;"> <p style="font-size: 9px">Fecha</p></td>	<p style="font-size: 9px"> ${sistenRiegoDates.join('')} </p> 
		</tr>
		<tr>
			${formula2Colors.join('')}<td style="border: none!important;" ></td>
		</tr>
		<tr>
		   <td style="width: 25px;"><p style="font-size: 9px">mm</p></td>${sistenRiegoIrrigations.join('')}
		</tr>
		<tr>
		<td style="width: 25px;"><p style="font-size: 9px"> m3 </p></td>${irrigationVolumenHTML.join('')}
		</tr>
		<tr>
		<td style="width: 25px;"><p style="font-size: 9px">mm/h</p></td>${formula.join('')}
		</tr>
		<tr>
		<td style="width: 25px;"><p style="font-size: 9px">%Dif</p></td>${formula2.join('')} 
		</tr>
		`;
                let idFarm;
                idFarm = farm;
                if (farm == '602435e2f94eb664dc9529ff' || farm == '60a2f375a329f318a82a332e' || farm == '602435e2f94eb664dc9529fe' || farm == '602435e2f94eb664dc9529fd') {
                    idFarm = '602435e2f94eb664dc95294e';
                }
                if (farm == '602435e2f94eb664dc952b57') {
                    idFarm = '602435e2f94eb664dc9528de';
                }
                // console.log('------|> ' + ++i);
                // ? eto por zona
                const Et0 = yield models_1.Measure.findOne({ farm: idFarm, name: 'Et0' });
                //if (Et0 === null) throw { message: 'El sensor Et0 no existe para este campo', code: 400 };
                const Et0Data = Et0 !== null ? yield models_1.MeasureData.find({ id_wiseconn: Et0.id_wiseconn, time: fecha }) : 0;
                const Et0MM = Et0Data.length > 0 ? Et0Data.map((item) => item.value).reduce((total, item) => {
                    return total + item;
                }) : 0;
                // console.log('------|> ' + ++i);
                // ? Rain por zona
                const Rain = yield models_1.Measure.findOne({ farm: idFarm, sensorType: 'Rain' });
                //if (Rain === null) throw { message: 'El sensor Rain no existe para este campo', code: 400 };
                const RainsData = Rain !== null ? yield models_1.MeasureData.find({ id_wiseconn: Rain.id_wiseconn, time: fecha }) : 0;
                const RainMM = RainsData.length > 0 ? RainsData.map((item) => item.value).reduce((total, item) => {
                    return total + item;
                }) : 0;
                // console.log('------|> ' + ++i);
                // ? Kc por zona
                const Kc = yield models_1.Measure.findOne({ sensorType: 'KC aplicada', zone: _id });
                // if (Kc === null) throw { message: 'No se encuentra variable derivada KC para esta zona', code: 400 };
                const KcData = Kc !== null ? yield models_1.MeasureData.find({ id_wiseconn: Kc.id_wiseconn, time: fechaEstante }) : null;
                // console.log('------|> ' + ++i);
                // ? consulta a irrimax
                const resp = yield axios_1.default.post('https://api.ceres-cdtec.cl/api/irrimax/query', {
                    url: image_url_irrimax,
                });
                const split = resp.data.data.split(',');
                const data = {
                    pond: Math.round(((parseFloat(split[0]) - parseFloat(split[3])) / (parseFloat(split[1]) - parseFloat(split[3]))) * 100),
                    currentStateHumidity: split[0],
                    saturationZone: split[1],
                    stressZone: split[3],
                    fecha: split[5],
                    zone: _id,
                };
                for (const dataMax of dataEtanque) {
                    dataMax.fecha = dataMax.time;
                    dataMax.saturationZone = Number(data.saturationZone);
                    dataMax.stressZone = Number(data.stressZone);
                    dataMax.pond = ((dataMax.value - dataMax.stressZone) / (dataMax.saturationZone - dataMax.stressZone)) * 100;
                }
                dataEtanque.sort(function (a, b) {
                    if (a.time > b.time) {
                        return 1;
                    }
                    if (a.time < b.time) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
                // ? define html
                const barra = dataEtanque
                    .map((item) => {
                    //	const { currentStateHumidity } = item;
                    const fecha = (0, moment_1.default)(item.fecha).add(4, 'h').format('YYYY-MM-DD');
                    /*const formula: number =
                        ((currentStateHumidity ? currentStateHumidity : data.currentStateHumidity) - data.stressZone) /
                        (data.currentStateHumidity - data.stressZone);*/
                    const kc = KcData !== null ? KcData.find((kc) => (0, moment_1.default)(kc.time).add(4, 'h').format('YYYY-MM-DD') == fecha) : 0;
                    return { prom: item.pond ? Math.round(item.pond) + '%' : '-', kc: kc && kc.value ? kc.value : 0 };
                })
                    .map((item) => {
                    const prom = 
                    /* html */
                    `
						<td style="border: 1px solid #d8d8d8!important;font-size: 12px;text-align: center;border: 1px solid #${parseInt(item.prom) >= 0 && parseInt(item.prom) <= 100 ? '80ffc0' : parseInt(item.prom) > 100 ? '80c0ff' : 'ffc0c0'}!important;font-size: 12px; background-color: #${parseInt(item.prom) >= 0 && parseInt(item.prom) <= 100 ? '80ffc0' : parseInt(item.prom) > 100 ? '80c0ff' : 'ffc0c0'}" >
						<p style="width: 25px;color: #444343!important; text-align: center;padding-top: 3px;padding-bottom: 3px;min-width:30px; text-align: center;">${item.prom}</p>
					    </td>
					`;
                    const kc = 
                    /* html */
                    `
					<td style="border: 1px solid #d8d8d8!important;font-size: 12px;text-align: center;">
						<p style="width: 25px;color: #444343!important; padding-top: 3px;padding-bottom: 3px">${item.kc !== 0 ? parseFloat(item.kc).toFixed(2) : 0}</p>
					</td>
					`;
                    return { prom, kc };
                });
                // ? define html
                const tabla = tablaDinamica
                    .map((item) => {
                    const tabla = 
                    /* html */
                    `
				<td style="border: 1px solid #d8d8d8!important;font-size: 12px;">
					<p style="width: 25px;color: #444343!important; padding-top: 3px;padding-bottom: 3px">${item}</p>
				</td>
				`;
                    return { tabla };
                });
                const ResPromHTML = barra.map((item) => item.prom);
                ResPromHTML.shift();
                ResPromHTML.pop();
                const promHTML = ResPromHTML.join('');
                const RespKcHTML = barra.map((item) => item.kc);
                RespKcHTML.shift();
                RespKcHTML.pop();
                const kcHTML = RespKcHTML.join('');
                const RespTablaHTML = tabla.map((item) => item.tabla);
                const tablaHTML = RespTablaHTML.join('');
                const nameFile = 'zone-' + id + '-date-' + (0, moment_1.default)().tz('America/Santiago').format('DD-MM-YYYY');
                const title = `./static/pdf/zone-${id}-date-${(0, moment_1.default)()
                    .tz('America/Santiago')
                    .format('DD-MM-YYYY')}.pdf`;
                const titleCorreo = `zone-${id}-date-${(0, moment_1.default)()
                    .tz('America/Santiago')
                    .format('DD-MM-YYYY')}.pdf`;
                // Read HTML Template
                const html = /* html */ `
		<html>
			<head>
				<title>${title}</title>
				<link rel="preconnect" href="https://fonts.googleapis.com">
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
				<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap" rel="stylesheet">
				</head>
			<body style="padding: 12px">
				<div style="float: left; ">
					<img
					width="200px"
					style="margin-bottom: 8px"
					src="${URL_API}/static/logo.png"
					/>
				</div>
				<div >
					<p style="text-align: center; font-size: 30px; color: #6b6467; font-weight: 100" > Informe de Gestión y Operación de riego </p>
				</div>
				<div style="width: 72%; float: left">
					<div style="text-align: center;">
						<img style="width: 95%;height: 370px" src="${urlGraph}" />
					</div>
				<div style="padding-left: 35px;padding-right: 60px">	
					<table style="border: none!important; padding-left: 0px; margin-bottom: 0%;">
						<tr style="margin-bottom: 0%;margin-top: 0%;">
							<td style="width: 25px;margin-bottom: 0%;margin-top: 0%;"> <p style="font-size: 10px;width: 25px; color: #000; margin-bottom: 0%;margin-top: 0%; ">EST <span style="color:#fff">h</span></p></td>  ${promHTML}
						</tr>
					</table>
					<table style="border: none!important; padding-left: 0px;margin-top: 0%; margin-bottom: 0%; ">
						<tr >
						<td style="width: 25px;"> <p style="font-size: 10px;width: 25px;color: #000 ">KC <span style="color:#fff">ho</span></p></td> ${kcHTML}  
						</tr>
					</table>
					<table style="border: none!important; padding-left: 0px;margin-top: 0%; margin-bottom: 0%;">
						<tr >
						<td style="width: 25px;"> <p style="font-size: 10px;width: 20px; color: #000">${dataTitulo} <span style="color:#fff">ho</span></p></td> ${tablaHTML}
						</tr>
					</table>
				</div>
					
					<div style="padding-left: 35px;padding-right: 60px">
						<div style="padding-left: 0px;padding-right: 0px">	
							<table style="margin-top: 0%; ">
								<tr>
									<td style="width: 100%; border: none!important"> <p style="text-aling: center; font-size: 9px; color: grey; font-weight: 600;" > OPERACIÓN EQUIPOS MONITOREADOS </p></td>
								</tr>
								<tr>
									<td style="width: 100%; border: none!important"> <p style="text-aling: center; font-size: 13px; color: grey; " > SISTEMA DE RIEGO: ANALISIS POR RIEGOS </p></td>
									
								</tr>
							</table>
						</div>
					
						<table >
							${sistenRiego}
						</table >
						<table id="titulo" style="margin-top: 12px;border: none!important">
							<tr>
								<td style="width: 100%; border: none!important"> <p style="font-size: 13px; font-weight: 600; width: 200px"> Operación sistema de riego </p></td>
							</tr>
						</table>
						<table id="legen" >
							<tr>
								<td > <p style="font-size: 10px; width: 95px"> Sobre riego</p></td>
								<td> <p style="font-size: 11px;background-color: #1155cc; width: 60px"> <span style="color: #1155cc; width:30px">color</span> </p></td>
								<td> <p style="font-size: 10px; width: 95px">Bien Ejecutado</p></td>
								<td> <p style="font-size: 10px;background-color: #a6f0f0; width: 60px"> <span style="color: #a6f0f0; width:30px">color</span> </p></td>
								<td> <p style="font-size: 10px;width: 95px "> Caudal Deficitario</p></td>
								<td> <p style="font-size: 10px;background-color: #f1fc08; width: 60px"> <span style="color: #f1fc08; width:30px">color</span> </p></td>
							</tr>
						</table>
					</div>
				</div>
				<div style="width: 28%; float: right">
				<table style="border: none!important">
				<tr>
					<td style="width: 50%; border: none!important">
						<p style="font-size: 8px">Sector   </p>
					</td>
					<td style="width: 50%; border: none!important">
						<p style="font-size: 8px">Sonda   </p>
					</td>
				</tr>
				<tr >
					<td style="width: 50%;border: none!important;" >
						<p style="font-size: 11px; font-weight: bold" >${zone.name} </p>
					</td>
					<td style="width: 50%;border: none!important; ">
						<p style="font-size: 11px; font-weight: bold"> ${zone.probe_type} </p>
					</td>
					
				</tr>
				<tr>
					<td style="width: 50%; border: none!important">
						<p style="font-size: 8px">Cultivo   </p>
					</td>
					<td style="width: 50%; border: none!important">
						<p style="font-size: 8px">Zona De Riego   </p>
					</td>
				</tr>
			
				<tr>
					<td style="width: 50%;border: none!important; ">
						<p style="font-size: 11px; font-weight: bold"> ${cultivo} </p>
					</td>
					<td style="width: 50%;border: none!important; ">
						<p style="font-size: 11px; font-weight: bold"> ${data.stressZone} %</p>
					</td>
				</tr>
				<tr>
					<td style="width: 50%; border: none!important">
						<p style="font-size: 8px"> Superficie </p>
					</td>
					<td style="width: 50%; border: none!important">
						<p style="font-size: 8px">P.P Equipo   </p>
					</td>
				</tr>
				<tr style="border: none!important">
					<td style="width: 50%;border: none!important; ">
						<p style="font-size: 11px; font-weight: bold">${zone.surface} m2</p>
					</td>
					<td style="width: 50%;border: none!important; ">
						<p style="font-size: 11px; font-weight: bold"> ${pp_equipo} mm/h</p>
					</td>
				</tr>
				<tr>
					<td style="width: 50%; border: none!important">
						<p style="font-size: 8px">Variedad </p>
					</td>
					<td style="width: 50%; border: none!important">
						<p style="font-size: 8px">Máxima Humedad   </p>
					</td>
				</tr>
				<tr>
					<td style="width: 50%;border: none!important; ">
						<p style="font-size: 11px; font-weight: bold"> ${zone.variety} </p>
					</td>
					<td style="width: 50%;border: none!important; ">
						<p style="font-size: 11px; font-weight: bold"> ${data.saturationZone} % </p>
					</td>
				</tr>
			</table>

					<table id="titulo" style="margin-top: 12px">
						<tr>
							<td style="width: 100%; border: none!important"> <p style="font-size: 13px; font-weight: 600; width: 200px"> Técnica </p></td>
						</tr>
					</table>
					<table >
						<tr>
							<td style="width: 100%; border: none!important"> <p style="text-aling: center; font-size: 9px;" > ${tecnica} </p></td>
							
						</tr>
					</table>

					<table id="titulo" style="margin-top: 12px">
						<tr>
							<td style="width: 100%; border: none!important"> <p style="font-size: 13px; font-weight: 600; width: 200px"> Administración de la técnica </p></td>
						</tr>
					</table>
					<table >
						<tr>
							<td style="width: 100%; border: none!important"> <p style="text-aling: center; font-size: 9px;" > ${adminTecnica} </p></td>
							
						</tr>
					</table>

					<table id="titulo" style="margin-top: 12px">
						<tr>
							<td style="width: 100%; border: none!important"> <p style="font-size: 13px; font-weight: 600; width: 200px"> Operación </p></td>
						</tr>
					</table>
					<table >
						<tr>
							<td style="width: 100%; border: none!important"> <p style="text-aling: center; font-size: 9px;" > ${operation} </p></td>
							
						</tr>
					</table>
				

					<table id="titulo" style="margin-top: 12px">
						<tr>
							<td style="width: 100%; border: none!important"> <p style="font-size: 13px; font-weight: 600; width: 200px"> Resumen </p></td>
						</tr>
					</table>
					<table id="legen">
						<tr>
							<td > <p style="font-size: 10px; width: 50px; "> Riego mm </p></td>
							<td style="width: 5%"><p style="font-size: 10px; width: 30px; ">${irrigationMM.toFixed(2)}</p></td>
							<td style="width: 20%"><p style="font-size: 10px; width: 40px; "> Precipit. mm </p> </td>
							<td style="width: 5%"><p style="font-size: 10px; width: 30px; ">${RainMM.toFixed(2)}</p></td>
							<td style="width: 20%"><p style="font-size: 10px; width: 40px; "> Evapo. mm </p></td>
							<td style="width: 5%"><p style="font-size: 10px; width: 30px; ">${Et0MM.toFixed(2)}</p></td>
							<td style="width: 20%"><p style="font-size: 10px; width: 40px; "> Kc </p></td>
							<td style="width: 5%"><p style="font-size: 10px; width: 30px; ">${((RainMM + irrigationMM) / Et0MM).toFixed(2)}</p></td>
						</tr>
					</table>
				</div>
		
				<div style="padding-left: 30px; padding-right: 20px">
					
				</div>
				
				
				<style>
					table {
						width: 100%;
					}
					table, th, td {
  						border: 1px solid #dee2e6;
						  color: #3C4858;
						  font-family: 'Roboto', sans-serif;
					}
					table#legen {
						width: 50%;
						float: left;				
						font-family: 'Roboto', sans-serif;
						border: none!important
					}
					table#legen2, table#legen3 {
						margin-top: 16px;
						width: 40%;
						float: right;
						font-family: 'Roboto', sans-serif;
					}
					p{
						color: #3C4858;
						font-family: 'Roboto', sans-serif;
					}

					table#titulo {
						width: 100%;
						float: left;						
						font-family: 'Roboto', sans-serif;
						border: none!important
					}
				</style>
			</body>
		</html>
		`;
                html_pdf_1.default.create(html, { orientation: 'landscape', format: 'Tabloid' }).toFile(title, (err, resp) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    else {
                        if (emails) {
                            yield index_1.mail.ImagisInfoRIego({
                                emails,
                                filename: titleCorreo,
                                direction: path_1.default.resolve(title),
                                even_date: initTimeEvent,
                                even_time: endTimeEvent,
                            });
                        }
                        yield models_1.Zone.findByIdAndUpdate(zone._id, {
                            $push: {
                                pdf_informe_riego: {
                                    date_create: (0, moment_1.default)().format('YYYY-MM-DD'),
                                    path: path_1.default.resolve(title),
                                    initTime: initTimePDF,
                                    endTime,
                                },
                            },
                            pp_equipo: pp_equipo
                        });
                        return { data: resp, nameFile: nameFile };
                        //res.status(200).json({ status: true, message: 'PDF generado',  });
                    }
                }));
            }
        }
        catch (err) {
            console.log(err);
            //	next(err);
        }
    });
}
;
//Calculo de la suma de humedades
function getProMeasureSumaHumedad(arrayOfArrays, fecha) {
    return __awaiter(this, void 0, void 0, function* () {
        const varSector = yield models_1.VarDerivateSector.find({ zone: arrayOfArrays });
        if (varSector != '') {
            let varSensor = [];
            for (const value of varSector) {
                if (value.measure.length !== 0) {
                    varSensor.push(value);
                }
            }
            if (varSensor.length != 0) {
                const varSectorId = varSensor[0].measure.map((element) => {
                    return element.id_wiseconn;
                });
                let sensor = [];
                for (const idmeasures of varSectorId) {
                    const SensorData = yield models_1.MeasureData.find({ id_wiseconn: idmeasures, time: fecha });
                    sensor.push(SensorData);
                }
                let sensor2 = [];
                for (let i = 0; i < sensor.length; i++) {
                    for (let j = 0; j < sensor[i].length; j++) {
                        sensor2.push(sensor[i][j]);
                    }
                }
                console.log(sensor2.length);
                let sensorCalc = sensor2
                    .filter((item) => (0, moment_1.default)(item.time).add(4, 'h').format('HH:mm') <= '23:00' && (0, moment_1.default)(item.time).add(4, 'h').format('HH:mm') >= '21:00');
                if (sensorCalc.length != 0) {
                    return sensorCalc;
                }
                else {
                    return null;
                }
            }
        }
        else {
            return null;
        }
    });
}
function flatten(arrayOfArrays) {
    return arrayOfArrays.reduce(function (flat, subElem) {
        return flat.concat(Array.isArray(subElem) ? flatten(subElem) : subElem);
    }, []);
}
//# sourceMappingURL=index.js.map