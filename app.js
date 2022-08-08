let express = require('express');
let cookieParser = require('cookie-parser')
let app = express();
app.use(cookieParser())

let path = require('path');
let router = express.Router();
let bodyParser = require('body-parser');
let request = require('request');
config = require('config');
let mongoose = require('mongoose');
let relationship = require("mongoose-relationship");
let swaggerJSDoc = require('swagger-jsdoc');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

let mongoConnection = 'mongodb://' + config.mongodbConfig.host + ':' + config.mongodbConfig.port + "/" + config.mongodbConfig.dbName;
mongoose.connect(mongoConnection, { useNewUrlParser: true });

db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Not Connected'));
db.once('open', function () {
    console.log("Database connected using ", mongoConnection);
    console.log("Application is up and running in http://" + config.projectSetup.host + ":" + config.projectSetup.port);
});

let swaggerDefinition = {
    info: {
        title: 'API for Car Services Maintenence',
        version: '1.0.0',
        description: 'Describes the API with Swagger ',
    },
    host: config.projectSetup.apiUrl,
    basePath: '/',
};

let options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*.js'],
};

let swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

let notesmodel = require('./model/notesModel');

let notesRouter = require('./routes/notes');

// router
app.use('/stickyNotes', notesRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;