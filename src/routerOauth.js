const routerOauth = require("express").Router()
const handlersOauth = require("./handlersOauth")
const passport = require("passport")

routerOauth.get("/dashboard", handlersOauth.dashboard); 
routerOauth.get("/logout", handlersOauth.logout);

module.exports = routerOauth;
