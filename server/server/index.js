const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router');

// DB Setup
mongoose.connect('mongodb://heroku_c76lx5b2:sgro5tbg22jeti2j425ac9v0gn@ds247347.mlab.com:47347/heroku_c76lx5b2' ||'mongodb://localhost:auth/eventfinder');

// App Setup
app.use(morgan('combined'));
app.use(cors()); // prevents browser from trowing CORS errors on ajax requests
app.use(bodyParser.json({type : '*/*'}));
router(app);

// Server setup
const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on port', port);