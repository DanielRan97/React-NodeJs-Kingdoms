const express = require('express');
const chalk = require('chalk');
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
require('../database/mongoose');
const userRouter = require('../routers/user/user');


const app = express();
app.use(express.json());
app.use(cors());


app.use(userRouter);

app.listen(port, () => {
    console.log(chalk.green.bgWhite.bold.inverse(`Server is up on port ${port}`));
})
