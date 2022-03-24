const fs = require('fs')
const ms = require('mediaserver')

const ytDuration = require('youtube-duration')

const Song = require('../models/song.model')

const songDao = require('../dao/song.dao')

const { download, MP3_PATH, storeSongOnDb } = require('../services/downloader.service')

const downloadVideo = (videoId, socketId) => {

    if (videoId.length !== 11) {
        res.status(400).send('vid bad format')
    }

    download(videoId, socketId)

}

class Songs {
    static async getSong(req, res) {


        const { vid } = req.params;
        const { socketId } = req.query;
        console.log("query", req.query)

        if (vid.length !== 11) {
            res.status(400).send('vid bad format')
        }

        const filename = `${vid}.mp3`
        const audioFile = `${MP3_PATH}/${filename}`

        const songDb = await songDao.findByVid(vid)
        console.log("songDb", songDb)

        if (fs.existsSync(audioFile)) {
            console.log("ya existe..")

            if (songDb === undefined) {
                storeSongOnDb(vid)
            }

            ms.pipe(req, res, audioFile);

        } else {

            console.log("no existe, descargando.")
            downloadVideo(vid, socketId)
            res.json({ response: "file does not exists, downloading" })
        }

    }

    static async getDownloadedSongs(req, res) {
        try {

            const songsDb = await songDao.getAll()
            songsDb.map(song => {
                song.duration = ytDuration.format(song.duration)
                return song
            })
            //console.log("songsDb", songsDb)

            res.json({"items":songsDb})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = Songs