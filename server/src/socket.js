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
                console.log("Download videoId: ", videoId)

                console.log(socket.id)
                downloadVideo(videoId, socket.id)

            });

            socket.on('get_music', (videoId, callback) => {
                const filename = `${videoId}.mp3`
                const audioFile = `${MP3_PATH}/${filename}`
                
                if (fs.existsSync(audioFile)) {
                    callback("already exists")
                } else {

                    callback("it does not exists, downloading.")
                    downloadVideo(videoId, socket.id)
                }
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