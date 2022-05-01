const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//     res.send("Hello");
// });

app.get("/routes", (req, res) => {
    try {
        const client = new MongoClient("mongodb://host.docker.internal/?readPreference=primary&appname=ZwiftRoutes&ssl=false");

        client.connect()
            .then(() => {
                const database = client.db("ZwiftRoutes");
                const collection = database.collection("Routes");
                const cursor = collection.find({});
                return cursor.toArray();
            }).then(routes => {
                res.send(routes);
            }).catch(error => {
                console.log(error);
                res.sendStatus(500);
            });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});