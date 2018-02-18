var mongo_client = require('mongodb').MongoClient;
// if mongo db has error in creating
// sudo mongod --dbpath ./data

//var url = 'mongodb://localhost:27018/mantradb';
var url = "mongodb://admin:sree1006@cluster0-shard-00-00-6ln6c.mongodb.net:27017,cluster0-shard-00-01-6ln6c.mongodb.net:27017,cluster0-shard-00-02-6ln6c.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

exports.connectDB = function (callback) {
    mongo_client.connect(url, callback);
};

exports.addMantra = function (db, mantra, callback) {
    db.collection('mantras_t').update(
        { "mantra_id": mantra.mantra_id },
        { 
            "mantra_id": mantra.mantra_id,
            "mantra" : mantra.mantra,
            "count" : mantra.count,
            "description" : mantra.description,
            "timestamp": Date.now()
        },
        { upsert: true }, callback
    ); 
};

exports.getMantra = function (db, id, callback) {
    db.collection('mantras_t').find({ "mantra_id" : id}).toArray(callback);
};
             
exports.getMantras = function (db, callback) {
    db.collection('mantras_t').find().toArray(callback);
};

exports.deleteMantra = function (db, id, callback) {
    db.collection("mantras_t").remove({"mantra_id" : id}, callback);
};

exports.deleteMantras = function (db, callback) {
    db.collection("mantras_t").remove({}, callback);
};
