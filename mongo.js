const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://pavelkv94:157842@clusterfortgbot.hi5sp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function runMongo() {
    // try {
    //     await client.connect();
    //     const db = client.db("test");
    //     await db.createCollection("www").insertOne({ name: "asd", age: 123 })

    // } catch (err) {
    //     console.log(err);
    // } finally {
    //     await client.close();
    console.log("module connected")
    // }
}
module.exports = runMongo