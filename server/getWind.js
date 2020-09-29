const { connectToSql } = require('./connect')

const getWind = (req, res) => {
    // get wind from the DB
    const { config, sql } = connectToSql()

    sql.connect(config, function (err) {
        if (err) console.log(err);
    
        // create Request object
        var request = new sql.Request();
    
        // query to the database and get the records
        request.query('SELECT TOP (1000) * FROM wind', function (err, recordset) {
        // request.query("INSERT INTO wind (RecordedTime,WindDirection,WindStrength) \n VALUES ('14:02:2021', 'NNW', '12.7')", function (err, recordset) {
    
          if (err) console.log(err)
    
          // send records as a response
          return res.send(recordset);
          sql.close()
        });
      })
}

module.exports = { getWind }