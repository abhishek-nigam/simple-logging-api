const express = require('express');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const mongoose = require('mongoose');

const Log = require('./logModel');

const app = express();

// Setting up middleware
app.use(bodyParser.json());
app.use(celebrate({
    body: Joi.object().keys({
        user: Joi.number().valid([0, 1, 2]).required(),
        userId: Joi.string().optional().allow(""),
        action: Joi.string().required(),
        message: Joi.string().required(),
        logLevel: Joi.number().valid([0, 1, 2, 3, 4, 5]).required(),
        responseData: Joi.string().optional().allow("")
    })
}));

// Trying to import secrets
let secrets;
try {
    secrets = require('./config/secrets');
} catch (error) { }

//Connecting to mongoDB
const mongoUri = process.env.DB_URI || (secrets && secrets.mongo.dbURI);
mongoose.connect(mongoUri)
    .then(() => console.log('Connected to mongo db'));

// Setting up route
app.post("/log", (req, res) => {

    new Log({
        user: req.body.user,
        userId: req.body.userId,
        action: req.body.action,
        message: req.body.message,
        logLevel: req.body.logLevel,
        responseData: req.body.responseData
    })
        .save()
        .then(() => {
            res.send('Successfully logged');
        })
        .catch(err => {
            console.log(err);
            res.send('Error in logging');
        });
});

// Handling validation errors
app.use(errors());

// Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));