const videoListMock = require('../../resources/videos-short.json')
const videoService = require('../services/youtube.service')

class Videos {
    static async getVideos(req, res) {
        try {
            const { filter } = req.query

            console.log("filter", filter)

            //res.status('500').json({message: 'errorrrr hardcoded'})

            if (filter) {
                const videos = await videoService.getVideosByFilter(filter)
                res.send(videos)
            } else {
                res.send(videoListMock)
            }
        } catch (e) {
            console.error('Error getting videos', e)

            const errorResponse = {}
            if(e.code) {
                if(e.code == 403) {
                    errorResponse.errors = e.errors
                    errorResponse.message = "Quota Exceeded"
                }
            }
            res.status('500').json(errorResponse)
            
        }

    }
}

module.exports = Videos