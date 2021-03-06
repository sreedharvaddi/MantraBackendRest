var express = require('express');
var http =  require('http');
var app = express();
var bodyParser =  require('body-parser');
var appDB = require('./app_db');
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
http.createServer(app).listen(port);

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
    console.log("mantra "+JSON.stringify(mantra));
    if (mantra == undefined || mantra.mantra_id == undefined || mantra.mantra_id === "" || mantra.count == undefined || mantra.count <= 0) {
        res.status(500).send( {"error": "invalid input" });
        return;
    }
    appDB.connectDB(function (err, db) {
        if (err != null) {
            res.status(500).send({"error": err});
            return;
        }
        appDB.addMantra(db, mantra, function (err, result) {
            db.close();
            res.send(mantra);
        });
    });
});

app.delete('/mantras/:id', function (req, res) {
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

app.get('/mantras/status/all', function (req, res) {
    appDB.connectDB(function (err, db) {
        if (err != null) {
            res.send({"error": err});
            return;
        }
        appDB.getAllMantras(db, function (err, result) {
            if (err != null) {
                db.close();
                res.send({"error":err});
            }
            res.send(result);
            db.close();
        });
    });
});

app.get('/mantras/status/:status_value', function (req, res) {
    var status_value = req.params.status_value;
    console.log("status vaule "+status_value);
    appDB.connectDB(function (err, db) {
        if (err != null) {
            res.send({"error": err});
            return;
        }
        appDB.getMantrasWithStatus(db, status_value, function (err, result) {
            if (err != null) {
                db.close();
                res.send({"error":err});
            }
            res.send(result);
            db.close();
        });
    });
});

