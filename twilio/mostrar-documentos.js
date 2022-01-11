"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retornaDocumentos = void 0;
exports.retornaDocumentos = (snapshot) => {
    const documentos = [];
    snapshot.forEach(snapHijo => {
        documentos.push(Object.assign({ id: snapHijo.id }, snapHijo.data()));
    });
    //console.log(documentos);
    return documentos;
};
//# sourceMappingURL=mostrar-documentos.js.map