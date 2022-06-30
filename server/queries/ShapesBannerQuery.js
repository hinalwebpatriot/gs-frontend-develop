const database = require( "./../utils/databaseDriver");
const tools = require("./../utils/Tools");

exports.retrieve = async function() {
    const db = await database;

    const [rows, fields] = await db.execute('select * from shapes');

    return rows;
};