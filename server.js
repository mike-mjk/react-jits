const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(express.static('build'));

// const mustacheExpress = require('mustache-express'); 
// app.engine('html', mustacheExpress());
// app.set('view engine', 'mustache'); 
// app.set('views', __dirname + '/public');

// Routes ------------------------------------
const Video = require('./models/model_video');

//example auth route
// app.get('/', requireAuth, function(req, res) {
//     res.send({ totally: 'authorized' });
// });

app.get('/videos', function(req, res){
    Video.find().sort({ _id: 'desc' }).exec(function(err, videos) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(videos);
    });
});

app.post('/signin', requireSignin, Authentication.signin);
app.post('/signup', Authentication.signup);

app.post('/videos', function(req, res){
    Video.create({
        id: req.body.id,
        title: req.body.title,
        channelTitle: req.body.channelTitle,
        thumbnail: req.body.thumbnail,
        description: req.body.description,
        tags: req.body.tags
    }, function(err, video) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(video);
    });
});

app.put('/videos/:id/:field', function(req, res) {
    if (req.params.field == 'description') {
        Video.findOne({ id: req.params.id }, function (err, video){
          video.userDescription = req.body.description;
          video.save();
});
    }
    res.status(201).json({updated: true});
});

app.get('/videos/:id', function(req, res) {
    Video.findOne({id: req.params.id}, function(err, video) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(video);
    });
});

app.delete('/videos/:id', function(req, res) {
    console.log('delete ran');
    Video.remove({id: req.params.id}, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});
//This was for using mustache... commmented while moving to react. delete later.
// app.get('/watch/:id', function(req, res){
//     res.render('video.html', {
//         videoID: req.params.id,
//         curly: "{{"
//     });
// });
//-------------------------------------------------

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}


exports.app = app;
exports.runServer = runServer;
