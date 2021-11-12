const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();
const mongoUrl = process.env.MONGODB_URL

mongoose.connect(mongoUrl, 
{
    useNewUrlParser : true,
    useUnifiedTopology: true
}) .then(
    () => console.log(chalk.green.bgWhite.bold.inverse('connect to mongo successfully'))
);






