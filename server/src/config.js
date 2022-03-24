require('dotenv').config()

const config = {
    CLIENT_URL: process.env.CLIENT_URL,
    PORT: process.env.PORT,
    DATABASE_FILE_PATH: `${__dirname}/../db/musik.db`,
    YOUTUBE_KEY: process.env.YOUTUBE_KEY

}

module.exports = config