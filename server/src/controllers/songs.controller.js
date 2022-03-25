const fs = require('fs')
const ms = require('mediaserver')

const ytDuration = require('youtube-duration')

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

        if (vid.length !== 11) {
            res.status(400).send('vid bad format')
        }

        const filename = `${vid}.mp3`
        const audioFile = `${MP3_PATH}/${filename}`

        const songDb = await songDao.findByVid(vid)

        if (fs.existsSync(audioFile)) {

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

            res.json({"items":songsDb})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = Songs