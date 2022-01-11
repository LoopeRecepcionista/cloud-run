/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const express = require('express');
const request = require('request');
const funciones = require("./funciones");
const app = express();
const dialogflowSessionClient =
    require('../botlib/dialogflow_session_client.js');
const bodyParser = require('body-parser');

/* Sección de la llamada a la api de dialogflow */
const dialogflow = require('@google-cloud/dialogflow');
const structjson = require('./structjson.js');
const CREDENTIALS = {
    "type": "service_account",
    "project_id": "agente2-wdpe",
    "private_key_id": "5885812d968d890462fe6be76d45141cdf84bbe8",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDiexDcdiqImYjv\n5edl9E9E+ap0pUOp9eedgRkv3f7Qmf5TinYuRxLcDk7nlN8m8pRkUiHGicAmPebx\no2VaEUHn8w+iGCj5i6gvzgE+LBFeqUlCt1gTL17fLX1nT4/GHU83fLBDbqdtFY53\nnoa9fJt5qtadYKBDryhlGSX/VJH9gZheBblCz5TFMtyVmKFamU6cYLqSchkgVzLL\nfk8gwqHC+HYpG58P5eDc2q1tp5vGnvm6E8IAeONL7XWwKpmAhsz7kxSM9lFUQani\nLf7g2Xhspfenlv1E7XCaF/TTbyPgUt5taAtxaBF7Chf5J+UE7aODcg4Bw6TRjLd5\nkOmVKiPZAgMBAAECggEAGrPl3gh0pVxs39Qcf1HZ0skZBt3BZ5WdtF1XSeSDubae\nXN0zZ+trVtS9CuLrmJz7UAS7BLyTEi80PoNEXOUx/xYSXss4cYu8zb4dOWZaue19\nvMb/NGveZLPpWDfyPKqR/3nNEnZGeT8UaBghzM+XSTYSTcXpv3E0cw8PAtbGy7u2\nHIlky8MjSQbjeciYIsOZiKofWqAEFMflRHSHcB+kd2bhEHJUhYT+WUib2CT7UmYa\nkTyLUxEh05R42iN/601Q42SzYQtbhS0aRMQeKkqYuNumlUknb9cxSL5jsFkfCHzo\nL93pXb14YIz/7LV48dm1SHV4q8ToGa6xFiYy/C8WHQKBgQD30jLswvFexEceskGG\nFwxJUQkq3E6Cpcx/Xmgf6mfunXkk9lHBPFsyVlVnH3+OkDyzJEwMNUvb8tpswAlh\n0qbmyWDrbfAoa+mRqa4eoZd+S87TRBsu/o4fGpClRDxEsOieyrlYzMpT5iN70VIU\nttRreCKm5R1ZY/outK4pWvBNWwKBgQDp9JDKrBD/oX/AphRZ3ml2Mc9LcA46cts0\n44kEwBvMY/hcYr+hVbpT7/GKh4LhVb6UIes1IJrCvnon9gxo2f8rDRH3GjqWOIhZ\n484RAHM1ar4MNJRU4nZ49XN7/wVN/KC53JdmOOoA1gXnEtE4UwvlYLqb6gHFwn4z\nIb3F0FaV2wKBgCJVxSh4eeifWRsvp1RkrRcbWyHNFDOVtReQhOynFW9B8h7k4b7c\nFeaLf5miC5I8+av4Q3ENkU0QAKNAmAwtm2IuVHdJ7BQtn1bHI5Cq4spkxmsO7JU+\nP4Kfs5qyMYdy20fk3nknJoEpSZFGFxE3o4agRmzJIZ/Y8ji2X8rrBpAxAoGAQ8mO\nDntOrZLwvjQg3203J30FMDl2le7jnu5yrAKxy0YIF1Sxa6C4TUvPs7DR9lJu1uMB\nELKyxMyF/oAnVlYbvjCaTPu3kAEvWMRN19VGjGqySD0P4YyAgUm1PW9F7TPOqivF\nXmQNQVLCARMNtgEyCDM/vp9OBiv1fwE+yEs2W1MCgYBzxgCE9rxsj3Tlq7WefLJo\nPpVUMp94m8ptuFdvBtV++fTxEN+adz0fGNwmlgTqZIOAudejy1mNimNLk3v4sEqH\n6z5Cl9yPzOUvuFVs1jpDboMHHnCsmMr7O9YS7Ki6Ily9jtwAn4D3XIZsqj7FJj/S\nD0v6Y7fdKoXaIhfAwSA7JQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "account-service-dialogflow-clo@agente2-wdpe.iam.gserviceaccount.com",
    "client_id": "112018385948193053829",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/account-service-dialogflow-clo%40agente2-wdpe.iam.gserviceaccount.com"
};
const PROJECID = CREDENTIALS.project_id;
const CONFIGURATION = {
    credentials: {
        private_key: CREDENTIALS['private_key'],
        client_email: CREDENTIALS['client_email']
    }
}
const sessionClient2 = new dialogflow.SessionsClient(CONFIGURATION);

// Detect intent method
const detectIntent = async (languageCode, queryText, sessionId) => {

    let sessionPath = sessionClient2.projectAgentSessionPath(PROJECID, sessionId);

    // The text query request.
    let request = {
        session: sessionPath,
        queryParams: {
            payload: structjson.jsonToStructProto({WaId: sessionId/*'5215548636127'*/}),
        },
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: queryText,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient2.detectIntent(request);
    console.log(responses);
    const result = responses[0].queryResult;
    console.log(result);

    return {
        response: result.fulfillmentText
    };
}
/*************************************************/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {WebhookClient} = require('dialogflow-fulfillment');

//For authenticating dialogflow_session_client.js, create a Service Account and
// download its key file. Set the environmental variable
// GOOGLE_APPLICATION_CREDENTIALS to the key file's location.
//See https://dialogflow.com/docs/reference/v2-auth-setup and
// https://cloud.google.com/dialogflow/docs/setup for details.

//const projectId = 'tutorialagentesp-hpko';
const projectId = 'agente2-wdpe';
const phoneNumber = "+14155238886";
const accountSid = 'AC161440481f8d26feb74ba57e201943b1';
const authToken = '8f3b9beda8d6232f9662cf3bc8593404';

const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const sessionClient = new dialogflowSessionClient(projectId);

const listener = app.listen(process.env.PORT, function() {
  console.log('Your Twilio integration server is listening on port '
      + listener.address().port);
});

app.post('/', async function(req, res) {
  const body = req.body;
  const text = body.Body;
  const id = body.From;
  const dialogflowResponse = (await sessionClient.detectIntent(
      text, id, body)).fulfillmentText;
  const twiml = new  MessagingResponse();
  const message = twiml.message(dialogflowResponse);
  res.send(twiml.toString());
});

// Dialogflow route
app.post('/dialogflow', async (req, res) => {

    let languageCode = req.body.languageCode;
    let queryText = req.body.queryText;
    let sessionId = req.body.sessionId;

    let responseData = await detectIntent(languageCode, queryText, sessionId);

    const resp = { status: 200, data: { respuesta: responseData.response } };

    res.send(resp);
});

app.post('/getNombreClienteCloudFunction', async function(request, response) {
    const res = await funciones.getNombreClienteCloudFunction({ "body": request.body }, null);
    return response.status(200).send(res);
});

app.post('/dialogflowFirebaseFulfillment', async function(request, response) {
  const agent = new WebhookClient({ request, response });
    //console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    //console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
    //Lo que me dijo Mathew:
    const origen = request.body.originalDetectIntentRequest;
    //console.log('***ORIGEN***');
    //console.log(JSON.stringify(origen));
    async function welcome(agent) {
        const mensajeBienvenida = agent.parameters.mensajeBienvenida;
        let hola = agent.parameters.mensajeHola;
        const paramsChat = ParametrosOrigen(origen);
        const reqBody = { "canal": paramsChat.canal, "chatId": paramsChat.idchat };
        const data = await funciones.getNombreClienteCloudFunction({ "body": reqBody }, null);
        //console.log(data);
        if (data.status == 200) {
            hola = hola.replace('+nombre+', data.data.nombre);
        }
        else {
            hola = '';
        }
        agent.add(formateaMensajePorCanal(`${hola} ${mensajeBienvenida}`));
        //agent.setFollowupEvent('customEvent1'); 
    }
    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }
    function getAgentNameHandler(agent) {
        agent.add('From fulfillment: My name is Dialogflow!');
    }
    function languageHandler(agent) {
        const language = agent.parameters.language;
        const programmingLanguage = agent.parameters['language-programming'];
        if (language) {
            agent.add(`From fulfillment: Wow! I didn't know you knew ${language}`);
        }
        else if (programmingLanguage) {
            agent.add(`From fulfillment: ${programmingLanguage} is cool`);
        }
        else {
            agent.add(`From fulfillment: What language do you know?`);
        }
    }
    async function makeAnAppointmentHandler(agent) {
        let fecha = agent.parameters.fecha;
        let consultor = agent.parameters.consultor.toLowerCase() == 'no' ? '' : agent.parameters.consultor;
        let empresa = agent.parameters.empresa;
        let servicio = agent.parameters.servicio;
        let horarioSolicitado = agent.parameters['horario-solicitado'];
        let horaExacta = agent.parameters['hora-exacta'];
        let textos = agent.parameters.textos;
        let diasARevisar = agent.parameters.diasARevisar;
        //desplegarMensajeYContexto
        //console.log('Entró a función desplegarMensajeYContexto (within)');
        var reqBody = obtenerReqBody(fecha, empresa, consultor, servicio, horarioSolicitado, horaExacta, textos, diasARevisar);
        //console.log('reqBody(makeAnAppointmentHandler):');
        //console.log(JSON.stringify(reqBody));
        let result = {};
        result.data = await funciones.obtenerHorariosCloudFunction({ "body": reqBody }, null);
        //const mensajeAgent = obtenerMensajeAgent(empresa, consultor, horarioSolicitado, fecha, result);
        //agent.add(mensajeAgent);
        obtenerMensajeAgent(empresa, consultor, horarioSolicitado, fecha, servicio, horaExacta, diasARevisar, result);
        //////////////////////////////////////////
    }
    function obtenerMensajeAgent(empresa, consultor, horarioSolicitado, fecha, servicio, horaExacta, diasARevisar, result) {
        //let mensajeAgent = '';
        //console.log(result.data.horarios.length);
        let contexto = obtenerContexto(result.data); //Extraer de aquí el nombreCliente también para ponerlo abajo como contexto.nombreCliente
        let listaHorarios = result.data.horarios;
        if (result.data.pedir == 'servicio') {
            //Esta opción es cuando la función sí requiere solicitar forzosamente el servicio para que después ya con el servicio se vuelva a invocar la solicitud de lista de opciones
            //agent.add(`¿¿Para qué servicio desea agendar??... (${fecha} - ${empresa} - ${consultor} - ${servicio} - ${horarioSolicitado} - ${horaExacta})`);
            //agent.add(agent.parameters.defaultNoHay);
            //Esta opción es cuando la función sí requiere solicitar forzosamente el servicio para que después ya con el servicio se vuelva a invocar la solicitud de lista de opciones
            let listaServicios = result.data.servicios;
            let cadenota = '';
            listaServicios.map(opcion => {
                let cadena = `${opcion.opcion}) ${opcion.servicio}.\n`;
                cadenota = cadenota + cadena;
            });
            agent.setContext({ name: 'solicitud-ingresar-servicio', lifespan: 2, parameters: { fecha: fecha, empresa: empresa, consultor: consultor, servicio: servicio, horariosolicitado: horarioSolicitado, horaexacta: horaExacta, diasarevisar: diasARevisar, listaServicios: listaServicios } });
            agent.add(formateaMensajePorCanal(`${empresa} tiene los siguientes servicios :\n\n${cadenota}\n\n ¿Cuál desea agendar? (Escriba solamente el NÚMERO de la opción deseada.)`));
        }
        else if (listaHorarios.length == 1) {
            //Aquí dar los contextos de opcion-seleccionada y dio-lista-opciones. NOTA: En opción seleccionada poner la opción 1 por default
            agent.setContext({ name: 'dio-lista-opciones', lifespan: 5, parameters: { empresa: empresa, consultor: consultor, servicio: result.data.servicio, listaopciones: listaHorarios, nombreCliente: contexto.nombreCliente } });
            agent.setContext({ name: contexto.contexto, lifespan: 5, parameters: { opcion: 1 } });
            agent.add(formateaMensajePorCanal(`*¿Está seguro de confirmar su cita para ${listaHorarios[0].textos.completo}?*`));
        }
        else {
            //Esta opción ya es cuando la función arrojó una lista de opciones (aquí debería devolver una lista con el formato [{ opcion: 1, fecha: 2021-05-01, hora: 17:00 }, { opcion: 1, fecha: 2021-05-01, hora: 18:00 }] o algo así
            agent.setContext({ name: 'dio-lista-opciones', lifespan: 5, parameters: { consultor: consultor, empresa: empresa, servicio: result.data.servicio, listaopciones: listaHorarios, nombreCliente: contexto.nombreCliente } });
            //agent.add(`¿¿Qué opción eliges de la 1 a la ${listaOpciones.length}??... (${fecha} - ${empresa} - ${consultor} - ${servicio} - ${horarioSolicitado} - ${horaExacta})`);
            let cadenota = '';
            listaHorarios.map(opcion => {
                let cadena = `*${opcion.opcion}*) ${opcion.textos.recortado}.\n`;
                cadenota = cadenota + cadena;
            });
            cadenota = cadenota.substring(0, 1100); //Por la limitante que tiene Twilio
            let lio = cadenota.lastIndexOf('\n');
            cadenota = cadenota.substring(0, lio);
            //const enla = horarioSolicitado == 'tarde' ? 'en la tarde' : 'en la mañana';
            const sininguna = fecha == '' ? `\n\n Si ninguna de las opciones se ajusta a tus necesidades puedes decirnos la fecha específica escribiendo: *Quiero hacer una cita para el 20 de octubre* (sustituyendo el 20 de octubre por la fecha deseada).` : '';
            agent.add(formateaMensajePorCanal(`*Encontramos las siguientes opciones disponibles para ${result.data.servicio}*:\n\n${cadenota}\n\n*Selecciona escribiendo el número de la opción deseada.*${sininguna}`));
        }
        //return mensajeAgent;
    }
    async function cancelarCitaHandler(agent) {
        const paramsChat = ParametrosOrigen(origen);
        //console.log('**cancelarCitaHandler-paramsChat**');
        //console.log(JSON.stringify(paramsChat));
        const reqBody = { "canal": paramsChat.canal, "chatId": paramsChat.idchat };
        //Para pruebas desde el emulador:
        //const reqBody = {"canal": "telegram", "chatId": "1748772958"};
        const data = (await funciones.obtenerCitasClienteCloudFunction({ "body": reqBody }, null)).data;
        //console.log(data.citasEncontradas);
        if (data.citasEncontradas > 0) {
            const listaCitas = data.citas;
            //Esta opción ya es cuando la función arrojó una lista de opciones (aquí debería devolver una lista con el formato [{ opcion: 1, fecha: 2021-05-01, hora: 17:00 }, { opcion: 1, fecha: 2021-05-01, hora: 18:00 }] o algo así
            agent.setContext({ name: 'dio-lista-citas', lifespan: 5, parameters: { listaopciones: listaCitas } });
            //agent.add(`¿¿Qué opción eliges de la 1 a la ${listaOpciones.length}??... (${fecha} - ${empresa} - ${consultor} - ${servicio} - ${horarioSolicitado} - ${horaExacta})`);
            let cadenota = '';
            listaCitas.map(opcion => {
                let cadena = `*${opcion.opcion}*) ${opcion.textos.completo}.\n`;
                cadenota = cadenota + cadena;
            });
            cadenota = cadenota.substring(0, 1350); //Por la limitante que tiene Twilio
            let lio = cadenota.lastIndexOf('\n');
            cadenota = cadenota.substring(0, lio);
            //const enla = horarioSolicitado == 'tarde' ? 'en la tarde' : 'en la mañana';
            agent.add(formateaMensajePorCanal(`*¿Cuál de las siguientes citas quieres cancelar?*:\n\n${cadenota}\n\n*Selecciona escribiendo el número de la opción deseada.*`));
        }
        else {
            agent.add(`Usted no tiene citas que pueda cancelar.`);
        }
    }
    function formateaMensajePorCanal(mensaje) {
        let mensajeFormateado = '';
        if (ParametrosOrigen(origen).canal != 'whatsapp') {
            const search = '\\*';
            const replacer = new RegExp(search, 'g');
            mensajeFormateado = mensaje.replace(replacer, '');
        }
        else
            mensajeFormateado = mensaje;
        return mensajeFormateado;
    }
    function obtenerContexto(data) {
        let contexto = 'opcion-seleccionada'; //Este contexto pedirá la confirmación y además que el cliente introduzca su nombre
        let nombreCliente = '';
        if (data.nombreCliente) { //Cambiar luego por data.nombreCliente != ''
            contexto = 'opcion-seleccionada2'; //Este contexto significa que ya existe un nombre de cliente en la base de datos para el número consultado y por lo tanto irá al intent de confirmación que no pide al cliente (nuevamente) su nombre
            nombreCliente = data.nombreCliente;
        }
        return { contexto: contexto, nombreCliente: nombreCliente };
    }
    async function confirmarCitaHandler(agent) {
        let contextoListaOpciones = agent.getContext('dio-lista-opciones').parameters;
        let nuevoCliente = contextoListaOpciones.nombreCliente == '';
        let contexto = nuevoCliente ? 'opcion-seleccionada' : 'opcion-seleccionada2';
        let contextoOpcionSeleccionada = agent.getContext(contexto).parameters;
        let empresa = contextoListaOpciones.empresa;
        let servicio = contextoListaOpciones.servicio;
        let listaOpciones = contextoListaOpciones.listaopciones;
        let opcionSeleccionada = contextoOpcionSeleccionada.opcion;
        //Datos cliente:
        let nombre = nuevoCliente ? agent.parameters.nombre : contextoListaOpciones.nombreCliente;
        let cumpleanos = nuevoCliente ? agent.parameters.cumpleanos : '2021-05-31T12:00:00.000'; //si no es nuevo cliente da igual lo que se mande, de todas formas no va a guardar nada
        let telefono = ParametrosOrigen(origen).idchat; //Se obtiene el teléfono directamente de WA
        let canal = ParametrosOrigen(origen).canal; //Se obtiene el teléfono directamente de WA
        let cliente = { "nombre": nombre, "telefono": telefono, "canal": canal, "cumpleanos": cumpleanos };
        let opcionElegida = listaOpciones[opcionSeleccionada - 1];
        //Ahora el consultor se toma de la opción que eligió el cliente
        let consultor = opcionElegida.consultor;
        let reqBodyAgendarCita = reqBodyCita(empresa, consultor, servicio, opcionElegida, cliente, nuevoCliente);
        let result = {};
        result.data = await funciones.guardarCitaCloudFunction({ "body": reqBodyAgendarCita }, null);
        let mensaje = result.data.mensaje;
        agent.add(formateaMensajePorCanal(mensaje));
    }
    async function confirmarCancelacionCitaHandler(agent) {
        let contextoListaOpciones = agent.getContext('dio-lista-citas').parameters;
        let contexto = 'opcion-cancelacion-seleccionada';
        let contextoOpcionSeleccionada = agent.getContext(contexto).parameters;
        let listaOpciones = contextoListaOpciones.listaopciones;
        let opcionSeleccionada = contextoOpcionSeleccionada.opcion;
        let opcionElegida = listaOpciones[opcionSeleccionada - 1];
        let result = {};
        result.data = await funciones.cancelarCitaCloudFunction({ "body": opcionElegida }, null);
        let mensaje = result.data.mensaje;
        if (mensaje == 'ok')
            mensaje = agent.parameters.mensajeOK;
        agent.add(formateaMensajePorCanal(mensaje));
    }
    function reqBodyCita(empresa, consultor, servicio, opcionElegida, cliente, guardarCliente) {
        return {
            "empresa": empresa,
            "consultor": consultor,
            "tipoCita": "presencial",
            "servicio": servicio,
            "guardarCliente": guardarCliente,
            "opcionElegida": {
                "opcion": 1,
                "inicio": opcionElegida.inicio,
                "fin": opcionElegida.fin,
                "fechaInicio": opcionElegida.fechaInicio,
                "fechaFin": opcionElegida.fechaFin
            },
            "cliente": {
                "nombre": cliente.nombre,
                "telefono": cliente.telefono,
                "canal": cliente.canal,
                "cumpleanos": cliente.cumpleanos
            }
        };
    }
    function elegirOpcionHandler(agent) {
        let opcion = agent.parameters.opcion;
        let contextoListaOpciones = agent.getContext('dio-lista-opciones').parameters;
        let listaOpciones = contextoListaOpciones.listaopciones;
        let nombreCliente = contextoListaOpciones.nombreCliente;
        let contexto = nombreCliente == '' ? 'opcion-seleccionada' : 'opcion-seleccionada2';
        if (opcion > listaOpciones.length || opcion < 1)
            agent.add(`Opción no válida, por favor intente con cualquiera de las opciones disponibles.`);
        else {
            agent.add(formateaMensajePorCanal(`*¿Está seguro de confirmar su cita para ${listaOpciones[opcion - 1].textos.completo}?*`));
            agent.setContext({ name: 'opcion-seleccionada', lifespan: 5, parameters: { opcion: opcion } });
            agent.setContext({ name: contexto, lifespan: 5, parameters: { opcion: opcion } });
        }
    }
    function elegirOpcionCancelacionHandler(agent) {
        let opcion = agent.parameters.opcion;
        let contextoListaOpciones = agent.getContext('dio-lista-citas').parameters;
        let listaOpciones = contextoListaOpciones.listaopciones;
        if (opcion > listaOpciones.length || opcion < 1)
            agent.add(`Opción no válida, por favor intente con cualquiera de las opciones disponibles.`);
        else {
            agent.add(formateaMensajePorCanal(`*¿Está seguro de cancelar su cita para el servicio de ${listaOpciones[opcion - 1].textos.completo}?*`));
            agent.setContext({ name: 'opcion-cancelacion-seleccionada', lifespan: 5, parameters: { opcion: opcion } });
        }
    }
    async function escribirServicioHandler(agent) {
        let contexto = agent.getContext('solicitud-ingresar-servicio').parameters;
        //console.log(JSON.stringify(contexto));
        let fecha = contexto.fecha;
        let consultor = contexto.consultor;
        let empresa = contexto.empresa;
        const listaServicios = contexto.listaServicios;
        //let servicio = agent.parameters.servicio;
        const opcion = agent.parameters.servicio;
        let horarioSolicitado = contexto.horariosolicitado;
        let horaExacta = contexto.horaexacta;
        let textos = 2;
        const diasARevisar = contexto.diasarevisar;
        if (opcion > listaServicios.length || opcion < 1) {
            agent.add(`Opción no válida, por favor intente con cualquiera de las opciones disponibles.`);
            return;
        }
        let servicio = listaServicios[opcion - 1].servicio;
        const reqBody = obtenerReqBody(fecha, empresa, consultor, servicio, horarioSolicitado, horaExacta, diasARevisar, textos);
        let result = {};
        result.data = await funciones.obtenerHorariosCloudFunction({ "body": reqBody }, null);
        obtenerMensajeAgent(empresa, consultor, horarioSolicitado, fecha, servicio, horaExacta, diasARevisar, result);
        //////////////////////////////////////////
    }
    function obtenerReqBody(fecha, empresa, consultor, servicio, horarioSolicitado, horaExacta, textos, diasARevisar) {
        let esFechaExacta = fecha != '';
        let esHoraExacta = horaExacta != '';
        let fechaAux = esFechaExacta ? fecha : "2021-05-31T12:00:00.000"; //Como aux puede ir cualquier fecha
        let horaAux = esHoraExacta ? horaExacta : "2021-05-31T12:00:00.000"; //Como aux puede ir cualquier hora
        //cochupo temporal!!!
        if (esHoraExacta) {
            horaAux = horaAux.replace("-05:00", "");
            horaAux = horaAux.replace("-06:00", "");
        }
        //Teléfono
        const po = ParametrosOrigen(origen);
        let canal = po.canal;
        let telefono = po.idchat; //Se obtiene el teléfono directamente de WA o el id de telegram
        return {
            "servicio": servicio,
            "empresa": empresa,
            "consultor": consultor,
            "tipoCita": "presencial",
            "tipoHorario": "normal",
            "telefono": telefono,
            "canal": canal,
            "textos": textos,
            "datosFiltroFechaHora": {
                "caso": 6,
                "fechaExacta": esFechaExacta,
                "fecha": fechaAux,
                "horaExacta": esHoraExacta,
                "hora": horaAux,
                "horarioSolicitado": horarioSolicitado,
                "diasARevisar": diasARevisar
            }
        };
    }
    function pruebaFechaHoyHandler(agent) {
        //const hoy = new Date();
        //const hoy = agent.parameters.hoy;
        //const manana = agent.parameters.manana;
        const fecha = agent.parameters.fecha;
        const fechaHora = agent.parameters.fechaHora;
        // const hoyISO = hoy.toISOString();
        //let mensaje = 'la fecha de hoy es (ISO):' + hoyISO + ' toString: ' + hoy.toString();
        agent.add(fecha + ' / ' + fechaHora);
    }
    function pruebaNumeroTelefonoHandler(agent) {
        //console.log(origen);
        //agent.add('entro');
        const paramsChat = ParametrosOrigen(origen);
        const mensaje = paramsChat.idchat + '-' + paramsChat.canal;
        agent.add(mensaje);
    }
    function ParametrosOrigen(origen) {
        let paramsChat = { "idchat": "", "canal": "" };
        switch (origen.source) {
            case 'telegram':
                paramsChat.idchat = origen.payload.data.from.id.toString();
                paramsChat.canal = 'telegram';
                break;
            case 'DIALOGFLOW_CONSOLE':
                paramsChat.idchat = '5210000000000';
                paramsChat.canal = 'dialogflow';
                break;
            case 'facebook':
                paramsChat.idchat = origen.payload.data.sender.id;
                paramsChat.canal = 'messenger';
                break;
            default:
                let org = origen.payload;
                let canal = org.hasOwnProperty('WaId') ? 'whatsapp' : 'otro';
                let numero = JSON.parse(org.WaId);
                //console.log(numero);
                paramsChat.idchat = numero.toString(); //numero.toString().substr(numero.length - 10);
                paramsChat.canal = canal;
                break;
        }
        return paramsChat;
    }
    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('get-agent-name', getAgentNameHandler);
    intentMap.set('set-language', languageHandler);
    intentMap.set('make-an-appointment', makeAnAppointmentHandler);
    intentMap.set('escribir-servicio', escribirServicioHandler);
    intentMap.set('confirmar-cita', confirmarCitaHandler);
    intentMap.set('confirmar-cita2', confirmarCitaHandler);
    intentMap.set('elegir-opcion', elegirOpcionHandler);
    intentMap.set('cancelar-cita', cancelarCitaHandler);
    intentMap.set('elegir-opcion-cancelacion', elegirOpcionCancelacionHandler);
    intentMap.set('confirmar-cancelacion-cita', confirmarCancelacionCitaHandler);
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    intentMap.set('prueba-numero-telefono', pruebaNumeroTelefonoHandler);
    intentMap.set('prueba-fecha-hoy', pruebaFechaHoyHandler);
    agent.handleRequest(intentMap);
});

process.on('SIGTERM', () => {
  listener.close(() => {
    console.log('Closing http server.');
    process.exit(0);
  });
});