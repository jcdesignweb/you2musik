'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db) {
    return db.createTable('songs', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        vid: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        image_path: { type: 'string' },
        isDownloaded: { type: 'boolean' },
        duration: { type: 'string' },
        created: { type: 'datetime' }
    });
};

exports.down = function (db) {
    return db.dropTable('songs');
};

exports._meta = {
    "version": 1
};
