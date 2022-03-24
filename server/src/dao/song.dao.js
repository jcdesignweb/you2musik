
const sqlite3 = require('sqlite3').verbose();
const config = require('../config')

// open database
let db = new sqlite3.Database(config.DATABASE_FILE_PATH, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});


class SongDao {

    /**
     * 
     * @param {Song} song 
     */
    static store(song) {
        console.log("###DB### storing a song ", song)

        const statement = 'INSERT INTO songs(vid,title,description,image_path,isDownloaded,created,duration)VALUES(?,?,?,?,?,?,?)'
        const values = [
            song.vid, 
            song.title, 
            song.description, 
            song.image_path, 
            song.isDownloaded, 
            song.created,
            song.duration
        ]

        console.log("Executing sql query", statement, values)
        return db.run(statement, values)
    }

    /**
     * it returns just one row
     * @param {String} vid 
     * @returns 
     */
    static async findByVid(vid) {
        console.log("###DB### searching into the database ")

        const query = `SELECT * FROM songs WHERE vid='${vid}' LIMIT 1`
        return new Promise((resolve, reject) => {
            db.get(query, function (err, row) {
                if (err) reject("Read error: " + err.message)
                else {
                    resolve(row)
                }
            })
        })
    }

    /**
     *  it returns all stored rows
     * @param {*} query 
     * @returns 
     */
    static async getAll() {
        console.log("###DB### getting all stored songs")
        const query = `SELECT * FROM songs`

        return new Promise((resolve, reject) => {
            db.all(query, function (err, row) {
                if (err) reject("Read error: " + err.message)
                else {
                    resolve(row)
                }
            })
        })
    }

    static async runQuery(sql) {
        console.log("Executing sql query", sql)
        return db.run(sql)
        return new Promise((resolve, reject) => {

            //return db.run(sql)
            this.db.run(query,
                function (err) {
                    if (err) reject(err.message)
                    else resolve(true)
                })
            db.run(sql, (err, row) => {
                if (err) {
                    console.log(err);
                    reject()
                    throw err;
                }
                resolve(row)
                console.log(row);
            });
        })
    }
}

module.exports = SongDao