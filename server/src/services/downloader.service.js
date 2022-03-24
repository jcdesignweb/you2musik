const fs = require('fs')
const { exec } = require("child_process")
const youtube = require('./youtube.service')
const Socket = require('../socket')
const Song = require('../models/song.model')
const songDao = require('../dao/song.dao')

const MP3_PATH = './mp3'

/**
 * this function will download a song with the best audio quality.
 * receive as param the video id.
 */
const download = async (vid, socketId) => {
    

    const filename = `${vid}.mp3`
    const audioFile = `${MP3_PATH}/${filename}`

    try {
        if (fs.existsSync(audioFile)) {
            return {
                code: 'DONE',
                message: 'file already exists',
                audioFile
            }
        }
    } catch (err) {
        console.error(err)
    }

    return new Promise((resolve, reject) => {
        const command = `/usr/bin/python3 /usr/local/bin/youtube-dl --extract-audio -x --audio-format mp3 https://www.youtube.com/watch?v=${vid} -o ${audioFile}`
        console.log("Starting Download")
        console.log("Executing command", command)

        const process = exec(command, (error, stdout, stderr) => {

            if (error) {
                console.error(`error: ${error.message}`);

                return reject(error)
            }

            if (stderr) {
                console.log(`stderr: ${stderr}`);

                return reject(stderr)
            }

            console.log(`stdout: ${stdout}`);
            return resolve(stdout)

        });

        process.stdout.on('data', (data) => {
            console.log("vid " + vid, data)
            if (data.includes('%')) {
                const progress = data.split('[download]')[1].split('of')[0].trim()
                
                Socket.emit(socketId, { progress, vid })

                
                if (progress === '100.0%') {
                    
                    storeSongOnDb(vid)
        

                    resolve()

                    /* MOVING FILE HERE!!!
                    setTimeout(() => {
                        console.log("moving file to the client")
                        // here I move the file to the client side
                        const serverFile = audioFile // `/var/www/html/YouMusik/server/mp3/${vid}.mp3`
                        const clientFile = `/var/www/html/YouMusik/app/src/assets/mp3/${filename}`

                        fs.rename(serverFile, clientFile, function (err) {
                            if (err) {
                                console.error(err)
                                throw err
                            }
                            console.log('Successfully file moved! , file: ' + filename)
                        })
                    }, 2000)
                    */
                }
            }
        });
    })
}

/**
 * gets info from Youtube by vid and then saves it in the DB
 */
const storeSongOnDb = async (vid) => {
    const videoInfo = await youtube.getVideoByVid(vid)
    console.log("VideoInfo", videoInfo)
    const _videos = JSON.parse(videoInfo)
    const {id, snippet, contentDetails} = _videos.items[0]
    
    const song = new Song()
    song.initFromYb(snippet, id, contentDetails.duration)
    songDao.store(song)
}

module.exports = { download, MP3_PATH, storeSongOnDb }