

class Song {
    constructor() {
        this.vid = ''
        this.title = ''
        this.description = ''
        this.image_path = ''
        this.isDownloaded = false
        this.created = new Date
        this.duration = ''
    }

    /**
     * initialize model from Youtube api data (snippet)
     * @param {JsonObject} snippet 
     * @param {String} vid Video ID
     * @param {String} duration duration time
     */
    initFromYb(snippet, vid, duration) {
        this.vid = vid
        this.title = snippet.title
        this.description = snippet.description
        this.image_path = snippet.thumbnails.high.url
        this.isDownloaded = true
        this.created = new Date().getTime()
        this.duration = duration
    }

    
}

module.exports = Song