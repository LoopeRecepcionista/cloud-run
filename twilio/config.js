"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
require("firebase/firestore");
// Your web app's Firebase configuration
//Bases de datos mías (luego ver si de Raúl o de Iván)
/*
var firebaseConfig = {
  apiKey: "AIzaSyCvM58vngC0ZdoD3bTxlNS0Dy56-wGfsDo",
  authDomain: "agente2-wdpe.firebaseapp.com",
  projectId: "agente2-wdpe",
  storageBucket: "agente2-wdpe.appspot.com",
  messagingSenderId: "142977202816",
  appId: "1:142977202816:web:e5a4b72647b3e195e54465"
};
*/
//BD de firestore de raul.ivan.espinosa.ramirez@gmail.com
/*
var firebaseConfig = {
  apiKey: "AIzaSyDcC8M3KRQDIUJus3H6U_pnC-0YrB7IyEM",
  authDomain: "cascaron-bwto.firebaseapp.com",
  projectId: "cascaron-bwto",
  storageBucket: "cascaron-bwto.appspot.com",
  messagingSenderId: "817553520396",
  appId: "1:817553520396:web:c6256544112323ec837b29",
  measurementId: "G-XSV3R8QNFN"
};
*/
//Prueba para ver si se insertaba en otro proyecto y sí funcionó
/*
var firebaseConfig = {
  apiKey: "AIzaSyAgrKBz5tJRAWWd49u0e1G8DiHXNIQwuZA",
  authDomain: "recepcionista-virtual-31c8e.firebaseapp.com",
  projectId: "recepcionista-virtual-31c8e",
  storageBucket: "recepcionista-virtual-31c8e.appspot.com",
  messagingSenderId: "913918614558",
  appId: "1:913918614558:web:c1d430d17f389b3b75a20f"
};
*/
//Base de datos de la cuenta virtualrecepcionista@gmail.com
var firebaseConfig = {
    apiKey: "AIzaSyAgrKBz5tJRAWWd49u0e1G8DiHXNIQwuZA",
    authDomain: "recepcionista-virtual-31c8e.firebaseapp.com",
    projectId: "recepcionista-virtual-31c8e",
    storageBucket: "recepcionista-virtual-31c8e.appspot.com",
    messagingSenderId: "913918614558",
    appId: "1:913918614558:web:c1d430d17f389b3b75a20f"
};
//const firebase = require('firebase-admin');
//admin.initializeApp();
// Initialize Firebase
app_1.default.initializeApp(firebaseConfig);
console.log('Firebase configurado');
// Firebase previously initialized using firebase.initializeApp().
//var db = firebase.firestore();
//db.useEmulator("localhost", 8080);
/*
    if (location.hostname === "localhost") {
    db.useEmulator("localhost", 8080);
    }
*/
//export default firebase.firestore().useEmulator("localhost", 8080);
exports.default = app_1.default.firestore();
//# sourceMappingURL=config.js.map