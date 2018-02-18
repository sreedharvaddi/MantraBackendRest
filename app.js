var express = require('express');
var http =  require('http');
var app = express();
var bodyParser =  require('body-parser');
var appDB = require('./app_db');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
http.createServer(app).listen(8080);

/**
 * api : /mantras/:id
 * input : :id
 * output : { "mantra_id" : "20min", .. }
 * description : 
 */
app.get('/mantras/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    appDB.connectDB(function (err, db) {
        if (err != null) {
            res.send({"error":err});
            return;
        } 
        appDB.getMantra(db, id, function (err, result) {
            
            if (err != null) {
                db.close();
                res.send({"error":err});
                return;
            } 
            res.send(result);
            db.close();
        });
    });
});

app.post('/mantra', function (req, res) {
    var mantra = req.body;    
    console.log("mantra "+mantra);
    appDB.connectDB(function (err, db) {
        if (err != null) {
            res.send({"error": err});
            return;
        }
        appDB.addMantra(db, mantra, function (err, result) {
            db.close();
            res.send(mantra);
        });
    });
});

app.delete('/mantras:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    appDB.connectDB(function (err, db) {
        if (err != null) {
            res.send({"error" : err});
            return ;
        }
        appDB.deleteMantra(db, id, function (err, result) {
            if (err != null) {
                db.close();
                res.send({"error" : err});
                return;
            }
            res.send(result);
            db.close();
        });
    });
});

app.delete('/mantras', function (req, res) {
    appDB.connectDB(function (err, db) {
        if (err != null) {
            res.send({"error": error});
            return;
        }
        appDB.deleteMantras(db, function (err, result) {
            if (err != null) {
                db.close();
                res.send({"error": error});
                return;
            }
            db.close();
            res.send(result);
        }); 
    });
});

app.get('/mantras', function (req, res) {
    appDB.connectDB(function (err, db) {
        if (err != null) {
            res.send({"error": err});
            return;
        }
        appDB.getMantras(db, function (err, result) {
            if (err != null) {
                db.close();
                res.send({"error":err});
                return;
            }
            res.send(result);
            db.close();
        });
    });
});

