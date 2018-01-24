const fs = require("fs");

const connect = require("./db_connection");

const buildScript = fs.readFileSync(`${__dirname}/db_build.sql`, "utf-8");

connect.query(buildScript, (err, success) => {
    if (err) throw err;
    connect.end()
    console.log("Database built successfully.");
});

