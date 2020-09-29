var express = require('express');
const { NText } = require('mssql');
var app = express();

const { connectToSql } = require('./connect')

app.get('/', (req, res) => {
    res.send('<h1>Hello from the server.</h1>')
})
const conn = (req, res, next) => {


    // connect to your database
    req.sql.connect(req.config, function (err) {
        console.log(req.config)

        if (err) console.log(err);

        // create Request object
        var request = new req.sql.Request();
        const lastData = { recordedTime: '12:42:52', windStrength: '12.3', windDirection: 'SSW' }
        

        // query to the database and get the records
        request.query("INSERT INTO wind (RecordedTime,WindDirection,WindStrength) \n VALUES ('14:02:2021', 'NNW', '12.7')", function (err, recordset) {
        //request.query('SELECT TOP (1000) * FROM wind', function (err, recordset) {
        
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            req.sql.close()

        });
    });
}
app.get('/welcome', middleware1, conn);

const { res, config, sql } = connectToSql()

function middleware1(req, res, next) {
    req.config = config
    req.sql = sql
    next()
}



var server = app.listen(5000, function () {
    console.log('Server is running..');
});

