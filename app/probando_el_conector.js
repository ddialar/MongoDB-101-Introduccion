/*
@description: Código diseñado para comprobar el correcto funcionamiento del conector
              de MongoDB, a través de una consulta para obtener el primer elemento
              almacenado en la base de datos "gasolineras", colección "terrestres".
@author: Dailos Rafael Díaz Lara.
@date: 2015-05-10
*/

var MongoClient = require('mongodb').MongoClient;

function obteniendoUnContacto() {
  MongoClient.connect('mongodb://localhost:27017/contactos', function(err, db) {
    var criterio = {},
        proyection = {},
        opciones = { "sort" : [["name",1]] };

    db.collection('trabajo').findOne(criterio,
                                     proyection,
                                     opciones,
                                     function(err, resultado) {
      console.log(resultado);
      db.close();
    });
  });
}

(function() {
  obteniendoUnContacto();
})();
