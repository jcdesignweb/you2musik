const express = require('express')
const cors = require('cors')

const videosController = require('./controllers/videos.controller')
const songsController = require('./controllers/songs.controller')

const router = express.Router()

router.use(cors())

const version = 'v1';

/* routes to the APIs */
router.get(`/${version}/videos`, videosController.getVideos);
router.get(`/${version}/music/:vid`, songsController.getSong)
router.get(`/${version}/locally`, songsController.getDownloadedSongs)

module.exports = router;