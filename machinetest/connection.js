const mysql = require('mysql');
const config = require('./config/config');

try{
    var connection = mysql.createConnection({
        host : config.mysqlHost,
        user : config.user,
        password : config.password,
        database : config.database,
        port : config.port
    })
    connection.connect(function(err){
        if(err){
            console.log("Database is not connected", err);
        }else{
            console.log("database connected!!!!");
        }
    });
} catch(error){
    console.log("Database is not connected", error);
}

module.exports = connection