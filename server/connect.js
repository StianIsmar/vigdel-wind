const connectToSql = () => {
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'MyPass@word',
        server: 'localhost',
        database: 'data'
    };

    return {config, sql}
}

module.exports = {connectToSql : connectToSql}