const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 80;

app.get("/routes", (req, res) => {
    try {
        const client = new MongoClient(process.env.CUSTOMCONNSTR_MongoDbAtlas);

        client.connect()
            .then(() => {
                const database = client.db("ZwiftRoutes");
                const collection = database.collection("Routes");
                const cursor = collection.find({});
                return cursor.toArray();
            }).then(routes => {
                routes.sort((a,b) => {
                    if(a.routeName < b.routeName){
                        return -1;
                    }
                    if(b.routeName > b.routeName){
                        return 1;
                    }
                    return 0;
                })
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