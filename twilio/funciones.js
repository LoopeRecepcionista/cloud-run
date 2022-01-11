"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardarCitaCloudFunctionJEP = exports.guardarCitaCloudFunction = exports.obtenerHorariosCloudFunction = exports.obtenerHorariosBDCloudFunction = exports.guardarHorariosCloudFunction = exports.obtenerServiciosCloudFunction = exports.obtenerCitasClienteCloudFunction = exports.obtenerConsultoresCloudFunction = exports.obtenerConsultoresByRequest = exports.obtenerHorariosCloudFunction2 = exports.getNombreClienteCloudFunction = exports.mensajePruebaTwilioCloudFunction = exports.enviarRecordatoriosCloudFunction = exports.confirmarRecordatorioCloudFunction = exports.cancelarCitaCloudFunction = exports.cancelarRecordatorioCloudFunction = void 0;
//import * as functions from "firebase-functions";
const config_2 = require("./config");
const mostrar_documentos_2 = require("./mostrar-documentos");
const moment = require("moment");
const { google } = require('googleapis');
//const axios = require('axios');
const momenttz = require('moment-timezone');
//DIALOGFLOW
const serviceAccount = {
    "type": "service_account",
    "project_id": "cascaron-bwto",
    "private_key_id": "703f08699e236667170618ce53e3ca900e1ac07c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCwjd18BjQhoPvU\naM2o1wjqxPAwMdgdESe22dKL4usO43JEyGBIOzUQQ1q7b1j3jWnsPGt5sGN6d8SU\nHuO/caCYXUW7510KPgopJj78JkCG1/ZH02T46v5r+KDHxidezWKZSMTjZ3wOGpRo\nA6RjF7wYK/lkhniHgYn53MrFICJ/K06NoM6zIaNKoFKywlnXsDu+9s4lzp63LVDu\nXqnNsHe/9BhSuxnzpocpdOBv/5ALJ5KM74r4V+F+hU2nKJbVyGEIkvMtu8AHG7t4\nOQ+DWXc2547nCksSYTfu84ro3pt0j/n8Ide2R2wept69Bd6MZL5dVXSPEhZOvqEK\nKw86HiSvAgMBAAECggEABdH/cbXApTUp6CQ2V3ETVa39XxFdlwO4Q/JlWwA1kI2V\n+EeEyQzOoIUf6hrvG2YZjlSllGLovKJTJDDqgCauTSeSA3JKompOKnIc1HIsYWWg\nNFj3NK+GiKevITbamGj77aK0/uwr7kkZCF7KXgvrwv48IADA23K9SjPpqVr4WCnW\nxZGJewE7taJ4M4nFFYJM/y1lrcFAS41MiA43cQHJrRWfQ+CJsLEJjrTNPiPmj5OQ\nz3qzjnHL1Tf0b390nPoDTLk54B3PQenfo8ebers+Dpuv4N6BUDl7B9+0G/5JAp/7\nO35XfCLPUdSqCwiB4Sih2eFR1Sk3UilfRr3uJr2nJQKBgQDj2jNQZCQ797IalFMv\n4rXdLC8YvU5iQdi+NdT9AmXsBcQtLlnf1jIpcTdwefmATI80eO5uLuR/nP8YOzWg\nkhrdwK4kezDFyDbitnO5lxav1mVCR3ui/AzOKtKBI6VvHTFve7RycAIGQOuw7lUI\nlCt0kH4o2Z+/j5OeIu/nI+F3JQKBgQDGXV3YxYPObUYKYWKW4F/MD8z/n/aLKOR4\nfgh19yo8PCL2KXBiyiDcD8MpHDhWTwVVXRyoSvqbaBiWDoghDDWCAjfMdvqrmbOq\npU2/Vv67ElXOuEbFJkqMUtLlMUy5TA3su9eBxjTfqIfT973wffCImVYdf+IE0xxi\nkj+c1u0+QwKBgCjpCaOah2L5A1KAZTtI0myGvWIMw2Ei/36PfdF7t78b/fA6zUpC\nVDlaqaCZVfHyTRgXyn+gDcjX8HlyUBungAlmyh2kvMoWO7yTE84z0Y/6x62R1iIa\nbVYrHCaxtsdvj2u741dUwxhKWccn0765k9/W/b/p6yPi7JdNIJP4vke9AoGBAJrY\nkYTBEpYWuSErSkHK3x01jGpTnaqd/lOM1t/3VHH247fTO1bywFnouAkkbVn6j4hG\nijNZbG3aAa9Jorxhgnd9cb9bdWx1LEpeheWCbJDtzCv1r9EAhhsqIFUneeP/2bLe\nI2m7ptSdA4LVFuFf/l8zi4S1qmLnxXWxApVVNZdvAoGBAJjzFvbNROzr1UXnTKQa\n9DWBWlCDOKyQG1ZptLi6VeP7Zh4rbcKr8jPQCBKnFS0xocgHETOAOoRmUECkfHMI\n0oA8VgFoHI+ok6mT1xP/EfkHxJiP8Kq/LxwVrdf7ERDpp/lyOzYWy3yT7fS3cNFm\n8LB0+dV3OreZjEjSwndeEhgx\n-----END PRIVATE KEY-----\n",
    "client_email": "dialog-account@cascaron-bwto.iam.gserviceaccount.com",
    "client_id": "109515799700782158476",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dialog-account%40cascaron-bwto.iam.gserviceaccount.com"
};
//GOOGLE CALENDAR
// Set up Google Calendar service account credentials
const serviceAccountAuth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: 'https://www.googleapis.com/auth/calendar'
});
const obtenerIdCalendarioJEP = async () => {
    let parametros;
    //Obtener el id del calendario de Google del consultor
    const parametrosRef = config_2.default.collection(`/general/#DrEspinosa/consultores/@DrEspinosa/config/`).doc('parametros');
    parametros = (await parametrosRef.get()).data();
    const idCalendar = parametros.idCalendar;
    return idCalendar;
};
const obtenerIdCalendarioPorConsultor = async (empresa, consultor) => {
    let parametros;
    //Obtener el id del calendario de Google del consultor
    const parametrosRef = config_2.default.collection(`/general/${empresa}/consultores/${consultor}/config/`).doc('parametros');
    parametros = (await parametrosRef.get()).data();
    const idCalendar = parametros.idCalendar;
    return idCalendar;
};
//const idCalendar = 'fhgmg1rgmck4h10jt5a9510g2o@group.calendar.google.com'; //Calendario de pruebas de Jorge
//TWILIO
const phoneNumber = "+14155238886";
const accountSid = 'AC087e566724fb97226bb65b6e00959a7c';
const authToken = '32af66d45546fe30fbaa509a679cb80e';
const client = require('twilio')(accountSid, authToken);
const leyendaConfirmada = 'CITA CONFIRMADA POR EL CLIENTE.';
const leyendaCancelada = 'CITA CANCELADA POR EL CLIENTE.';
//OTRAS VARIABLES
//db.useEmulator("localhost", 8082);
//const formatoC = 'DD/MM/YYYY HH:mm';
const formato = 'HH:mm';
//const formatoF = 'DD/MM/YYYY';
const formatoF = 'YYYY-MM-DD';
const formatoRecordatorio = 'hh:mm A';
const formatoTextos = 'h:mm A';
//Estas funciones irán en helpers
function obtenQ(minEntrada) {
    if (minEntrada == 0)
        return 0;
    else if (minEntrada == 15)
        return 1;
    else if (minEntrada == 30)
        return 2;
    else //minEntrada == 45
        return 3;
}
/////////////////////////////////////
const obtenerNombreCliente = async (telefono) => {
    let clientes = [];
    let nombreCliente = '';
    const clientesRef = config_2.default.collection(`/clientes`);
    const query = clientesRef.where('telefono', '==', telefono);
    await query.get().then(snap => clientes = mostrar_documentos_2.retornaDocumentos(snap));
    if (clientes.length > 0)
        nombreCliente = clientes[0].nombre;
    return nombreCliente;
};
const obtenerClientePorCanal = async (canal, chatId) => {
    let clientes = [];
    let cliente = null;
    const clientesRef = config_2.default.collection(`/clientes-v2`);
    const query = clientesRef.where(canal, '==', chatId);
    await query.get().then(snap => clientes = mostrar_documentos_2.retornaDocumentos(snap));
    if (clientes.length > 0)
        cliente = clientes[0];
    return cliente;
};
const obtenerConsultaHorariosPorCanalCliente = async (canal, chatId) => {
    const idConsulta = canal + "-" + chatId;
    let consulta;
    const consultaRef = config_2.default.collection(`/consultas-horarios/`).doc(idConsulta);
    consulta = (await consultaRef.get()).data();
    //const idCalendar = parametros.idCalendar;
    return consulta;
};
function cursorObtenerArregloHorariosConHoras(fecha, jor) {
    let horarios = [];
    let i = 0;
    let inicio = true;
    let fin = false;
    let qInicial = obtenQ(jor.entradaMin);
    let qFinal = obtenQ(jor.salidaMin) - 1;
    const fechaHrInicioComida = fecha.clone().add(jor.iniComidaHr, 'hours').add(jor.iniComidaMin, 'minutes');
    const fechaHrFinComida = fecha.clone().add(jor.finComidaHr, 'hours').add(jor.finComidaMin, 'minutes');
    //console.log(fechaHrInicioComida.format(formatoC));
    //console.log(fechaHrFinComida.format(formatoC));
    //console.log(jor);
    const maxH = jor.salidaMin == 0 ? jor.salidaHr : jor.salidaHr + 1;
    //Arreglo antes de comer y ahora agrego hasta la salida para en un segundo paso descontar los horarios de comida y las citas programadas
    for (let h = jor.entradaHr; h < maxH; h++) {
        if (jor.salidaMin == 0)
            fin = h == maxH;
        else
            fin = h == maxH - 1;
        for (let q = inicio ? qInicial : 0; q <= (!fin ? 3 : qFinal); q++) {
            let minIni = 15 * q;
            let minFin = 15 * (q + 1);
            let hi = fecha.clone().add(h, 'hours').add(minIni, 'minutes');
            let hf = fecha.clone().add(h, 'hours').add(minFin, 'minutes');
            /////////////////////////////////////////////////////////////////////////
            //Todo esto va a la función donde se va a agregar las citas ya agendadas
            /////////////////////////////////////////////////////////////////////////
            let disp = hi >= fechaHrInicioComida && hf <= fechaHrFinComida ? false : true;
            let hora = {
                hi,
                hf,
                horaInicio: hi.format(formato),
                horaFin: hf.format(formato),
                disponible: disp
            };
            if (!disp)
                hora = Object.assign(Object.assign({}, hora), { motivo: 'comida' });
            horarios[i] = hora;
            /////////////////////////////////////////////////////////////////////////
            i++;
            inicio = false;
        }
    }
    //console.log(horarios);
    return horarios;
}
//Esta se debería usar desde que se consultan los servicios del consultor y mandarse la duración desde el dialogflow
//Pero para ir viendo como se hace lo mando por lo pronto aquí
const firestoreObtenerServiciosConsultor = async (empresa, consultor) => {
    let serviciosFirestore;
    const serviciosRef = config_2.default.collection(`/general/${empresa}/consultores/${consultor}/servicios/`);
    //const query = serviciosRef.where('servicio', '==', servicio);
    await serviciosRef.get().then(snap => serviciosFirestore = mostrar_documentos_2.retornaDocumentos(snap));
    //console.log(servicioFirestore[0]);
    return serviciosFirestore;
};
const googleCalendarObtenerCitasAgendadas = async (fechaInicio, fechaFin, empresa, consultor) => {
    //Debe devolver un arreglo con horas  [10,13] significaría que hay citas a las 10 de la mañana y a la 1 de la tarde
    //let horariosReservados: any[] = [10,13];
    let horariosReservados = [];
    let parametros;
    //Obtener el id del calendario de Google del consultor
    const parametrosRef = config_2.default.collection(`/general/${empresa}/consultores/${consultor}/config/`).doc('parametros');
    parametros = (await parametrosRef.get()).data();
    const idCalendar = parametros.idCalendar;
    const timeMin = fechaConDiferenciaHoraria(fechaInicio.toDate());
    const timeMax = fechaConDiferenciaHoraria(fechaFin.toDate());
    const events = await listEvents2(idCalendar, timeMin, timeMax);
    if (events != undefined) {
        if (events.length) {
            horariosReservados = events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                const end = event.end.dateTime || event.end.date;
                const utcOffSet = obtenerMinutosOffSet(start.substr(0, 10));
                let horarioMoment = { hiMoment: moment(start).add(utcOffSet, 'minutes'),
                    hfMoment: moment(end).add(utcOffSet, 'minutes') };
                return horarioMoment;
            });
        }
    }
    return horariosReservados;
};
async function getEvent(idCalendar, idEvent) {
    //Luego optimizar esto para ver si existe o no el evento porque como aquí truena...
    try {
        const calendar = google.calendar({ version: 'v3', auth: serviceAccountAuth });
        const res = await calendar.events.get({ calendarId: idCalendar, eventId: idEvent });
        return res.data;
    }
    catch (_a) {
        return null;
    }
}
async function patchEvent(idCalendar, idEvent, newDescription, cancelar) {
    const calendar = google.calendar({ version: 'v3', auth: serviceAccountAuth });
    var event = /*await*/ calendar.events.get({ calendarId: idCalendar, eventId: idEvent });
    // Example showing a change in the location
    event.description = newDescription;
    if (cancelar) {
        event.status = 'cancelled';
    }
    return calendar.events.patch({ calendarId: idCalendar, eventId: idEvent, resource: event }, (err) => {
        if (err) {
            console.log(err);
            /*mensaje = 'Calendar Event Creation Error: ' + err;
            response.send({ mensaje: mensaje });*/
        }
        /*
        mensaje = 'Evento creado en el calendario.';
        response.send({ mensaje: mensaje });
        */
    });
}
async function listEvents2(idCalendar, timeMin, timeMax) {
    const calendar = google.calendar({ version: 'v3', auth: serviceAccountAuth });
    ///////////////////
    //Pruebas para lo de la zona horaria
    /*
    console.log('**ZONA-HORARIA**');
    
    let momenttz = require('moment-timezone');
    //console.log(momenttz().tz("America/Mexico_City").format());
    //var a = momenttz.tz("2013-6-18 11:55", "America/Mexico_City");
    let a = momenttz.tz([2021, 5, 18], "America/Mexico_City");
    console.log(a.format()); //2021-06-18T00:00:00-05:00
    console.log(a.utc().format()); //2021-06-18T05:00:00Z

    let b = momenttz.tz([2021, 10, 1], "America/Mexico_City");
    console.log(b.format()); //2021-11-01T00:00:00-06:00
    console.log(b.utc().format()); //2021-11-01T06:00:00Z

    let c = momenttz.tz([2021, 5, 18], "Asia/Tokyo");
    console.log(c.format()); //2021-06-18T00:00:00+09:00
    console.log(c.utc().format()); //2021-06-17T15:00:00Z
    */
    //////////////////
    const res = await calendar.events.list({
        calendarId: idCalendar,
        timeMin: timeMin,
        timeMax: timeMax,
        //maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });
    const events = res.data.items;
    if (events.length) {
        //events.forEach(el => console.log(el.summary))
        // console.log(events)
        // eventList = events
        return events;
    }
    else {
        console.log('No upcoming events found.');
    }
}
//Pendiente: Aquí mejor restringir, si ya se tiene una fecha, la consulta a sólo los días o día que se quiere saber, por lo que leí de
//los #precios
const firestoreObtenerJornadaLaboralCompleta = async (empresa, consultor) => {
    let jornada;
    const jornadaRef = config_2.default.collection(`/general/${empresa}/consultores/${consultor}/jornada/`);
    await jornadaRef.get().then(snap => jornada = mostrar_documentos_2.retornaDocumentos(snap));
    return jornada;
};
function quitarHorariosDisponiblesPorCitas(horariosTotales, citasAgendadas) {
    let horarios = [];
    let i = 0;
    horariosTotales.forEach(horario => {
        let hi = horario.hi;
        let hf = horario.hf;
        let noDisponiblePorComida = horario.disponible == false;
        let disp = true;
        citasAgendadas.forEach(cita => {
            /////////////////////////////////////////////////////////////////////////
            //Todo esto va a la función donde se va a agregar las citas ya agendadas
            /////////////////////////////////////////////////////////////////////////
            if (disp)
                disp = hi >= cita.hiMoment && hf <= cita.hfMoment ? false : true;
        });
        let hora = {
            hi,
            hf,
            horaInicio: hi.format(formato),
            horaFin: hf.format(formato)
        };
        if (noDisponiblePorComida)
            hora = Object.assign(Object.assign({}, hora), { disponible: false, motivo: 'comida' });
        else if (!disp)
            hora = Object.assign(Object.assign({}, hora), { disponible: false, motivo: 'cita-agendada' });
        else
            hora = Object.assign(Object.assign({}, hora), { disponible: true });
        horarios[i] = hora;
        i++;
        /////////////////////////////////////////////////////////////////////////
    });
    return horarios;
}
//Ésta de acá abajo es la que se transformará en el PASO 2 en el que ya también
//le voy a pasar la duración del servicio que pretendan agendar los clientes
function obtenerHorariosDisponibles(horariosTotales, duracionServicio) {
    //let horariosDisponibles: any[] = [];
    let horariosDisponiblesAux = [];
    //Número de casillas consecutivas que necesita:
    const nc = duracionServicio / 15;
    let opcion = 1;
    for (let i = 0; i < horariosTotales.length; i++) {
        let dispAux = horariosTotales[i].disponible;
        let hi = horariosTotales[i].hi;
        let hf = moment();
        for (let j = 1; j < nc; j++) {
            if (!dispAux)
                break;
            if (horariosTotales[i + j] != undefined) {
                dispAux = dispAux && horariosTotales[i + j].disponible;
                hf = horariosTotales[i + j].hf;
            }
            else
                dispAux = false;
        }
        if (dispAux == true) {
            //horariosDisponibles.push(horariosTotales[i]);
            horariosDisponiblesAux.push({
                opcion: opcion++,
                hi, hf, horaInicioFormat: hi.format(formato), horaFinFormat: hf.format(formato), fecha: hi.format(formatoF)
            });
        }
    }
    return horariosDisponiblesAux;
}
const obtenerHorariosDisponiblesTotales = async (oB) => {
    let horariosDisponiblesTotales = [];
    const serviciosFirestore = await firestoreObtenerServiciosConsultor(oB.empresa, oB.consultor);
    let duracionServicio = -1;
    let mensaje = 'ok';
    //NOTA: Si no se proporciona un servicio y se tienen 2 o más se regresa la lista
    //de servicios registrados para el consultor, SI SÓLO HAY UN SERVICIO REGISTRADO se devuelven las opciones de horarios
    //para el único servicio que existe registrado!!!
    if (serviciosFirestore.length == 0) {
        mensaje = `No existen servicios registrados para el consultor dado.`;
        return { horarios: horariosDisponiblesTotales, servicio: '', servicios: serviciosFirestore, mensaje: mensaje };
    }
    else if (oB.servicio == '' && serviciosFirestore.length > 1) {
        console.log(serviciosFirestore);
        //throw new Error(`Debe seleccionar un servicio de los de la lista anterior.`);
        mensaje = `Debe seleccionar un servicio de la lista de servicios.`;
        return { horarios: horariosDisponiblesTotales, servicio: '', servicios: serviciosFirestore, mensaje: mensaje };
    }
    else if (oB.servicio == '' && serviciosFirestore.length == 1) {
        oB.servicio = serviciosFirestore[0].servicio;
    }
    const servicioFirestore = serviciosFirestore.filter(s => s.servicio == oB.servicio)[0];
    if (servicioFirestore == undefined) {
        console.log(serviciosFirestore);
        mensaje = `No existe el servicio de ${oB.servicio} para el consultor ${oB.consultor}`;
        return { horarios: horariosDisponiblesTotales, servicio: '', servicios: serviciosFirestore, mensaje: mensaje };
    }
    else //Obtener la duración del servicio con base en el servicio proporcionado.
     {
        console.log(`Se darán las opciones de citas sobre el servicio de ${servicioFirestore.servicio} para el consultor ${oB.consultor} de la empresa ${oB.empresa}:`);
        duracionServicio = servicioFirestore.duracion;
    }
    let jornadaCompleta = await firestoreObtenerJornadaLaboralCompleta(oB.empresa, oB.consultor);
    const utcOffSet = obtenerMinutosOffSet(obtenerFechaHoyString());
    const now = moment().add(utcOffSet, 'minutes');
    //const now = moment();
    let fechaInicio;
    let diasARevisar = 1;
    //Pendiente: Aquí va a depender de lo que traiga el fFH dado!!!
    if (oB.datosFiltroFechaHora.fechaExacta) {
        //let fecha = oB.datosFiltroFechaHora.fecha;
        let fecha = new Date(oB.datosFiltroFechaHora.fecha);
        fechaInicio = moment({ year: fecha.getFullYear(), month: fecha.getMonth(), date: fecha.getDate() });
    }
    else {
        fechaInicio = moment({ year: now.year(), month: now.month(), date: now.date() });
        diasARevisar = oB.datosFiltroFechaHora.diasARevisar;
    }
    const fechasJornadas = obtenerFechasJornadas_SOLODIASLABORALES(jornadaCompleta, fechaInicio, diasARevisar);
    const fechaMaxBusqueda = fechasJornadas[fechasJornadas.length - 1].fecha.clone().add(1, 'days');
    //let citasAgendadas = await googleCalendarObtenerCitasAgendadas(fechasJornadas[0].fecha, fechasJornadas[fechasJornadas.length - 1].fecha, oB.empresa, oB.consultor);
    let citasAgendadas = await googleCalendarObtenerCitasAgendadas(fechasJornadas[0].fecha, fechaMaxBusqueda, oB.empresa, oB.consultor);
    for (let i = 0; i < fechasJornadas.length; i++) {
        let fj = fechasJornadas[i];
        let horariosConComida = cursorObtenerArregloHorariosConHoras(fj.fecha, fj.jornada);
        //Aquí después filtrar en firestore sólo para la fecha seleccionada para que no vaya a arrojar tooodas las citas
        //let citasAgendadas = await firestoreObtenerCitasAgendadas(fj.fecha, oB.empresa, oB.consultor);
        let horariosTotales = quitarHorariosDisponiblesPorCitas(horariosConComida, citasAgendadas);
        let horariosDisponibles = obtenerHorariosDisponibles(horariosTotales, duracionServicio);
        //Hacer el push e imprimir:
        horariosDisponiblesTotales.push(...horariosDisponibles);
    }
    //Función para cuando el cliente quiera filtrar por mañana, tarde, noche o madrugada
    //Pendiente: Aquí va a depender de lo que traiga el fFH dado!!!
    const tipoHorario = oB.tipoHorario == undefined ? "normal" : oB.tipoHorario;
    if (oB.datosFiltroFechaHora.horarioSolicitado != '')
        horariosDisponiblesTotales = filtrarPorRangos(horariosDisponiblesTotales, oB.datosFiltroFechaHora.horarioSolicitado, tipoHorario);
    else if (oB.datosFiltroFechaHora.horaExacta) {
        horariosDisponiblesTotales = filtrarPorHoraExacta(horariosDisponiblesTotales, new Date(oB.datosFiltroFechaHora.hora));
    }
    //En todos los caso debo devolver sólo los horarios cuya hi sea mayor al moment() actual!!!
    horariosDisponiblesTotales = filtrarDateTimeNow(horariosDisponiblesTotales);
    //RIER. 28/05/2021 También voy a filtrar para que si sólo tiene servicios de una hora de horarios cerrados y no de 15 minutos
    //como hasta ahora, si tiene de media hora de horarios cerrados y de medias horas y si tiene de 15 o más dé (por lo pronto para
    //el PMV) todos los horarios que tenía de 15 minutos. NOTA: Esta función por el momento sólo es para el PMV, se deberá perfeccionar
    //después revisando por día los horarios de entrada (minutos de entrada) de cada jornada, viendo los servicios de dos horas, etc...
    horariosDisponiblesTotales = filtrarXReglaHorariosAcotados(horariosDisponiblesTotales, serviciosFirestore);
    return { horarios: horariosDisponiblesTotales, servicio: servicioFirestore.servicio, jornadaCompleta, mensaje };
};
/*
export const obtenerHorariosAxiosCloudFunction = functions.https.onRequest(async(request, response) => {


    axios.post('https://us-central1-cascaron-bwto.cloudfunctions.net/obtener-horarios/obtenerHorariosCloudFunction', request.body)
    .then(function(res:any) {
        if(res.status==200) {
            console.log('Se obtuvo info!!!');
            response.send(res.data.horarios);
        }
    })
    .catch(function(err:any) {
        console.log(err);
        response.send(err);
    })
    .then(function() {
        console.log('none');
        response.send('none');
    });
});
*/
//export const cancelarRecordatorioCloudFunction = functions.https.onRequest(async(request, response) => {
exports.cancelarRecordatorioCloudFunction = async (request, response) => {
    const eventId = request.body.eventId;
    const idCalendar = await obtenerIdCalendarioJEP();
    const event = await getEvent(idCalendar, eventId);
    if (event) {
        if (event.description.indexOf(leyendaCancelada) == -1) {
            const newDescription = event.description + "\n" + leyendaCancelada;
            await patchEvent(idCalendar, eventId, newDescription, true);
            //response.send({mensaje: 'ok'});
            return { mensaje: 'ok' };
        }
        else {
            //response.send({mensaje: 'La cita ya ha sido cancelada previamente.'});
            return { mensaje: 'La cita ya ha sido cancelada previamente.' };
        }
    }
    else {
        //response.send({mensaje: 'No existe nungún evento con el id proporcionado.'});
        return { mensaje: 'No existe nungún evento con el id proporcionado.' };
    }
};
exports.cancelarCitaCloudFunction = async (request, response) => {
    const eventId = request.body.id;
    const empresa = request.body.empresa;
    const consultor = request.body.consultor;
    const clienteId = request.body.clienteId;
    const idCalendar = await obtenerIdCalendarioPorConsultor(empresa, consultor);
    const event = await getEvent(idCalendar, eventId);
    //Cancelarla (y desaparecerla) en Google Calendar
    if (event) {
        if (event.description.indexOf(leyendaCancelada) == -1) {
            const newDescription = event.description + "\n" + leyendaCancelada;
            await patchEvent(idCalendar, eventId, newDescription, true);
            //Actualizar en firestore
            await config_2.default.collection(`clientes-v2/${clienteId}/eventos`).doc(eventId).update({ "estatus": "cancelado cliente", hrCancelacion: new Date() });
            return { mensaje: 'ok' };
        }
        else {
            return { mensaje: 'La cita ya ha sido cancelada previamente.' };
        }
    }
    else {
        return { mensaje: 'No existe ningún evento con el id proporcionado.' };
    }
};
//export const confirmarRecordatorioCloudFunction = functions.https.onRequest(async(request, response) => {
exports.confirmarRecordatorioCloudFunction = async (request, response) => {
    const eventId = request.body.eventId;
    const idCalendar = await obtenerIdCalendarioJEP();
    const event = await getEvent(idCalendar, eventId);
    if (event) {
        if (event.description.indexOf(leyendaCancelada) == -1) {
            if (event.description.indexOf(leyendaConfirmada) == -1) {
                const newDescription = event.description + "\n" + leyendaConfirmada;
                await patchEvent(idCalendar, eventId, newDescription, false);
                const start = event.start.dateTime || event.start.date;
                const cliente = obtenerDatosCliente(event.description);
                const horaCita = moment(start).add(obtenerMinutosOffSet(start.substr(0, 10)), 'minutes');
                const la = horaCita.hours() == 13 || horaCita.hours() == 1;
                enviarMensajeTwilioDireccionUrlFoto(eventId, cliente.telefono, la, horaCita.format(formatoRecordatorio));
                //response.send({mensaje: 'ok'});
                return { mensaje: 'ok' };
            }
            else {
                //response.send({mensaje: 'La cita ya ha sido confirmada previamente.'});
                return { mensaje: 'La cita ya ha sido confirmada previamente.' };
            }
        }
        else {
            //response.send({mensaje: 'La cita ya ha sido cancelada previamente. Genere una nueva cita con la ayuda del siguiente enlace: https://wa.me/+14155238886/?text=Quiero%20hacer%20una%20cita'});
            return { mensaje: 'La cita ya ha sido cancelada previamente. Genere una nueva cita con la ayuda del siguiente enlace: https://wa.me/+14155238886/?text=Quiero%20hacer%20una%20cita' };
        }
    }
    else {
        //response.send({mensaje: 'No existe nungún evento con el id proporcionado.'});
        return { mensaje: 'No existe nungún evento con el id proporcionado.' };
    }
};
//export const enviarRecordatoriosCloudFunction = functions.https.onRequest(async(request, response) => {
exports.enviarRecordatoriosCloudFunction = async (request, response) => {
    const utcOffSet = obtenerMinutosOffSet(obtenerFechaHoyString());
    const now = moment().add(utcOffSet, 'minutes');
    const fechaHoy = moment({ year: now.year(), month: now.month(), date: now.date() });
    const timeMin = fechaConDiferenciaHoraria(fechaHoy.clone().add(1, 'days').toDate()); //Mañana a las 0 hrs.
    const timeMax = fechaConDiferenciaHoraria(fechaHoy.clone().add(2, 'days').toDate()); //Pasadomañana a las 0 hrs.
    const idCalendar = await obtenerIdCalendarioJEP();
    const events = await listEvents2(idCalendar, timeMin, timeMax);
    let noEventosTotales = 0;
    let noRecordatoriosEnviados = 0;
    if (events != undefined) {
        if (events.length) {
            events.forEach((event) => {
                //si ya confirmó no debe hacer nada!!!
                noEventosTotales = events.length;
                if (event.description.indexOf(leyendaConfirmada) == -1) {
                    noRecordatoriosEnviados++;
                    //console.log(event);
                    const start = event.start.dateTime || event.start.date;
                    const cliente = obtenerDatosCliente(event.description);
                    const horaCita = moment(start).add(obtenerMinutosOffSet(start.substr(0, 10)), 'minutes');
                    const la = horaCita.hours() == 13 || horaCita.hours() == 1;
                    const linkGenerico = 'https://wa.me/+14155238886/?text=';
                    const clave = `%20con%20la%20clave:%20${event.id}`;
                    const linkConfirmacion = linkGenerico + 'CONFIRMO' + clave;
                    const linkCancelacion = linkGenerico + 'CANCELO' + clave;
                    const mensaje = obtenerMensajeRecordatorio(cliente.nombre, horaCita.format(formatoRecordatorio), la, linkConfirmacion, linkCancelacion);
                    console.log(`whatsapp:${cliente.telefono}`);
                    //Enviar mensaje de WA a través de twilio
                    client.messages.create({
                        //mediaUrl:['https://www.meditips.com/wp-content/uploads/2019/01/consultorio-1024x683.jpeg'],
                        from: 'whatsapp:' + phoneNumber,
                        //body: `${cliente.nombre}, si confirmas escribe *Confirmo ${event.id}* o selecciona el siguiente link: https://wa.me/+14155238886/?text=Confirmo%20${event.id}`,
                        body: mensaje,
                        to: `whatsapp:${cliente.telefono}`
                    }).then(function (message) {
                        //response.send({eventId: event.id});
                        return { eventId: event.id };
                        console.log('***terminio**');
                    });
                }
            });
        }
    }
    //response.send({mensaje: 'ok', eventosTotales: noEventosTotales, recordatoriosEnviados: noRecordatoriosEnviados, eventosConfirmadosPreviamente: noEventosTotales - noRecordatoriosEnviados, timeMin, timeMax, fechaHoy});
    return { mensaje: 'ok', eventosTotales: noEventosTotales, recordatoriosEnviados: noRecordatoriosEnviados, eventosConfirmadosPreviamente: noEventosTotales - noRecordatoriosEnviados, timeMin, timeMax, fechaHoy };
};
exports.mensajePruebaTwilioCloudFunction = async (request, response) => {
    const accountSid2 = 'AC161440481f8d26feb74ba57e201943b1';
    const authToken2 = '8f3b9beda8d6232f9662cf3bc8593404';
    const clientLoope = require('twilio')(accountSid2, authToken2);
    clientLoope.messages.create({
        //mediaUrl:['https://www.meditips.com/wp-content/uploads/2019/01/consultorio-1024x683.jpeg'],
        from: 'whatsapp:' + phoneNumber,
        //body: `${cliente.nombre}, si confirmas escribe *Confirmo ${event.id}* o selecciona el siguiente link: https://wa.me/+14155238886/?text=Confirmo%20${event.id}`,
        body: 'prueba',
        to: `whatsapp:5215548636127`
    }).then(function (message) {
        return { eventId: '' };
    });
    return { mensaje: 'ok' };
};
function obtenerDatosCliente(description) {
    //TODO:
    //Retornar a traves de la descripción el nombre y el teléfono del cliente
    /*
    description=
    'Servicio: Cita de valoración.\n' +
    'Cliente: Ivan Ramírez López.\n' +
    'Teléfono de contacto: 5548636127.'
   */
    const sCliente = 'Cliente: ';
    const todoDespuesDeCliente = description.substr(description.indexOf(sCliente));
    const primerPuntoIndexOf = todoDespuesDeCliente.indexOf('.');
    const nombre = todoDespuesDeCliente.substr(sCliente.length, primerPuntoIndexOf - sCliente.length);
    const sTel = 'Teléfono de contacto: ';
    const todoDespuesDeTelefono = description.substr(description.indexOf(sTel));
    const primerPuntoIndexOfT = todoDespuesDeTelefono.indexOf('.');
    let telefono = todoDespuesDeTelefono.substr(sTel.length, primerPuntoIndexOfT - sTel.length);
    telefono = telefono.trim().replace('(', '').replace(')', '');
    return { nombre: nombre + ' (' + telefono + ')', telefono: '+5215548636127' };
}
function obtenerMensajeRecordatorio(nombre, horaCita, la, linkConfirmacion, linkCancelacion) {
    const las = la ? 'la' : 'las';
    const mensaje = "¡Hola " + nombre + "! Buen día, soy Monse Uzcanga, asistente personal del Doctor Jorge Espinosa Prieto. El motivo de mi mensaje es para recordarle y confirmar la *cita* que tiene programada con nosotros el día de *mañana a " + las + " " + horaCita + "*. Le recuerdo que en caso de no confirmar su cita, quedará cancelada y se reprogramará de acuerdo a disponibilidad de agenda.\n\nPara *CONFIRMAR LA CITA* envíe el mensaje de confirmación con la ayuda del siguiente enlace:\n" + linkConfirmacion + "\n\nPara *CANCELAR LA CITA* envíe el mensaje de cancelación con la ayuda del siguiente enlace:\n" + linkCancelacion;
    return mensaje;
}
;
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
export const getNombreClienteCloudFunction = functions.https.onRequest(async(request, response) => {
    const req = request.body;
    let res = {status: 400, data: {nombre: ''}};
    const nombreCliente = await obtenerNombreClientePorCanal(req.canal, req.chatId);
    if (nombreCliente != ''){
        res = {status: 200, data: {nombre: nombreCliente}};
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    response.send(res);
});
*/
exports.getNombreClienteCloudFunction = async (request, response) => {
    const req = request.body;
    let res = { status: 400, data: { nombre: '' } };
    const clienteNombre = await obtenerNombreClientePorCanal(req.canal, req.chatId);
    if (clienteNombre != '') {
        res = { status: 200, data: { nombre: clienteNombre } };
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //response.send(res);
    return res;
};
const obtenerNombreClientePorCanal = async (canal, chatId) => {
    let nombreCliente = '';
    const cliente = await obtenerClientePorCanal(canal, chatId);
    if (cliente != null) {
        nombreCliente = cliente.nombre;
    }
    return nombreCliente;
};
//En esta función SIEMPRE voy a devolver opciones más cercanas y del día de la semana que están solicitando
//export const obtenerHorariosCloudFunction2 = functions.https.onRequest(async(request, response) => {
exports.obtenerHorariosCloudFunction2 = async (request, response) => {
    const req = request.body;
    let exacto = true; //Indica si a la primera encontró las opciones disponibles
    let data = await obtenerHorariosDisponiblesTotales(req);
    //Si no encontró nada debemos dar más opciones al cliente, para no dejarlo con la sensación de que no podrá hacer su cita
    if (data.horarios.length == 0) {
        const now = moment().add(obtenerMinutosOffSet(obtenerFechaHoyString()), 'minutes');
        //fechaExacta = true
        if (req.datosFiltroFechaHora.fechaExacta) {
            data = await obtenerMasOpcionesCaso1(data, req, now);
            exacto = false;
        }
        else if (req.datosFiltroFechaHora.horaExacta) {
            data = await obtenerMasOpcionesCaso2(data, req, now);
            exacto = false;
        }
        else {
            data = await obtenerMasOpcionesCaso3(data, req, now);
            exacto = true; //Nota: ahí seguir mandando la bandera de exacto en true porque el usuario no sabe de cuántos días se enviaron a revisar de inicio.
        }
    }
    //Para regresar algo más digerible:////////////////////////////////////////////////////////////////////////////
    const horariosDigeridos = obtenerHorariosDigeridos(data.horarios, req.textos, req.consultor, req.empresa, data.servicio, 1);
    //RIER. 28062021. Obtener nombre del cliente:
    const nombreCliente = await obtenerNombreCliente(req.telefono);
    const res = { servicio: data.servicio, horarios: horariosDigeridos, nombreCliente: nombreCliente, exacto };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //response.send(res);
    return res;
};
/*
1.  Si dan fecha exacta entonces ir buscando uno adelante uno atrás, dos adelante, dos atrás (cuidando que las fechas de sumas o restas sean
    iguales o mayores al día de hoy y en todos los casos quito lo de mañana o tarde.
    Por lo menos debe dar un horario con el día de la fecha solicitada (l, m, mi, etc) (siempre y cuando el día sea laboral).
*/
async function obtenerMasOpcionesCaso1(data, req, now) {
    const nowMex = momenttz.tz([now.year(), now.month(), now.date()], "America/Mexico_City");
    let sumaDias = 1;
    let auxParImpar = 1;
    let limite = 1; // Sólo vamos a hacer máximo 10 iteraciones para evitar que se nos vaya a ciclar (y nos repercuta en la facturación :P)
    //Primero va a buscar los más cercanos por fecha
    while (data.horarios.length == 0 && limite <= 10) {
        let reqAux = Object.assign({}, req);
        reqAux.datosFiltroFechaHora = Object.assign({}, req.datosFiltroFechaHora);
        const multiplica = auxParImpar % 2 == 0 ? -1 : 1;
        const sumaDiasAux = sumaDias * multiplica;
        const fechaMas = momenttz.tz(reqAux.datosFiltroFechaHora.fecha, "America/Mexico_City").add(sumaDiasAux, 'days'); //2021-06-18T00:00:00-05:00
        if (fechaMas >= nowMex) {
            reqAux.datosFiltroFechaHora.fecha = fechaMas.format(); //'2021-07-05T12:00:00-05:00'
            //Manda llamar otra vez al método a ver si ahora sí regresa algo:
            data = await obtenerHorariosDisponiblesTotales(reqAux);
        }
        //++
        if (multiplica < 0)
            sumaDias++;
        auxParImpar++;
        limite++;
    }
    //*** Ahora va a buscar por el día igual de la semana ***
    const fechaOriginal = moment(moment(req.datosFiltroFechaHora.fecha).format(formatoF));
    const esLaboral = esDiaLaboral(data.jornadaCompleta, fechaOriginal);
    if (esLaboral) {
        sumaDias = 7;
        auxParImpar = 1;
        limite = 1; // Sólo vamos a hacer máximo 10 iteraciones para evitar que se nos vaya a ciclar (y nos repercuta en la facturación :P)
        //Primero va a buscar los más cercanos por fecha
        const lenHorariosObtenidosParte1 = data.horarios.length;
        while (data.horarios.length == lenHorariosObtenidosParte1 && limite <= 10) {
            let reqAux = Object.assign({}, req);
            reqAux.datosFiltroFechaHora = Object.assign({}, req.datosFiltroFechaHora);
            const multiplica = auxParImpar % 2 == 0 ? -1 : 1;
            const sumaDiasAux = sumaDias * multiplica;
            const fechaMas = momenttz.tz(reqAux.datosFiltroFechaHora.fecha, "America/Mexico_City").add(sumaDiasAux, 'days'); //2021-06-18T00:00:00-05:00
            if (fechaMas >= nowMex) {
                reqAux.datosFiltroFechaHora.fecha = fechaMas.format(); //'2021-07-05T12:00:00-05:00'
                //Manda llamar otra vez al método a ver si ahora sí regresa algo:
                const data2 = await obtenerHorariosDisponiblesTotales(reqAux);
                if (data2.horarios.length > 0)
                    data.horarios.push(...data2.horarios);
            }
            //++
            if (multiplica < 0)
                sumaDias += 7;
            auxParImpar++;
            limite++;
        }
    }
    return data;
}
/*
2. Si dan hora específica, quitar lo de hora Exacta y buscar en ese mismo día y uno adelante y uno atrás.
   (Nota, si no especificaron fecha entonces el día 0 sería now)
*/
async function obtenerMasOpcionesCaso2(data, req, now) {
    const nowMex = momenttz.tz([now.year(), now.month(), now.date()], "America/Mexico_City");
    let sumaDias = 0;
    let auxParImpar = 1;
    let limite = 1; // Sólo vamos a hacer máximo 10 iteraciones para evitar que se nos vaya a ciclar (y nos repercuta en la facturación :P)
    //Primero va a buscar los más cercanos por fecha
    while (data.horarios.length == 0 && limite <= 10) {
        let reqAux = Object.assign({}, req);
        reqAux.datosFiltroFechaHora = Object.assign({}, req.datosFiltroFechaHora);
        reqAux.datosFiltroFechaHora.fechaExacta = true;
        reqAux.datosFiltroFechaHora.horaExacta = false;
        reqAux.datosFiltroFechaHora.horarioSolicitado = 'cualquiera';
        const multiplica = auxParImpar % 2 == 0 ? -1 : 1;
        const sumaDiasAux = sumaDias * multiplica;
        const ceroNegativo = multiplica == -1 && sumaDias == 0;
        if (!ceroNegativo) {
            //Nota, si no especificaron fecha entonces el día 0 sería now...Siempre va a ser now porque si especificaron fecha entra al caso1
            const fechaMas = nowMex.clone().add(sumaDiasAux, 'days'); //2021-06-18T00:00:00-05:00
            console.log('**sumaDiasAux**');
            console.log(sumaDiasAux);
            if (fechaMas >= nowMex) {
                reqAux.datosFiltroFechaHora.fecha = fechaMas.format(); //'2021-07-05T12:00:00-05:00'
                //Manda llamar otra vez al método a ver si ahora sí regresa algo:
                data = await obtenerHorariosDisponiblesTotales(reqAux);
                console.log('**ENTRODATA!!!**');
                console.log(reqAux.datosFiltroFechaHora.fecha);
            }
        }
        //++
        if (multiplica < 0)
            sumaDias++;
        auxParImpar++;
        limite++;
        console.log('**ENTRO!!!**');
    }
    return data;
}
/*
    3. Si no especificaron fecha exacta ni hora exacta entonces ir buscando 1 adelante (diasarevisar + 1) en cada iteración.
    Nota: ahí seguir mandando la bandera de exacto en true porque el usuario no sabe de cuántos días se enviaron a revisar de inicio.

    4. (Este entra en el anterior escenario) Si dieron horario-solicitado entonces ir buscando desde el día en cuestión hasta que
    encuentre opción para el horario solicitado.
*/
async function obtenerMasOpcionesCaso3(data, req, now) {
    let sumaDias = 1;
    let limite = 1; // Sólo vamos a hacer máximo 10 iteraciones para evitar que se nos vaya a ciclar (y nos repercuta en la facturación :P)
    //Primero va a buscar los más cercanos por fecha
    while (data.horarios.length == 0 && limite <= 10) {
        let reqAux = Object.assign({}, req);
        reqAux.datosFiltroFechaHora = Object.assign({}, req.datosFiltroFechaHora);
        reqAux.datosFiltroFechaHora.diasARevisar += sumaDias;
        console.log('**reqAux.datosFiltroFechaHora.diasARevisar**');
        console.log(reqAux.datosFiltroFechaHora.diasARevisar);
        //Manda llamar otra vez al método a ver si ahora sí regresa algo:
        data = await obtenerHorariosDisponiblesTotales(reqAux);
        //++
        sumaDias++;
        limite++;
    }
    return data;
}
function obtenerHorariosDigeridos(horariosDisponiblesTotales, textos, consultor, empresa, servicio, opcionComienza) {
    let horariosAux = horariosDisponiblesTotales;
    let horarios = [];
    let opcion = opcionComienza;
    const fechaHoyString = obtenerFechaHoyString();
    const now = moment().add(obtenerMinutosOffSet(fechaHoyString), 'minutes');
    horariosAux.forEach(x => {
        let horarioDigerido = {
            opcion: opcion++,
            consultor: consultor,
            inicio: x.horaInicioFormat,
            fin: x.horaFinFormat,
            fechaInicio: x.hi.format(formatoF),
            fechaFin: x.hf.format(formatoF),
            textos: textos == 1 ? textoDigerido1(x.hi, now) : textoDigerido2(x.hi, now, consultor, empresa, servicio)
        };
        horarios.push(horarioDigerido);
    });
    return horarios;
}
const firestoreObtenerConsultores = async (empresa) => {
    let consultoresFirestore = [];
    let consultores = [];
    const consultoresRef = config_2.default.collection(`/general/${empresa}/consultores/`);
    await consultoresRef.get().then(snap => consultoresFirestore = mostrar_documentos_2.retornaDocumentos(snap));
    consultoresFirestore.forEach(x => {
        consultores.push(x.id);
    });
    return consultores;
};
exports.obtenerConsultoresByRequest = async (oB) => {
    let consultores = [];
    //Si no se proporcionó un consultor en específico entonces obtener a todos los consultores de la empresa
    if (oB.consultor == undefined || oB.consultor == '') {
        consultores = await firestoreObtenerConsultores(oB.empresa);
    }
    else {
        consultores.push(oB.consultor);
    }
    return consultores;
};
exports.obtenerConsultoresCloudFunction = async (request, response) => {
    const oB = request.body;
    let consultores = await exports.obtenerConsultoresByRequest(oB);
    //ya después obtener los servicios
    //const serviciosFirestore = await firestoreObtenerServiciosConsultor(oB.empresa, oB.consultor);
    return { status: 200, mensaje: 'ok', data: { consultores } };
};
exports.obtenerCitasClienteCloudFunction = async (request, response) => {
    const req = request.body;
    let citas = [];
    let citasAux = [];
    const cliente = await obtenerClientePorCanal(req.canal, req.chatId);
    const fechaHoyString = obtenerFechaHoyString();
    const now = moment().add(obtenerMinutosOffSet(fechaHoyString), 'minutes');
    if (cliente != null) {
        const clienteId = cliente.id;
        const citasRef = config_2.default.collection(`clientes-v2/${clienteId}/eventos`);
        const query = citasRef.where('inicio', '>', new Date());
        await query.get().then(snap => citasAux = mostrar_documentos_2.retornaDocumentos(snap));
        citasAux = citasAux.filter(cita => cita.estatus == 'agendado');
        let opcion = 1;
        citasAux.forEach(cita => {
            const utcOffSet = obtenerMinutosOffSet(cita.inicio.toDate().toISOString().substr(0, 10));
            const citaInicio = moment.unix(cita.inicio.seconds).add(utcOffSet, 'minutes');
            let citaComplementadaConCliente = Object.assign(Object.assign({ opcion: opcion++ }, cita), { clienteId: clienteId, textos: textoDigerido2(citaInicio, now, cita.consultor, cita.empresa, cita.servicio) });
            citas.push(citaComplementadaConCliente);
        });
    }
    return { mensaje: 'ok', data: { citasEncontradas: citas.length, citas } };
};
exports.obtenerServiciosCloudFunction = async (request, response) => {
    const oB = request.body;
    let consultores = await exports.obtenerConsultoresByRequest(oB);
    let serviciosRes = [];
    for (let i = 0; i <= consultores.length - 1; i++) {
        let consultor = consultores[i];
        let servicios = await firestoreObtenerServiciosConsultor(oB.empresa, consultor);
        let servicioDigerido = {
            consultor: consultor,
            servicios: servicios.map((servicio) => servicio.servicio)
        };
        serviciosRes.push(servicioDigerido);
    }
    return { status: 200, mensaje: 'ok', data: { servicios: serviciosRes } };
};
exports.guardarHorariosCloudFunction = async (request, response) => {
    const oB = request.body;
    const dieronConsultor = oB.consultor != '';
    if (dieronConsultor) {
        //////////////////////////////////////////////////// H O R A R I O S ////////////////////////////////////////
        let horariosDisponiblesTotales = await obtenerHorariosDisponiblesTotales(oB);
        const horariosDigeridos = obtenerHorariosDigeridos(horariosDisponiblesTotales.horarios, oB.textos, oB.consultor, oB.empresa, horariosDisponiblesTotales.servicio, 1);
        if (horariosDisponiblesTotales.servicio != '') {
            //RIER. 28062021. Obtener nombre del cliente:
            const nombreCliente = await obtenerNombreClientePorCanal(request.body.canal, request.body.telefono);
            const res = { servicio: horariosDisponiblesTotales.servicio, horarios: horariosDigeridos, nombreCliente: nombreCliente, pedir: 'horario', mensaje: horariosDisponiblesTotales.mensaje };
            //response.send(res);
            return res;
        }
        else {
            let opcion = 1;
            let serviciosAux = horariosDisponiblesTotales.servicios;
            let servicios = [];
            serviciosAux.forEach(x => {
                let servicioDigerido = {
                    opcion: opcion++,
                    servicio: x.servicio
                };
                servicios.push(servicioDigerido);
            });
            const res = { servicios: servicios, horarios: horariosDigeridos, pedir: 'servicio', mensaje: horariosDisponiblesTotales.mensaje };
            //response.send(res);
            return res;
        }
    }
    else { //NO DIERON CONSULTOR
        //1. Si no proporcionaron servicio, revisar si la empresa sólo tiene un único servicio entre todos sus consultores entonces continuar,
        //Nota: Si tienen más de un servicio entre sus consultores entonces devolver la lista de servicios para ver cuál es el que van a querer (pedir = servicio).
        if (oB.servicio == '') {
            let consultorServiciosCF = await exports.obtenerServiciosCloudFunction({ "body": { "empresa": oB.empresa } }, null);
            const servicios = consultorServiciosCF.data.servicios;
            let serviciosUnicos = [];
            servicios.forEach((s) => {
                s.servicios.forEach((ss) => {
                    if (serviciosUnicos.indexOf(ss) == -1) {
                        serviciosUnicos.push(ss);
                    }
                });
            });
            //Si la empresa cuenta con más de un servicio entonces devolver los servicios con los que cuenta para que el usuario seleccione uno
            if (serviciosUnicos.length > 1) {
                let opcion = 1;
                let serviciosRes = [];
                let horarios = [];
                serviciosUnicos.forEach(x => {
                    let servicioDigerido = {
                        opcion: opcion++,
                        servicio: x
                    };
                    serviciosRes.push(servicioDigerido);
                });
                const mensaje = 'La empresa cuenta con más de un servicio así que debe seleccionar uno de la lista';
                const res = { servicios: serviciosRes, horarios: horarios, pedir: 'servicio', mensaje: mensaje };
                return res;
            }
        }
        //2. Obtener a todos los consultores de la empresa y hacer la consulta de los horarios por cada uno de los consultores e irlos
        //acumulando (push) en un arreglote que devolveré con los horarios de cada consultor de acuerdo a los parámetros dados
        let servicioRes = '';
        let horariosDigeridosTotales = [];
        let consultores = await (await exports.obtenerConsultoresCloudFunction({ "body": { "empresa": oB.empresa } }, null)).data.consultores;
        for (let i = 0; i <= consultores.length - 1; i++) {
            let consultor = consultores[i];
            let oBAux = Object.assign({}, oB);
            oBAux.consultor = consultor;
            console.log(oBAux);
            let horariosDisponiblesTotales = await obtenerHorariosDisponiblesTotales(oBAux);
            if (horariosDisponiblesTotales.horarios.length > 0) {
                servicioRes = horariosDisponiblesTotales.servicio;
                const horariosDigeridos = obtenerHorariosDigeridos(horariosDisponiblesTotales.horarios, oBAux.textos, oBAux.consultor, oBAux.empresa, servicioRes, (horariosDigeridosTotales.length + 1));
                horariosDigeridosTotales.push(...horariosDigeridos);
            }
        }
        const nombreCliente = await obtenerNombreClientePorCanal(request.body.canal, request.body.telefono);
        const res = { servicio: servicioRes, horarios: horariosDigeridosTotales, nombreCliente: nombreCliente, pedir: 'horario', mensaje: 'ok' };
        //response.send(res);
        console.log('**Aquí ya va a guardar en la BD**');
        const idConsulta = request.body.canal + "-" + request.body.telefono;
        await config_2.default.collection(`consultas-horarios/`).doc(idConsulta).set(res);
        return res;
    }
};
exports.obtenerHorariosBDCloudFunction = async (request, response) => {
    const consulta = await obtenerConsultaHorariosPorCanalCliente(request.body.canal, request.body.telefono);
    //const res = {servicio: horariosDisponiblesTotales.servicio, horarios: horariosDigeridos, nombreCliente: nombreCliente, pedir: 'horario', mensaje: horariosDisponiblesTotales.mensaje};
    const res = consulta;
    return res;
};
exports.obtenerHorariosCloudFunction = async (request, response) => {
    const oB = request.body;
    const dieronConsultor = oB.consultor != '';
    if (dieronConsultor) {
        //////////////////////////////////////////////////// H O R A R I O S ////////////////////////////////////////
        let horariosDisponiblesTotales = await obtenerHorariosDisponiblesTotales(oB);
        const horariosDigeridos = obtenerHorariosDigeridos(horariosDisponiblesTotales.horarios, oB.textos, oB.consultor, oB.empresa, horariosDisponiblesTotales.servicio, 1);
        if (horariosDisponiblesTotales.servicio != '') {
            //RIER. 28062021. Obtener nombre del cliente:
            const nombreCliente = await obtenerNombreClientePorCanal(request.body.canal, request.body.telefono);
            const res = { servicio: horariosDisponiblesTotales.servicio, horarios: horariosDigeridos, nombreCliente: nombreCliente, pedir: 'horario', mensaje: horariosDisponiblesTotales.mensaje };
            //response.send(res);
            return res;
        }
        else {
            let opcion = 1;
            let serviciosAux = horariosDisponiblesTotales.servicios;
            let servicios = [];
            serviciosAux.forEach(x => {
                let servicioDigerido = {
                    opcion: opcion++,
                    servicio: x.servicio
                };
                servicios.push(servicioDigerido);
            });
            const res = { servicios: servicios, horarios: horariosDigeridos, pedir: 'servicio', mensaje: horariosDisponiblesTotales.mensaje };
            //response.send(res);
            return res;
        }
    }
    else { //NO DIERON CONSULTOR
        //1. Si no proporcionaron servicio, revisar si la empresa sólo tiene un único servicio entre todos sus consultores entonces continuar,
        //Nota: Si tienen más de un servicio entre sus consultores entonces devolver la lista de servicios para ver cuál es el que van a querer (pedir = servicio).
        if (oB.servicio == '') {
            let consultorServiciosCF = await exports.obtenerServiciosCloudFunction({ "body": { "empresa": oB.empresa } }, null);
            const servicios = consultorServiciosCF.data.servicios;
            let serviciosUnicos = [];
            servicios.forEach((s) => {
                s.servicios.forEach((ss) => {
                    if (serviciosUnicos.indexOf(ss) == -1) {
                        serviciosUnicos.push(ss);
                    }
                });
            });
            //Si la empresa cuenta con más de un servicio entonces devolver los servicios con los que cuenta para que el usuario seleccione uno
            if (serviciosUnicos.length > 1) {
                let opcion = 1;
                let serviciosRes = [];
                let horarios = [];
                serviciosUnicos.forEach(x => {
                    let servicioDigerido = {
                        opcion: opcion++,
                        servicio: x
                    };
                    serviciosRes.push(servicioDigerido);
                });
                const mensaje = 'La empresa cuenta con más de un servicio así que debe seleccionar uno de la lista';
                const res = { servicios: serviciosRes, horarios: horarios, pedir: 'servicio', mensaje: mensaje };
                return res;
            }
        }
        //2. Obtener a todos los consultores de la empresa y hacer la consulta de los horarios por cada uno de los consultores e irlos
        //acumulando (push) en un arreglote que devolveré con los horarios de cada consultor de acuerdo a los parámetros dados
        let servicioRes = '';
        let horariosDigeridosTotales = [];
        let consultores = await (await exports.obtenerConsultoresCloudFunction({ "body": { "empresa": oB.empresa } }, null)).data.consultores;
        for (let i = 0; i <= consultores.length - 1; i++) {
            let consultor = consultores[i];
            let oBAux = Object.assign({}, oB);
            oBAux.consultor = consultor;
            console.log(oBAux);
            let horariosDisponiblesTotales = await obtenerHorariosDisponiblesTotales(oBAux);
            if (horariosDisponiblesTotales.horarios.length > 0) {
                servicioRes = horariosDisponiblesTotales.servicio;
                const horariosDigeridos = obtenerHorariosDigeridos(horariosDisponiblesTotales.horarios, oBAux.textos, oBAux.consultor, oBAux.empresa, servicioRes, (horariosDigeridosTotales.length + 1));
                horariosDigeridosTotales.push(...horariosDigeridos);
            }
        }
        const nombreCliente = await obtenerNombreClientePorCanal(request.body.canal, request.body.telefono);
        const res = { servicio: servicioRes, horarios: horariosDigeridosTotales, nombreCliente: nombreCliente, pedir: 'horario', mensaje: 'ok' };
        //response.send(res);
        return res;
    }
};
/*
export const obtenerHorariosCloudFunctionRESPALDO = async(request:any, response:any) => {
    const oB = request.body;
    let horariosDisponiblesTotales = await obtenerHorariosDisponiblesTotales(oB);
    //Para regresar algo más digerible:////////////////////////////////////////////////////////////////////////////
    let horariosAux: any[] = horariosDisponiblesTotales.horarios;
    let horarios : any[] = [];
    let opcion = 1;
    const fechaHoyString = obtenerFechaHoyString();
    const now = moment().add(obtenerMinutosOffSet(fechaHoyString), 'minutes');
    horariosAux.forEach(x => {
        let horarioDigerido = {
            opcion: opcion++,
            consultor: oB.consultor,
            inicio: x.horaInicioFormat,
            fin: x.horaFinFormat,
            fechaInicio: x.hi.format(formatoF),
            fechaFin: x.hf.format(formatoF),
            textos: request.body.textos == 1 ? textoDigerido1(x.hi, now) : textoDigerido2(x.hi, now)
        };
        horarios.push(horarioDigerido);
    });

    if (horariosDisponiblesTotales.servicio != ''){
        //RIER. 28062021. Obtener nombre del cliente:
        const nombreCliente = await obtenerNombreClientePorCanal(request.body.canal, request.body.telefono);
        const res = {servicio: horariosDisponiblesTotales.servicio, horarios: horarios, nombreCliente: nombreCliente, pedir: 'horario'};
        //response.send(res);
        return res;
    } else {
        let opcion = 1;
        let serviciosAux: any[] = horariosDisponiblesTotales.servicios;
        let servicios : any[] = [];
        serviciosAux.forEach(x => {
            let servicioDigerido = {
                opcion: opcion++,
                servicio: x.servicio
            };
            servicios.push(servicioDigerido);
        });
        const res = {servicios: servicios, horarios: horarios, pedir: 'servicio'};
        //response.send(res);
        return res;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};
*/
exports.guardarCitaCloudFunction = async (request, response) => {
    //export async function guardarCitaCloudFunction (request:any, response:any) {
    const req = request.body;
    const nombreCliente = req.cliente.nombre;
    const canal = req.cliente.canal;
    const telefonoCompleto = req.cliente.telefono;
    const cumpleanos = new Date(req.cliente.cumpleanos);
    const telefonoCliente = `(+${telefonoCompleto.substr(0, 3)}) ${telefonoCompleto.substr(telefonoCompleto.length - 10)}`;
    const guardarCliente = req.guardarCliente;
    const servicio = req.servicio;
    const fechaInicio = req.opcionElegida.fechaInicio;
    const fechaFin = req.opcionElegida.fechaFin;
    const hrInicio = req.opcionElegida.inicio;
    const hrFin = req.opcionElegida.fin;
    const empresa = req.empresa;
    const consultor = req.consultor;
    //Guardar teléfono del cliente y nombre del mismo en la base de firestore:
    //Pendiente validar que no exista antes, porque salen más cara$ las escrituras que las lecturas
    let idCliente = '';
    const clienteV2 = await obtenerClientePorCanal(canal, telefonoCompleto);
    if (clienteV2 != null)
        idCliente = clienteV2.id;
    if (guardarCliente) {
        let guarda = true;
        let datosCliente = {};
        if (canal == "telegram") {
            datosCliente = {
                nombre: nombreCliente,
                fechaCumple: cumpleanos,
                telegram: telefonoCompleto,
            };
        }
        else if (canal == "whatsapp") {
            datosCliente = {
                nombre: nombreCliente,
                fechaCumple: cumpleanos,
                whatsapp: telefonoCompleto,
            };
        }
        else {
            guarda = false; //Por lo pronto sólo si los canales son whatsapp o telegram que guarde los datos
        }
        //Validar que no exista el cliente previamente para que no genere duplicados!
        if (guarda && clienteV2 == null)
            idCliente = await (await config_2.default.collection(`clientes-v2`).add(datosCliente)).id;
    }
    ///////////////////////////////////////////////////////////////////////////
    //Obener calendarId y ubicación del consultor
    let parametros;
    const parametrosRef = config_2.default.collection(`/general/${empresa}/consultores/${consultor}/config/`).doc('parametros');
    parametros = (await parametrosRef.get()).data();
    const calendarId = parametros.idCalendar;
    const direccion = parametros.direccion;
    /////////////////////////////////////////GUARDAR EN GOOGLE CALENDAR//////////////////////////////////////////
    const calendar = google.calendar({ version: 'v3', auth: serviceAccountAuth });
    //const diferenciaHoraria = obtenerDiferenciaHorariaDesdeGoogleCalendar();
    const diferenciaHoraria = obtenerDiferenciaHorariaDesdeGoogleCalendar(fechaInicio);
    //const eventStartTime = new Date(fecha + ' ' + hrInicio);
    //const eventEndTime = new Date(fecha + ' ' + hrFin);
    //const eventStartTime = "2021-06-11T10:00:00-05:00";
    //const eventEndTime = "2021-06-11T10:30:00-05:00";
    const eventStartTime = fechaInicio + "T" + hrInicio + ":00" + diferenciaHoraria;
    const eventEndTime = fechaFin + "T" + hrFin + ":00" + diferenciaHoraria;
    //Armar el evento
    const event = {
        summary: servicio,
        location: direccion,
        description: `Servicio: ${servicio}.\nCliente: ${nombreCliente}.\nTeléfono de contacto: ${telefonoCliente}.`,
        start: {
            dateTime: eventStartTime,
        },
        end: {
            dateTime: eventEndTime,
        },
        //Para que no me mande el error seguir estos pasos: https://developers.google.com/identity/protocols/oauth2/service-account
        //attendees: [{'email': emailCliente},],
        colorId: 2
    };
    let mensaje = '';
    var res = await calendar.freebusy.query({
        resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            //timeZone: 'America/Mexico_City',
            items: [{ id: calendarId }]
        }
    });
    const eventsArr = res.data.calendars[calendarId].busy;
    if (eventsArr.length === 0) {
        const newEvent = await calendar.events.insert({ calendarId: calendarId, resource: event });
        await guardarCitaEnFirestore(newEvent.data, idCliente, empresa, consultor, servicio);
        //calendar.events.insert({ calendarId: calendarId, resource: event });
        mensaje = `Perfecto, ${nombreCliente} tu cita ya se encuentra reservada, te sugerimos acudir 15 min antes de tu cita para evitar aglomeraciones, recibirás notificaciones para poder dar segumiento a tu cita, el folio de identificacion es ${newEvent.data.id} además del QR de identificación`;
        return { mensaje: mensaje };
    }
    else {
        mensaje = 'Una disculpa, ya está ocupado ese espacio en el calendario.';
        console.log(mensaje);
        return { mensaje: mensaje };
    }
};
//export const guardarCitaCloudFunction = functions.https.onRequest(async(request, response) => {
exports.guardarCitaCloudFunctionJEP = async (request, response) => {
    //export async function guardarCitaCloudFunction (request:any, response:any) {
    const req = request.body;
    const nombreCliente = req.cliente.nombre;
    const telefonoCompleto = req.cliente.telefono;
    const telefonoCliente = `(+${telefonoCompleto.substr(0, 3)}) ${telefonoCompleto.substr(telefonoCompleto.length - 10)}`;
    const guardarCliente = req.guardarCliente;
    //const emailCliente = req.cliente.email;
    const servicio = req.servicio;
    const fechaInicio = req.opcionElegida.fechaInicio;
    const fechaFin = req.opcionElegida.fechaFin;
    const hrInicio = req.opcionElegida.inicio;
    const hrFin = req.opcionElegida.fin;
    const empresa = req.empresa;
    const consultor = req.consultor;
    //Guardar teléfono del cliente y nombre del mismo en la base de firestore:
    //Pendiente validar que no exista antes, porque salen más cara$ las escrituras que las lecturas
    if (guardarCliente) {
        const datosCliente = {
            nombre: nombreCliente,
            telefono: telefonoCompleto
        };
        await config_2.default.collection(`clientes`).doc(telefonoCompleto).set(datosCliente);
    }
    ///////////////////////////////////////////////////////////////////////////
    //Obener calendarId y ubicación del consultor
    let parametros;
    const parametrosRef = config_2.default.collection(`/general/${empresa}/consultores/${consultor}/config/`).doc('parametros');
    parametros = (await parametrosRef.get()).data();
    const calendarId = parametros.idCalendar;
    const direccion = parametros.direccion;
    /////////////////////////////////////////GUARDAR EN GOOGLE CALENDAR//////////////////////////////////////////
    const calendar = google.calendar({ version: 'v3', auth: serviceAccountAuth });
    //const diferenciaHoraria = obtenerDiferenciaHorariaDesdeGoogleCalendar();
    const diferenciaHoraria = obtenerDiferenciaHorariaDesdeGoogleCalendar(fechaInicio);
    //const eventStartTime = new Date(fecha + ' ' + hrInicio);
    //const eventEndTime = new Date(fecha + ' ' + hrFin);
    //const eventStartTime = "2021-06-11T10:00:00-05:00";
    //const eventEndTime = "2021-06-11T10:30:00-05:00";
    const eventStartTime = fechaInicio + "T" + hrInicio + ":00" + diferenciaHoraria;
    const eventEndTime = fechaFin + "T" + hrFin + ":00" + diferenciaHoraria;
    //Armar el evento
    const event = {
        summary: servicio,
        location: direccion,
        description: `Servicio: ${servicio}.\nCliente: ${nombreCliente}.\nTeléfono de contacto: ${telefonoCliente}.`,
        start: {
            dateTime: eventStartTime,
        },
        end: {
            dateTime: eventEndTime,
        },
        //Para que no me mande el error seguir estos pasos: https://developers.google.com/identity/protocols/oauth2/service-account
        //attendees: [{'email': emailCliente},],
        colorId: 2
    };
    let mensaje = '';
    var res = await calendar.freebusy.query({
        resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            //timeZone: 'America/Mexico_City',
            items: [{ id: calendarId }]
        }
    });
    const eventsArr = res.data.calendars[calendarId].busy;
    if (eventsArr.length === 0) {
        await calendar.events.insert({ calendarId: calendarId, resource: event });
        //calendar.events.insert({ calendarId: calendarId, resource: event });
        mensaje = 'Evento creado en el calendario.';
        return { mensaje: mensaje };
    }
    else {
        mensaje = 'Una disculpa, ya está ocupado ese espacio en el calendario.';
        console.log(mensaje);
        return { mensaje: mensaje };
    }
};
/*
export const guardarCitaCloudFunction_RESPALDO = async(request:any, response:any) => {
    
    const req = request.body;
    const nombreCliente = req.cliente.nombre;
    const telefonoCompleto = req.cliente.telefono;
    const telefonoCliente = `(+${telefonoCompleto.substr(0,3)}) ${telefonoCompleto.substr(telefonoCompleto.length - 10)}`;
    const guardarCliente = req.guardarCliente;
    //const emailCliente = req.cliente.email;
    const servicio = req.servicio;
    const fechaInicio = req.opcionElegida.fechaInicio;
    const fechaFin = req.opcionElegida.fechaFin;
    const hrInicio = req.opcionElegida.inicio;
    const hrFin = req.opcionElegida.fin;
    const empresa = req.empresa;
    const consultor = req.consultor;

    //Guardar teléfono del cliente y nombre del mismo en la base de firestore:
    //Pendiente validar que no exista antes, porque salen más cara$ las escrituras que las lecturas
    if (guardarCliente){
        const datosCliente = {
            nombre: nombreCliente,
            telefono: telefonoCompleto
        }
        
        await db.collection(`clientes`).doc(telefonoCompleto).set(datosCliente);
    }
    ///////////////////////////////////////////////////////////////////////////

    //Obener calendarId y ubicación del consultor
    let parametros: any;
    const parametrosRef = db.collection(`/general/${empresa}/consultores/${consultor}/config/`).doc('parametros');
    parametros = (await parametrosRef.get()).data();
    const calendarId = parametros.idCalendar;
    const direccion = parametros.direccion;
    /////////////////////////////////////////GUARDAR EN GOOGLE CALENDAR//////////////////////////////////////////
    const calendar = google.calendar({ version: 'v3', auth: serviceAccountAuth });
    //const diferenciaHoraria = obtenerDiferenciaHorariaDesdeGoogleCalendar();
    const diferenciaHoraria = obtenerDiferenciaHorariaDesdeGoogleCalendar(fechaInicio);
    //const eventStartTime = new Date(fecha + ' ' + hrInicio);
    //const eventEndTime = new Date(fecha + ' ' + hrFin);
    //const eventStartTime = "2021-06-11T10:00:00-05:00";
    //const eventEndTime = "2021-06-11T10:30:00-05:00";
    const eventStartTime = fechaInicio + "T" + hrInicio + ":00" + diferenciaHoraria;
    const eventEndTime = fechaFin + "T" + hrFin + ":00" + diferenciaHoraria;

    //Armar el evento
    const event = {
        summary: servicio,
        location: direccion,
        description: `Servicio: ${servicio}.\nCliente: ${nombreCliente}.\nTeléfono de contacto: ${telefonoCliente}.`,
        start: {
            dateTime: eventStartTime,
            //La toma por default de la <<Zona horaria>> del calendario:
            //timeZone: 'America/Mexico_City'
        },
        end: {
            dateTime: eventEndTime,
            //Aquí está la base de datos completa de las zonas horarias: http://www.iana.org/time-zones
            //timeZone: 'America/Mexico_City'
        },
        //Para que no me mande el error seguir estos pasos: https://developers.google.com/identity/protocols/oauth2/service-account
        //attendees: [{'email': emailCliente},],
        colorId: 2
    }

    //Guardarlo (si no está ocupado ese espacio)
    let mensaje = '';
    calendar.freebusy.query({
        resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            //timeZone: 'America/Mexico_City',
            items: [{ id: calendarId }]
        }
    }, (err: any, res: any) => {
        if (err) {
            mensaje = 'Free Busy Query Error: ' + err;
            //response.send({ mensaje: mensaje });
            return { mensaje: mensaje };
        }
    
        const eventsArr = res.data.calendars[calendarId].busy;
    
        if (eventsArr.length === 0) return calendar.events.insert({ calendarId: calendarId, resource: event },
            (err:any) => {
                if (err){
                    mensaje = 'Calendar Event Creation Error: ' + err;
                    //response.send({ mensaje: mensaje });
                    return { mensaje: mensaje };
                }
    
                mensaje = 'Evento creado en el calendario.';
                //response.send({ mensaje: mensaje });
                return { mensaje: mensaje };
            })
    
        mensaje = 'Una disculpa, ya está ocupado ese espacio en el calendario.';
        console.log(mensaje);
        //response.send({ mensaje: mensaje });
        return { mensaje: mensaje };
    
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
   
    //response.send({ mensaje: '' });
    //return {mensaje: '' };
};
*/
function obtenerJornadaFechaEspecifica(jornadaCompleta, fecha) {
    const diaSemanaNumero = fecha.toDate().getDay();
    const diaSemanaLetra = obtenerDiaSemanaLetra(diaSemanaNumero);
    const diaJornada = jornadaCompleta.filter(dia => dia.id == diaSemanaLetra);
    let jornadaFormateada;
    if (diaJornada[0] != undefined) {
        jornadaFormateada = {
            entradaHr: parseInt(diaJornada[0].entrada.split(':')[0]),
            entradaMin: parseInt(diaJornada[0].entrada.split(':')[1]),
            iniComidaHr: diaJornada[0].ini_comida != undefined ? parseInt(diaJornada[0].ini_comida.split(':')[0]) : 0,
            iniComidaMin: diaJornada[0].ini_comida != undefined ? parseInt(diaJornada[0].ini_comida.split(':')[1]) : 0,
            finComidaHr: diaJornada[0].fin_comida != undefined ? parseInt(diaJornada[0].fin_comida.split(':')[0]) : 0,
            finComidaMin: diaJornada[0].fin_comida != undefined ? parseInt(diaJornada[0].fin_comida.split(':')[1]) : 0,
            salidaHr: parseInt(diaJornada[0].salida.split(':')[0]),
            salidaMin: parseInt(diaJornada[0].salida.split(':')[1]),
        };
    }
    else {
        jornadaFormateada = {
            entradaHr: 0, entradaMin: 0,
            iniComidaHr: 0, iniComidaMin: 0,
            finComidaHr: 0, finComidaMin: 0,
            salidaHr: 0, salidaMin: 0,
        };
    }
    //console.log('***JORNADAFORMATEADA**');
    //console.log(jornadaFormateada);
    return jornadaFormateada;
}
function obtenerDiaSemanaLetra(diaSemanaNumero) {
    let diaSemanaLetra = '';
    switch (diaSemanaNumero) {
        case 0:
            diaSemanaLetra = 'domingo';
            break;
        case 1:
            diaSemanaLetra = 'lunes';
            break;
        case 2:
            diaSemanaLetra = 'martes';
            break;
        case 3:
            diaSemanaLetra = 'miercoles';
            break;
        case 4:
            diaSemanaLetra = 'jueves';
            break;
        case 5:
            diaSemanaLetra = 'viernes';
            break;
        case 6:
            diaSemanaLetra = 'sabado';
            break;
        default:
            diaSemanaLetra = '';
    }
    return diaSemanaLetra;
}
function obtenerDiaSemanaLetraOrtografia(diaSemanaNumero) {
    let diaSemanaLetra = '';
    switch (diaSemanaNumero) {
        case 0:
            diaSemanaLetra = 'Domingo';
            break;
        case 1:
            diaSemanaLetra = 'Lunes';
            break;
        case 2:
            diaSemanaLetra = 'Martes';
            break;
        case 3:
            diaSemanaLetra = 'Miércoles';
            break;
        case 4:
            diaSemanaLetra = 'Jueves';
            break;
        case 5:
            diaSemanaLetra = 'Viernes';
            break;
        case 6:
            diaSemanaLetra = 'Sábado';
            break;
        default:
            diaSemanaLetra = '';
    }
    return diaSemanaLetra;
}
function obtenerMesLetra(diaMesNumero) {
    let mesLetra = '';
    switch (diaMesNumero) {
        case 0:
            mesLetra = 'enero';
            break;
        case 1:
            mesLetra = 'febrero';
            break;
        case 2:
            mesLetra = 'marzo';
            break;
        case 3:
            mesLetra = 'abril';
            break;
        case 4:
            mesLetra = 'mayo';
            break;
        case 5:
            mesLetra = 'junio';
            break;
        case 6:
            mesLetra = 'julio';
            break;
        case 7:
            mesLetra = 'agosto';
            break;
        case 8:
            mesLetra = 'septiembre';
            break;
        case 9:
            mesLetra = 'octubre';
            break;
        case 10:
            mesLetra = 'noviembre';
            break;
        case 11:
            mesLetra = 'diciembre';
            break;
        default:
            mesLetra = '';
    }
    return mesLetra;
}
//feliz cumpleaños a ti happy birthday form ver que vendas mucho marijco este año 
function obtenerFechasJornadas_SOLODIASLABORALES(jornadaCompleta, fechaIni, diasARevisar) {
    const fechasJornadas = [];
    //Aquí pedir mejor los días que se quieren revisar y con esos sumar pero sólo si son días laborales de la jornada completa
    let i = 0;
    let c = 0;
    //Si fechaIni es día laboral se suma al arreglo de fechasJornadas
    do {
        let fechaBucle = fechaIni.clone().add(c, 'days');
        if (esDiaLaboral(jornadaCompleta, fechaBucle)) {
            let jornadaBucle = obtenerJornadaFechaEspecifica(jornadaCompleta, fechaBucle);
            fechasJornadas[i] = { fecha: fechaBucle, jornada: jornadaBucle };
            i++;
        }
        c++;
    } while (fechasJornadas.length <= diasARevisar - 1);
    //console.log(fechasJornadas);
    return fechasJornadas;
}
function filtrarPorRangos(horariosDisponiblesTotales, horario, tipoHorario) {
    let horariosFiltrados = [];
    if (tipoHorario == 'normal') {
        switch (horario) {
            case 'mañana': //De las 6 de la manaña a antes de las 12 de la tarde
                horariosFiltrados = horariosDisponiblesTotales.filter(x => x.hi.toDate().getHours() >= 6 && x.hi.toDate().getHours() < 12);
                break;
            case 'tarde': //de las 12 de la tarde a antes de las 7 de la noche
                horariosFiltrados = horariosDisponiblesTotales.filter(x => x.hi.toDate().getHours() >= 12 && x.hi.toDate().getHours() < 19);
                break;
            case 'noche': //De las 7 de la noche a las 12 de la noche
                horariosFiltrados = horariosDisponiblesTotales.filter(x => x.hi.toDate().getHours() >= 19 || x.hi.toDate().getHours() < 1);
                break;
            case 'madrugada': //De la una de la mañana a las 5 de la mañana
                horariosFiltrados = horariosDisponiblesTotales.filter(x => x.hi.toDate().getHours() >= 1 && x.hi.toDate().getHours() < 6);
                break;
            case 'cualquiera': //No filtra nada
                horariosFiltrados = horariosDisponiblesTotales;
                break;
            case 'urgente': //El primero que encuentre
                horariosFiltrados = horariosDisponiblesTotales[0];
                break;
            default: //Si no encuentra coincidencia devuelve todos los horarios
                horariosFiltrados = horariosDisponiblesTotales;
                break;
        }
    }
    else { //Horario extendido, para denotar bloques largo de horarios, por ejemplo de la mañana aunque sea un bloque que tiene algunas horas de la tarde, etc
        switch (horario) {
            case 'mañana': //De las 6 de la manaña a antes de las 3 de la tarde
                horariosFiltrados = horariosDisponiblesTotales.filter(x => x.hi.toDate().getHours() >= 6 && x.hi.toDate().getHours() < 15);
                break;
            case 'tarde': //de las 3 de la tarde a antes de las 11 de la noche
                horariosFiltrados = horariosDisponiblesTotales.filter(x => x.hi.toDate().getHours() >= 15 && x.hi.toDate().getHours() < 23);
                break;
            case 'noche': //De las 11 de la noche a las 12 de la noche
                horariosFiltrados = horariosDisponiblesTotales.filter(x => x.hi.toDate().getHours() >= 23 || x.hi.toDate().getHours() < 1);
                break;
            case 'madrugada': //De la una de la mañana a las 5 de la mañana
                horariosFiltrados = horariosDisponiblesTotales.filter(x => x.hi.toDate().getHours() >= 1 && x.hi.toDate().getHours() < 6);
                break;
            case 'cualquiera': //No filtra nada
                horariosFiltrados = horariosDisponiblesTotales;
                break;
            case 'urgente': //El primero que encuentre
                horariosFiltrados = horariosDisponiblesTotales[0];
                break;
            default: //Si no encuentra coincidencia devuelve todos los horarios
                horariosFiltrados = horariosDisponiblesTotales;
                break;
        }
    }
    return horariosFiltrados;
}
function filtrarPorHoraExacta(horariosDisponiblesTotales, hora) {
    let horariosExactos = [];
    //console.log('hora: ' + hora.getHours() + ', minutos: ' + hora.getMinutes());
    horariosExactos = horariosDisponiblesTotales.filter(x => x.hi.toDate().getHours() == hora.getHours() && x.hi.toDate().getMinutes() == hora.getMinutes());
    return horariosExactos;
}
function filtrarDateTimeNow(horariosDisponiblesTotales) {
    let horariosExactos = [];
    const utcOffSetCliente = -300; //Este mandarlo desde el json de postman
    const nowUTCSinOffset = moment().utc().add(utcOffSetCliente, 'minutes');
    horariosExactos = horariosDisponiblesTotales.filter(x => x.hi.toDate() > /*new Date()*/ nowUTCSinOffset);
    return horariosExactos;
}
function filtrarXReglaHorariosAcotados(horariosDisponiblesTotales, servicios) {
    let horariosAcotados = [];
    const serviciosDe1Hora = servicios.filter(s => s.duracion == 60);
    const serviciosDeMediaHora = servicios.filter(s => s.duracion == 30);
    //Si sólo tiene servicios de 1 hora entonces sólo filtra horarios de minutos = 0
    if (servicios.length == serviciosDe1Hora.length) {
        horariosAcotados = horariosDisponiblesTotales.filter(x => x.hi.toDate().getMinutes() == 0);
    }
    //Si tuivera algún servicio de 30 minutos entonces da horarios cerrados y de medias horas
    else if (serviciosDeMediaHora.length > 0) {
        horariosAcotados = horariosDisponiblesTotales.filter(x => x.hi.toDate().getMinutes() == 0 || x.hi.toDate().getMinutes() == 30);
    }
    else //Si es algo distinto regresa todos los horarios disponibles
     {
        horariosAcotados = horariosDisponiblesTotales;
    }
    return horariosAcotados;
}
function esDiaLaboral(jornadaCompleta, fecha) {
    let jornadaARevisar = obtenerJornadaFechaEspecifica(jornadaCompleta, fecha);
    if (jornadaARevisar.entradaHr == 0 && jornadaARevisar.iniComidaHr == 0 && jornadaARevisar.finComidaHr == 0 && jornadaARevisar.salidaHr == 0)
        return false;
    else
        return true;
}
function fechaConDiferenciaHoraria(fechaUTC) {
    const fechaUTCString = fechaUTC.toISOString();
    const diferenciaHoraria = (obtenerDiferenciaHorariaDesdeGoogleCalendar(fechaUTCString.substr(0, 10))); //Ver cómo obtener esto desde el calendario de google
    const fechaLocal = fechaUTCString.replace('.000Z', diferenciaHoraria);
    return fechaLocal;
}
//Pendiente!!! ver cómo puedo sacar este dato del calendario de Google!!!
//Mejor lo voy a hacer con lo que encontré de momenttz
function obtenerDiferenciaHorariaDesdeGoogleCalendar(fecha) {
    const fechaSplit = fecha.split('-');
    const anio = parseInt(fechaSplit[0]);
    const mes = parseInt(fechaSplit[1]) - 1; //Se quita uno porque los meses para moment empiezan en 0 (0=enero...11=diciembre)
    const dia = parseInt(fechaSplit[2]);
    //Establecer la zona horaria de México para saber la diferencia horaria en dicha fecha (ya que para Horario de Verano es -05:00 y de Invierno es -06:00)
    //const momenttz = require('moment-timezone');
    const fechaMexico = momenttz.tz([anio, mes, dia], "America/Mexico_City").format(); //2021-06-18T00:00:00-05:00
    //Extraer la diferencia horaria, ya sea -05:00 o -06:00
    const diferenciaHoraria = fechaMexico.substr(fechaMexico.length - 6); //-05:00 o -06:00
    return diferenciaHoraria;
}
function obtenerMinutosOffSet(fecha) {
    const difGC = obtenerDiferenciaHorariaDesdeGoogleCalendar(fecha);
    const signo = difGC.substr(0, 1);
    const horas = parseInt(difGC.substr(1, 2));
    const minutos = parseInt(difGC.substr(4, 2));
    let offSet = (horas * 60) + minutos;
    if (signo === '-')
        offSet = offSet * (-1);
    //console.log('**OFFSET**');
    //console.log(offSet);
    return offSet;
}
function enviarMensajeTwilioDireccionUrlFoto(eventId, telefono, la, horaCita) {
    const las = la ? 'la' : 'las';
    console.log(`whatsapp:${telefono}`);
    client.messages.create({
        mediaUrl: ['https://firebasestorage.googleapis.com/v0/b/cascaron-bwto.appspot.com/o/foto_consultorio.jpg?alt=media&token=64d8c19f-a9b0-49f2-8e5f-005b1f395510'],
        from: 'whatsapp:' + phoneNumber,
        body: '*Gracias por su confirmación, nos vemos el día de mañana a ' + las + ' ' + horaCita + '*. Quisiera comentarle que el tiempo de tolerancia para su llegada es de 15 minutos. Esto en atención a usted y los demás pacientes, ya que merecen una consulta o procedimiento de calidad, de igual forma quisiera comentarle que a partir de ahora todos los pagos son en EFECTIVO, ya que no contamos con transferencia bancaria ni pago con tarjeta, muchas gracias. ¡Que tenga un excelente día!\n\n*Dirección del consultorio:*\nCuauhtémoc #1000, Col. Centro, Pachuca de Soto, Hidalgo.\n\n*Ubicación en Google Maps:*\nhttps://goo.gl/maps/ibpukmKDy4AFGxGr6',
        to: `whatsapp:${telefono}`
    }).then(function (message) {
        //response.send({eventId: event.id});
    });
}
function textoDigerido1(fh, now) {
    let dia = '';
    const manana = now.clone().add(1, 'days');
    const diaSemanaNumeroValidacion = fh.toDate().getDay() == 0 ? 7 : fh.toDate().getDay();
    const diaSemanaNumero = fh.toDate().getDay();
    const diaLetra = obtenerDiaSemanaLetraOrtografia(diaSemanaNumero);
    const fechaLetra = fh.date() + ' de ' + obtenerMesLetra(fh.month());
    const esHoy = now.date() == fh.date() && now.month() == fh.month() && now.year() == fh.year();
    const esManana = manana.date() == fh.date() && manana.month() == fh.month() && manana.year() == fh.year();
    const diff = fh.diff(now, 'days');
    const diaSemanaNumeroHoy = now.toDate().getDay() == 0 ? 7 : now.toDate().getDay();
    const esEstaSemana = diaSemanaNumeroValidacion >= diaSemanaNumeroHoy && diff < 7; //0 es domingo y 6 es sabado
    if (esHoy) {
        dia = 'Hoy';
    }
    else if (esManana) {
        dia = 'Mañana';
    }
    else {
        if (esEstaSemana) {
            dia = 'Este ' + diaLetra.toLowerCase();
        }
        else {
            dia = diaLetra + ' ' + fechaLetra;
        }
    }
    let fhFormato = fh.format(formatoTextos);
    if (fh.minutes() == 0)
        fhFormato = fhFormato.replace(':00', '');
    const las = fh.hours() == 13 || fh.hours() == 1 ? 'la' : 'las';
    const a_las = ' a ' + las + ' ';
    const alas = esEstaSemana ? a_las : ' - ';
    const horaLetra = alas + fhFormato;
    const textoRecortado = dia + horaLetra;
    const esHoyOManana = esHoy || esManana;
    const el = esHoyOManana ? '' : 'el ';
    let textoCompleto = esHoyOManana ? textoRecortado.toLowerCase() : el + diaLetra.toLowerCase() + ' ' + fechaLetra + horaLetra;
    textoCompleto = textoCompleto.replace(' - ', a_las);
    return { recortado: textoRecortado, completo: textoCompleto };
}
function textoDigerido2(fh, now, consultor, empresa, servicio) {
    let dia = '';
    const manana = now.clone().add(1, 'days');
    const diaSemanaNumeroValidacion = fh.toDate().getDay() == 0 ? 7 : fh.toDate().getDay();
    const diaSemanaNumero = fh.toDate().getDay();
    const diaLetra = obtenerDiaSemanaLetraOrtografia(diaSemanaNumero);
    const fechaLetra = fh.date() + ' de ' + obtenerMesLetra(fh.month());
    const esHoy = now.date() == fh.date() && now.month() == fh.month() && now.year() == fh.year();
    const esManana = manana.date() == fh.date() && manana.month() == fh.month() && manana.year() == fh.year();
    const diff = fh.diff(now, 'days');
    const diaSemanaNumeroHoy = now.toDate().getDay() == 0 ? 7 : now.toDate().getDay();
    const esEstaSemana = diaSemanaNumeroValidacion >= diaSemanaNumeroHoy && diff < 7; //0 es domingo y 6 es sabado
    if (esHoy) {
        dia = 'Hoy';
    }
    else if (esManana) {
        dia = 'Mañana';
    }
    else {
        if (esEstaSemana) {
            //dia = 'Este ' + diaLetra.toLowerCase();
            dia = diaLetra;
        }
        else {
            //dia = diaLetra.substr(0, 3) + ' ' + fechaLetra;
            dia = fechaLetra;
        }
    }
    let fhFormato = fh.format(formatoTextos);
    if (fh.minutes() == 0)
        fhFormato = fhFormato.replace(':00', '');
    const las = fh.hours() == 13 || fh.hours() == 1 ? 'la' : 'las';
    const a_las = ' a ' + las + ' ';
    const alas = esEstaSemana ? a_las : ' - ';
    const horaLetra = alas + fhFormato;
    let textoRecortado = dia + horaLetra;
    const esHoyOManana = esHoy || esManana;
    const el = esHoyOManana ? '' : 'el ';
    let textoCompleto = esHoyOManana ? textoRecortado.toLowerCase() /*.replace('am','AM').replace('pm','PM')*/ : el + diaLetra.toLowerCase() + ' ' + fechaLetra + horaLetra /*.replace('am','AM').replace('pm','PM')*/;
    textoRecortado = textoRecortado.replace(' - ', ' ').replace(' de ', ' ').replace(a_las, ' ') + ' con ' + consultor;
    textoCompleto = servicio + ' ' + textoCompleto.replace(' - ', a_las) + ' con ' + consultor + ' de ' + empresa;
    return { recortado: textoRecortado, completo: textoCompleto };
}
function obtenerFechaHoyString() {
    const now = moment();
    const fechaHoyString = now.year() + '-' + (now.month() + 1).toString() + '-' + now.date();
    return fechaHoyString;
}
async function guardarCitaEnFirestore(event, idCliente, empresa, consultor, servicio) {
    //const clienteV2 = await obtenerClientePorCanal(cliente.canal, cliente.telefono);
    const eventId = event.id;
    const start = event.start.dateTime || event.start.date;
    const end = event.end.dateTime || event.end.date;
    //const utcOffSet = obtenerMinutosOffSet(start.substr(0, 10));
    const startDate = moment(start) /*.add(utcOffSet, 'minutes')*/.toDate();
    const endDate = moment(end) /*.add(utcOffSet, 'minutes')*/.toDate();
    console.log('**eventId**');
    console.log(event.id);
    console.log('**idCliente**');
    console.log(idCliente);
    const evento = {
        //eventId: eventId,
        empresa: empresa,
        consultor: consultor,
        servicio: servicio,
        inicio: startDate,
        fin: endDate,
        estatus: 'agendado'
    };
    await config_2.default.collection(`clientes-v2/${idCliente}/eventos/`).doc(eventId).set(evento);
}
//# sourceMappingURL=funciones.js.map