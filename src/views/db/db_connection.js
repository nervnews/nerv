require("env2")("config.env");
const { Pool } = require("pg");
const url = require("url")

if (!process.env.DB_URL) {
    throw new Error("DB_URL variable not set!")
}

const params = url.parse(process.env.DB_URL);

const options = {
    host: params.hostname,
    port: params.port,
    database: params.pathname.split("/")[1],
    max: process.env.DB_MAX_CONNECTIONS || 2,
    user: params.auth.split(":")[0],
    password: params.auth.split(":")[1]
}

options.ssl = options.host !== "localhost";

module.exports = new Pool(options);

