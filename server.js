const express = require('express');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const winston = require('./config/winston');

const app = express();

app.use(bodyParser.json());

app.use(celebrate({
    body: Joi.object().keys({
        user: Joi.string().valid(['admin', 'cc', 'student']).required(),
        userId: Joi.string().required(),
        action: Joi.string().required(),
        message: Joi.string().required(),
        type: Joi.number().valid([0, 1, 2, 3, 4, 5])
    })
}));

app.post("/log", (req, res) => {

    let user = req.body.user;
    let userId = req.body.userId;
    let message = req.body.message;
    let action = req.body.action;

    switch (req.body.type) {
        case 0:
            winston.error(`ACTION >> ${action} || USER >> ${user}(${userId}) || MESSAGE >> ${message}`);
            break;
        case 1:
            winston.warn(`ACTION >> ${action} || USER >> ${user}(${userId}) || MESSAGE >> ${message}`);
            break;
        case 2:
            winston.info(`ACTION >> ${action} || USER >> ${user}(${userId}) || MESSAGE >> ${message}`);
            break;
        case 3:
            winston.verbose(`ACTION >> ${action} || USER >> ${user}(${userId}) || MESSAGE >> ${message}`);
            break;
        case 4:
            winston.debug(`ACTION >> ${action} || USER >> ${user}(${userId}) || MESSAGE >> ${message}`);
            break;
        case 5:
            winston.silly(`ACTION >> ${action} || USER >> ${user}(${userId}) || MESSAGE >> ${message}`);
            break;
    }

    res.send('Successfully logged');
});

app.use(errors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));