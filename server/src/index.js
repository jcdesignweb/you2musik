const express = require('express')
const cors = require('cors');

const app = express();
const server = require("http").Server(app);

const router = require('./router');
const Socket = require('./socket')
const socket = new Socket(server)
socket.onConnection()

const config = require('./config')

/*

const bodyParser = require('body-parser')

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
*/

app.use(cors({
    origin: config.CLIENT_URL
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API requests routing
app.use('/', router);

app.get('/build', (req, res) => {
    console.log("build v0.1")

    res.json({ response: "version v0.1" })    
})

server.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`)
})