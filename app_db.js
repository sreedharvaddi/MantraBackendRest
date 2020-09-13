var mongo_client = require('mongodb').MongoClient;
// if mongo db has error in creating
// sudo mongod --dbpath ./data

//var url = 'mongodb://localhost:27018/mantradb';
var url = "mongodb://admin:sree1006@cluster0-shard-00-00-6ln6c.mongodb.net:27017,cluster0-shard-00-01-6ln6c.mongodb.net:27017,cluster0-shard-00-02-6ln6c.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

exports.connectDB = function (callback) {
    if (process.env.NODE_ENV != null && process.env.NODE_ENV == "dev") {
        console.log(' process env '+process.env.NODE_ENV);
        mongo_client.connect("mongodb://localhost:27018/mantradb", callback);
        return;
    } 
    mongo_client.connect(url, callback);
};

exports.addMantra = function (db, mantra, callback) {
    if (mantra == undefined || mantra.mantra_id == undefined || mantra.mantra_id === "" || mantra.count == undefined || mantra.count <= 0) {
        callback( { "error" : "input invalid "}, null);
        return;
    }
    mantra["timestamp"] = Date.now();
    db.collection('mantras_t').update(
        { "mantra_id": mantra.mantra_id },
        mantra,
        { upsert: true }, callback
    );
};

exports.getMantra = function (db, id, callback) {
    db.collection('mantras_t').find({ "mantra_id" : id}).toArray(callback);
};
             
exports.getMantras = function (db, callback) {
    db.collection('mantras_t').find({status: "approved"}).toArray(callback);
};

exports.getMantrasWithStatus = function (db, status_value, callback) {
    db.collection('mantras_t').find({status:status_value}).toArray(callback);
};

exports.getAllMantras = function (db, callback) {
    db.collection('mantras_t').find().toArray(callback);
}

exports.deleteMantra = function (db, id, callback) {
    db.collection("mantras_t").remove({"mantra_id" : id}, callback);
};

exports.deleteMantras = function (db, callback) {
    db.collection("mantras_t").remove({}, callback);
};
