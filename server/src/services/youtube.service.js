const ytDuration = require('youtube-duration')
const YouTube = require('youtube-node');
const youTube = new YouTube();

const { YOUTUBE_KEY } = require('../config')
youTube.setKey(YOUTUBE_KEY);


class Youtube {

    /**
     * search videos by filter, filter parameters is like the Youtube search field
     * 
     * @param {String} filter 
     * @example 'U2 - best songs'
     * @returns Promise
     */
    static getVideosByFilter(filter) {

        return new Promise((resolve, reject) => {

            youTube.search(filter, 6, async function (error, result) {
                console.log("result.items", result)
                if (error) {
                    reject(error)
                }
                else {

                    const vidMap = result.items.map((element) => {

                        return element.id.videoId
                    })

                    const vids = vidMap.join(',')

                    try {
                        const contentVideos = await Youtube.getVideoByVid(vids)

                        const _parseContentVideos = JSON.parse(contentVideos)

                        for (const item of result.items) {
                            for (const contentV of _parseContentVideos.items) {
                                if (contentV.id === item.id.videoId) {
                                    item['contentDetails'] = contentV
                                    item['contentDetails']['duration'] = ytDuration.format(contentV.contentDetails.duration)
                                }
                            }
                        }

                        resolve(result)
                    } catch (e) {
                        console.error(e)
                    }
                }
            });
        })

    }

    /**
     * search a video by 'vid'
     * 
     * @param {String} vid 
     * @returns Promise
     */
    static getVideoByVid(vid) {
        return new Promise((resolve, reject) => {
            youTube.getById(vid, function (error, result) {
                if (error) {
                    console.error(error);
                    reject()
                }
                else {

                    resolve(JSON.stringify(result, null, 2))
                }
            });
        })
    }
}

module.exports = Youtube