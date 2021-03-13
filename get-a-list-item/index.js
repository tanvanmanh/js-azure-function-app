const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

/* use the Cosmos DB connection string you copied ealier and replace in the `url` variable */
const url = "mongodb://swacbloomsdb:Hk2x7KFtgQxziH2MyaLm07rXDfXX4oT9NEZp2OXE8FSG4y6faHUQec9Q0FbqGb7YTrIyQhpQ2uDow5dSPw42rA==@swacbloomsdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@swacbloomsdb@";
const client = new MongoClient(url);

module.exports = async function (context, req) {
    await client.connect();
    const database = client.db("crud");
    const collection = database.collection("wishlist");
    let obj = await collection.findOne({ _id: req.params.id });
    if (!obj) {
        return context.res = {
            status: 400,
            body: "not found"
        };
    }
    return context.res = {
        status: 200,
        body: obj,
    };
};