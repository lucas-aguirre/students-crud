require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes')

app.use(cors())
app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: false }));

const server = app.listen(process.env.APP_PORT, () => {
    let port = server.address().port

    console.log(`App listening at port ${port}`)
});

module.exports = server;