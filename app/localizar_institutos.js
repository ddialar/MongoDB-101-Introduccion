/*
@description: Código diseñado para localizar los institutos más próximos a una
              situación geográfica definida, dentro de un radio de acción
              establecido.
@author: Dailos Rafael Díaz Lara.
@date: 2015-05-10
*/

var MongoClient = require('mongodb').MongoClient;

function localizarInstitutos() {
  MongoClient.connect('mongodb://localhost:27017/institutos', function(err, db) {
    var origen = {"type":"point","coordinates":[28.154285,-16.441395]},
        distMin = 0,
        distMax = 28000,
        criterio = {"location":{"$near":{"$geometry":origen,
                                         "$minDistance":distMin,
                                         "$maxDistance":distMax}}},
        proyection = {"_id":0,"school_name":1},
        opciones = { "sort" : [["school_name",1]] };

    db.collection('tenerife').find(criterio,
                                   proyection,
                                   opciones,
                                   function(err, resultados) {
        resultados.each(function(err, instituto){
        if (instituto !== null) {
          console.log(instituto.school_name);
        } else {
          console.log('Búsqueda finalizada.');
          db.close();
        }
      });
    });
  });
}

(function() {
  localizarInstitutos();
})();
