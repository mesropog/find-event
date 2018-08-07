const AuthController = require('../controllers/authController');
const EventsController = require('../controllers/eventsController');
const passportService = require('./services/passport');
const passport = require('passport');
const path = require('path');

// this is ready to use auth middleware for authentication using jwt and mail
const requireAuthMiddleware = passport.authenticate('jwt', {session : false});
const requireSigninMiddleware = passport.authenticate('local', {session : false});

// This part for heroku deployment (to serve index.html on '/' get request
const publicPath = path.join(__dirname, '../..', 'public');



module.exports = function (app) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(publicPath, 'index.html'));
    });
    app.get('/scripts/styles.css', function (req, res) {
        res.sendFile(path.join(publicPath, '/scripts/styles.css'))
    });
    app.get('/scripts/bundle.js', function (req, res) {
        res.sendFile(path.join(publicPath, '/scripts/bundle.js'))
    });
    app.get('/scripts/assets/ticket.jpg', function (req, res) {
        res.sendFile(path.join(publicPath, '/scripts/assets/ticket.jpg'))
    });
    app.post('/signup', AuthController.signUp);
    app.post('/signin', requireSigninMiddleware, AuthController.signIn);
    app.post('/event-save', requireAuthMiddleware, EventsController.saveEvent);
};