const Router = require('express').Router();
const Students = require('./Students');

Router.get('/', (req, res) => {
    res.status(200).send('The API is alive :)')
})

Students.addRoutes(Router);

module.exports = Router;