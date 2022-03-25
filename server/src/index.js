const express = require('express')
const cors = require('cors');
const { version } = require('../package.json');

const app = express();
const server = require("http").Server(app);

const router = require('./router');
const Socket = require('./socket')
const socket = new Socket(server)
socket.onConnection()

const config = require('./config')

app.use(cors({ origin: config.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API requests routing
app.use('/', router);

app.get('/build', (req, res) => {
    console.log(`build application version ${version}`)
    res.json({ response: `build application version ${version}` })
})

server.listen(config.PORT, () => {
    console.log(`app listening on port ${config.PORT}`)
})