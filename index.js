const express = require("express");
const http = require("http");

const app = express();

app.use(express.json());

const serviceCounter = 'localhost';
const serviceConverter = 'localhost';

app.get("/", (req, res) => {
    res.status(200).send("CWiCS Assessment");
})
app.get("/cc", (req, res) => {
    res.status(200).send("POST to this endpoint with JSON to convert to YAML");
})
app.post("/cc", (req, res) => { 
    const json = req.body

    var options = {
        host: serviceCounter,
        path: '/count',
        port: '8081',
        method: 'POST',
        body: {}
    };
    var options2 = {
        host: serviceConverter,
        path: '/convert',
        port: '8080',
        method: 'POST',
        body: json
    };

    try {
        var postReq = http.request(options, (response) => {
            // res.status(200);
        })

        var postReq2 = http.request(options2, (response) => {
            res.status(200).send(response.body);
        })

    } catch (error) {
        res.send(error)
    }

})

app.listen(process.env.PORT || 3000, function () {
	console.log("Server started on port 3000");
});