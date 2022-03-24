const connections = {}

const sio = require("socket.io")

let io = null;

class Socket {
    constructor(server) {
        // initialize server socket 
        io = sio(server, {
            cors: {
                origin: "http://localhost:4200",
                credentials: false
            }
        })
    }

    onConnection() {



        io.on('connection', function (socket) {
            console.log("Socket connected: " + socket.id);



            connections[socket.id] = socket

            socket.on('download', (videoId) => {
                console.log("Download videoId: 111 ", videoId)

                console.log(socket.id)
                downloadVideo(videoId, socket.id)
                //socket.emit('onDownload', "80%");

            });

            socket.on('get_music', (videoId, callback) => {
                console.log("getting vid: ", videoId)

                const filename = `${videoId}.mp3`
                const audioFile = `${MP3_PATH}/${filename}`

                console.log(socket.id)
                if (fs.existsSync(audioFile)) {
                    callback("ya existe..")
                } else {

                    callback("no existe, descargando.")
                    downloadVideo(videoId, socket.id)
                }


                //socket.emit('onDownload', "80%");

            });

        });

    }

    /**
     * 
     * @param {String} socketId 
     * @param {object} data 
     */
    static emit(socketId, data) {
        connections[socketId].emit('onDownload', data);
    }
}




module.exports = Socket